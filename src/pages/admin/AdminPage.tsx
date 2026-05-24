import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Alert, Button, Form, Input, Select, Space, Spin, Table, Tag, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { hasSupabaseConfig, getSupabaseClient } from '../../lib/supabase';
import {
  createAvailabilityBlock,
  deleteAvailabilityBlock,
  listAvailabilityBlocks,
  listConsultations,
  updateConsultation,
} from '../../services/consultationService';
import type { AvailabilityBlockRecord, BookingStatus, ConsultationRecord } from '../../types/consultation';
import './adminPage.css';

const bookingStatusOptions: BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];

function formatDateTimeRange(start: string, end: string) {
  return `${dayjs(start).format('DD.MM.YYYY HH:mm')} - ${dayjs(end).format('DD.MM.YYYY HH:mm')}`;
}

function bookingStatusColor(status: BookingStatus) {
  switch (status) {
    case 'confirmed':
      return 'blue';
    case 'completed':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'gold';
  }
}

export function AdminPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [blockSaving, setBlockSaving] = useState(false);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [statusDrafts, setStatusDrafts] = useState<Record<string, BookingStatus>>({});
  const [savingRows, setSavingRows] = useState<Record<string, boolean>>({});
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [availabilityBlocks, setAvailabilityBlocks] = useState<AvailabilityBlockRecord[]>([]);
  const [blockForm] = Form.useForm();
  const [loginForm] = Form.useForm();

  useEffect(() => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session);
        setAuthLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loadAdminData = useCallback(async () => {
    setDataLoading(true);

    try {
      const [consultationRows, blockRows] = await Promise.all([listConsultations(), listAvailabilityBlocks()]);
      setConsultations(consultationRows);
      setAvailabilityBlocks(blockRows);
      setNoteDrafts(
        Object.fromEntries(consultationRows.map((row) => [row.id, row.notes ?? ''])),
      );
      setStatusDrafts(
        Object.fromEntries(consultationRows.map((row) => [row.id, row.booking_status])),
      );
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Failed to load admin data.');
    } finally {
      setDataLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    if (!session) {
      return;
    }

    void loadAdminData();
  }, [loadAdminData, session]);

  async function handleLogin(values: { email: string; password: string }) {
    const supabase = getSupabaseClient();

    if (!supabase) {
      messageApi.error('Supabase is not configured.');
      return;
    }

    setLoginLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword(values);

      if (error) {
        throw error;
      }

      loginForm.resetFields(['password']);
      messageApi.success('Admin session opened.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    const supabase = getSupabaseClient();

    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      messageApi.error(error.message);
      return;
    }

    setConsultations([]);
    setAvailabilityBlocks([]);
    messageApi.success('Signed out.');
  }

  async function handleSaveBooking(row: ConsultationRecord) {
    setSavingRows((prev) => ({ ...prev, [row.id]: true }));

    try {
      const updated = await updateConsultation(row.id, {
        bookingStatus: statusDrafts[row.id] ?? row.booking_status,
        notes: noteDrafts[row.id] ?? '',
      });

      setConsultations((prev) => prev.map((item) => (item.id === row.id ? updated : item)));
      messageApi.success('Booking updated.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Could not update booking.');
    } finally {
      setSavingRows((prev) => ({ ...prev, [row.id]: false }));
    }
  }

  async function handleCreateBlock(values: { start: string; end: string; reason?: string }) {
    setBlockSaving(true);

    try {
      if (dayjs(values.end).isBefore(dayjs(values.start)) || dayjs(values.end).isSame(dayjs(values.start))) {
        throw new Error('End must be after start.');
      }

      const created = await createAvailabilityBlock({
        startDatetime: dayjs(values.start).toISOString(),
        endDatetime: dayjs(values.end).toISOString(),
        reason: values.reason,
      });

      setAvailabilityBlocks((prev) =>
        [...prev, created].sort((a, b) => dayjs(a.start_datetime).valueOf() - dayjs(b.start_datetime).valueOf()),
      );
      blockForm.resetFields();
      messageApi.success('Availability block added.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Could not create availability block.');
    } finally {
      setBlockSaving(false);
    }
  }

  async function handleDeleteBlock(blockId: string) {
    try {
      await deleteAvailabilityBlock(blockId);
      setAvailabilityBlocks((prev) => prev.filter((block) => block.id !== blockId));
      messageApi.success('Availability block removed.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Could not remove availability block.');
    }
  }

  const columns: ColumnsType<ConsultationRecord> = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      render: (_, row) => (
        <Space direction="vertical" size={0}>
          <strong>{row.name}</strong>
          <Typography.Text type="secondary">{row.email}</Typography.Text>
          <Typography.Text type="secondary">{row.phone}</Typography.Text>
        </Space>
      ),
      width: 220,
      fixed: 'left',
    },
    {
      title: 'Appointment',
      key: 'appointment',
      render: (_, row) => (
        <Space direction="vertical" size={0}>
          <strong>{dayjs(row.appointment_date).format('DD.MM.YYYY')}</strong>
          <Typography.Text type="secondary">{row.appointment_time.slice(0, 5)}</Typography.Text>
        </Space>
      ),
      width: 150,
    },
    {
      title: 'Payment',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (value: ConsultationRecord['payment_status']) => <Tag>{value}</Tag>,
      width: 120,
    },
    {
      title: 'Booking status',
      key: 'booking_status',
      width: 190,
      render: (_, row) => (
        <Select
          value={statusDrafts[row.id] ?? row.booking_status}
          style={{ width: '100%' }}
          options={bookingStatusOptions.map((status) => ({
            label: status,
            value: status,
          }))}
          onChange={(value) => setStatusDrafts((prev) => ({ ...prev, [row.id]: value }))}
        />
      ),
    },
    {
      title: 'Current',
      key: 'current_status',
      render: (_, row) => <Tag color={bookingStatusColor(row.booking_status)}>{row.booking_status}</Tag>,
      width: 120,
    },
    {
      title: 'Notes',
      key: 'notes',
      width: 280,
      render: (_, row) => (
        <Input.TextArea
          className="admin-notes"
          rows={3}
          value={noteDrafts[row.id] ?? ''}
          placeholder="Internal notes"
          onChange={(event) => setNoteDrafts((prev) => ({ ...prev, [row.id]: event.target.value }))}
        />
      ),
    },
    {
      title: 'Save',
      key: 'save',
      width: 120,
      fixed: 'right',
      render: (_, row) => (
        <Button type="primary" loading={savingRows[row.id]} onClick={() => void handleSaveBooking(row)}>
          Save
        </Button>
      ),
    },
  ];

  if (!hasSupabaseConfig()) {
    return (
      <main className="admin-page">
        <div className="admin-shell">
          <Alert
            type="warning"
            showIcon
            message="Supabase is not configured"
            description={(
              <div>
                <p style={{ marginTop: 0 }}>
                  Create a local <code>.env.local</code> file with <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>, then restart Vite.
                </p>
                <p style={{ marginBottom: 0 }}>
                  Follow the project guide in <code>SUPABASE_SETUP.md</code> and run <code>supabase/schema.sql</code> in your Supabase SQL Editor.
                </p>
              </div>
            )}
          />
        </div>
      </main>
    );
  }

  if (authLoading) {
    return (
      <main className="admin-page admin-login-wrap">
        {contextHolder}
        <Spin size="large" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="admin-page admin-login-wrap">
        {contextHolder}
        <section className="admin-login-card">
          <h1>Admin login</h1>
          <p>Sign in with your Supabase Auth admin account to manage bookings and availability.</p>

          <Form form={loginForm} layout="vertical" onFinish={(values) => void handleLogin(values)}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input autoComplete="email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block loading={loginLoading}>
              Sign in
            </Button>
          </Form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      {contextHolder}
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <h1>Consultation admin</h1>
            <p>Review bookings, update statuses, add internal notes, and block unavailable periods.</p>
          </div>
          <Space>
            <Button onClick={() => void loadAdminData()} loading={dataLoading}>
              Refresh
            </Button>
            <Button onClick={() => void handleLogout()}>Sign out</Button>
          </Space>
        </header>

        <div className="admin-grid">
          <section className="admin-card">
            <div className="admin-card-header">
              <div>
                <h2>Bookings</h2>
                <p>All consultation requests stored in Supabase.</p>
              </div>
            </div>
            <div className="admin-card-body admin-table">
              <Table
                rowKey="id"
                loading={dataLoading}
                dataSource={consultations}
                columns={columns}
                pagination={{ pageSize: 8 }}
                scroll={{ x: 1240 }}
              />
            </div>
          </section>

          <section className="admin-card">
            <div className="admin-card-header">
              <div>
                <h2>Availability blocks</h2>
                <p>Block whole days, date ranges, or specific time slots.</p>
              </div>
            </div>
            <div className="admin-card-body">
              <Form
                form={blockForm}
                layout="vertical"
                className="admin-block-form"
                onFinish={(values) => void handleCreateBlock(values)}
              >
                <Form.Item
                  className="admin-field-full"
                  label="Quick examples"
                >
                  <Alert
                    type="info"
                    showIcon
                    message="Examples"
                    description="Full day: 2026-06-10 00:00 to 2026-06-10 23:59. Date range: set the first day start and last day end. Specific slot: use the exact blocked hour."
                  />
                </Form.Item>
                <Form.Item label="Start" name="start" rules={[{ required: true }]}>
                  <Input type="datetime-local" />
                </Form.Item>
                <Form.Item label="End" name="end" rules={[{ required: true }]}>
                  <Input type="datetime-local" />
                </Form.Item>
                <Form.Item className="admin-field-full" label="Reason" name="reason">
                  <Input placeholder="Vacation, external appointment, unavailable..." />
                </Form.Item>
                <Form.Item className="admin-field-full">
                  <Button type="primary" htmlType="submit" loading={blockSaving}>
                    Add block
                  </Button>
                </Form.Item>
              </Form>

              <div className="admin-block-list">
                {availabilityBlocks.length === 0 ? (
                  <Typography.Text type="secondary">No blocked periods yet.</Typography.Text>
                ) : (
                  availabilityBlocks.map((block) => (
                    <div className="admin-block-item" key={block.id}>
                      <div className="admin-block-meta">
                        <strong>{formatDateTimeRange(block.start_datetime, block.end_datetime)}</strong>
                        <span>{block.reason || 'No reason provided'}</span>
                      </div>
                      <Button danger onClick={() => void handleDeleteBlock(block.id)}>
                        Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
