import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Alert, Button, Drawer, Form, Input, Popconfirm, Select, Space, Spin, Table, Tabs, Tag, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { hasSupabaseConfig, getSupabaseClient } from '../../lib/supabase';
import {
  createAvailabilityBlock,
  createScheduleWindow,
  deleteAvailabilityBlock,
  deleteConsultation,
  deleteScheduleWindow,
  listAvailabilityBlocks,
  listConsultations,
  listScheduleWindows,
  updateConsultation,
} from '../../services/consultationService';
import { deleteLeadRequest, listLeadRequests, updateLeadRequest } from '../../services/leadService';
import type { AvailabilityBlockRecord, BookingStatus, ConsultationRecord, ScheduleWindowRecord } from '../../types/consultation';
import type { LeadRequestRecord } from '../../types/lead';
import './adminPage.css';

const bookingStatusOptions: BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];
const leadRequestStatusOptions: LeadRequestRecord['request_status'][] = ['new', 'in_review', 'contacted', 'closed'];
const weekDayOptions = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 0, label: 'Sunday' },
];

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

function leadStatusColor(status: LeadRequestRecord['request_status']) {
  switch (status) {
    case 'closed':
      return 'green';
    case 'contacted':
      return 'blue';
    case 'in_review':
      return 'purple';
    default:
      return 'gold';
  }
}

function formatScheduleWindow(window: ScheduleWindowRecord) {
  const day = weekDayOptions.find((option) => option.value === window.day_of_week)?.label || `Day ${window.day_of_week}`;
  return `${day} · ${window.start_time.slice(0, 5)} - ${window.end_time.slice(0, 5)} · ${window.slot_duration_minutes} min`;
}

export function AdminPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [blockSaving, setBlockSaving] = useState(false);
  const [windowSaving, setWindowSaving] = useState(false);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [statusDrafts, setStatusDrafts] = useState<Record<string, BookingStatus>>({});
  const [leadStatusDrafts, setLeadStatusDrafts] = useState<Record<string, LeadRequestRecord['request_status']>>({});
  const [savingRows, setSavingRows] = useState<Record<string, boolean>>({});
  const [savingLeadRows, setSavingLeadRows] = useState<Record<string, boolean>>({});
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [leadRequests, setLeadRequests] = useState<LeadRequestRecord[]>([]);
  const [availabilityBlocks, setAvailabilityBlocks] = useState<AvailabilityBlockRecord[]>([]);
  const [scheduleWindows, setScheduleWindows] = useState<ScheduleWindowRecord[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationRecord | null>(null);
  const [selectedLeadRequest, setSelectedLeadRequest] = useState<LeadRequestRecord | null>(null);
  const [blockForm] = Form.useForm();
  const [windowForm] = Form.useForm();
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
      const [consultationRows, blockRows, windowRows, leadRows] = await Promise.all([
        listConsultations(),
        listAvailabilityBlocks(),
        listScheduleWindows(true),
        listLeadRequests(),
      ]);

      setConsultations(consultationRows);
      setAvailabilityBlocks(blockRows);
      setScheduleWindows(windowRows);
      setLeadRequests(leadRows);
      setNoteDrafts(Object.fromEntries(consultationRows.map((row) => [row.id, row.notes ?? ''])));
      setStatusDrafts(Object.fromEntries(consultationRows.map((row) => [row.id, row.booking_status])));
      setLeadStatusDrafts(Object.fromEntries(leadRows.map((row) => [row.id, row.request_status])));
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
    setLeadRequests([]);
    setAvailabilityBlocks([]);
    setScheduleWindows([]);
    setSelectedConsultation(null);
    setSelectedLeadRequest(null);
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
      if (selectedConsultation?.id === row.id) {
        setSelectedConsultation(updated);
      }
      messageApi.success('Booking updated.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Could not update booking.');
    } finally {
      setSavingRows((prev) => ({ ...prev, [row.id]: false }));
    }
  }

  async function handleDeleteConsultation(row: ConsultationRecord) {
    try {
      await deleteConsultation(row.id);
      setConsultations((prev) => prev.filter((item) => item.id !== row.id));
      if (selectedConsultation?.id === row.id) {
        setSelectedConsultation(null);
      }
      messageApi.success('Booking deleted.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Could not delete booking.');
    }
  }

  async function handleSaveLeadRequest(row: LeadRequestRecord) {
    setSavingLeadRows((prev) => ({ ...prev, [row.id]: true }));

    try {
      const updated = await updateLeadRequest(row.id, {
        requestStatus: leadStatusDrafts[row.id] ?? row.request_status,
      });

      setLeadRequests((prev) => prev.map((item) => (item.id === row.id ? updated : item)));
      if (selectedLeadRequest?.id === row.id) {
        setSelectedLeadRequest(updated);
      }
      messageApi.success('Purchase request updated.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Could not update purchase request.');
    } finally {
      setSavingLeadRows((prev) => ({ ...prev, [row.id]: false }));
    }
  }

  async function handleDeleteLeadRequest(row: LeadRequestRecord) {
    try {
      await deleteLeadRequest(row.id);
      setLeadRequests((prev) => prev.filter((item) => item.id !== row.id));
      if (selectedLeadRequest?.id === row.id) {
        setSelectedLeadRequest(null);
      }
      messageApi.success('Purchase request deleted.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Could not delete purchase request.');
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

  async function handleCreateWindow(values: { dayOfWeek: number; start: string; end: string; duration: number; label?: string }) {
    setWindowSaving(true);

    try {
      const created = await createScheduleWindow({
        dayOfWeek: values.dayOfWeek,
        startTime: values.start,
        endTime: values.end,
        slotDurationMinutes: values.duration,
        label: values.label,
      });

      setScheduleWindows((prev) =>
        [...prev, created].sort((a, b) => a.day_of_week - b.day_of_week || a.start_time.localeCompare(b.start_time)),
      );
      windowForm.resetFields();
      messageApi.success('Schedule window added.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Could not create schedule window.');
    } finally {
      setWindowSaving(false);
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

  async function handleDeleteWindow(windowId: string) {
    try {
      await deleteScheduleWindow(windowId);
      setScheduleWindows((prev) => prev.filter((window) => window.id !== windowId));
      messageApi.success('Schedule window removed.');
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Could not remove schedule window.');
    }
  }

  const consultationColumns: ColumnsType<ConsultationRecord> = [
    {
      title: 'Customer',
      key: 'customer',
      width: 220,
      render: (_, row) => (
        <Space direction="vertical" size={0}>
          <strong>{row.name}</strong>
          <Typography.Text type="secondary">{row.email}</Typography.Text>
          <Typography.Text type="secondary">{row.phone}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Appointment',
      key: 'appointment',
      width: 150,
      render: (_, row) => (
        <Space direction="vertical" size={0}>
          <strong>{dayjs(row.appointment_date).format('DD.MM.YYYY')}</strong>
          <Typography.Text type="secondary">{row.appointment_time.slice(0, 5)}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'payment_status',
      key: 'payment_status',
      width: 120,
      render: (value: ConsultationRecord['payment_status']) => <Tag>{value}</Tag>,
    },
    {
      title: 'Booking status',
      key: 'booking_status',
      width: 180,
      render: (_, row) => (
        <div onClick={(event) => event.stopPropagation()}>
          <Select
            value={statusDrafts[row.id] ?? row.booking_status}
            style={{ width: '100%' }}
            options={bookingStatusOptions.map((status) => ({ label: status, value: status }))}
            onChange={(value) => setStatusDrafts((prev) => ({ ...prev, [row.id]: value }))}
          />
        </div>
      ),
    },
    {
      title: 'Current',
      key: 'current',
      width: 120,
      render: (_, row) => <Tag color={bookingStatusColor(row.booking_status)}>{row.booking_status}</Tag>,
    },
    {
      title: 'Notes / Billing',
      key: 'notes',
      width: 320,
      render: (_, row) => (
        <div onClick={(event) => event.stopPropagation()}>
          <Input.TextArea
            className="admin-notes"
            rows={4}
            value={noteDrafts[row.id] ?? ''}
            placeholder="Internal notes"
            onChange={(event) => setNoteDrafts((prev) => ({ ...prev, [row.id]: event.target.value }))}
          />
        </div>
      ),
    },
    {
      title: 'Save',
      key: 'save',
      width: 110,
      render: (_, row) => (
        <Button
          type="primary"
          loading={savingRows[row.id]}
          onClick={(event) => {
            event.stopPropagation();
            void handleSaveBooking(row);
          }}
        >
          Save
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      width: 110,
      render: (_, row) => (
        <Popconfirm
          title="Delete this booking?"
          description="This action cannot be undone."
          okText="Delete"
          cancelText="Cancel"
          onConfirm={() => void handleDeleteConsultation(row)}
        >
          <Button danger onClick={(event) => event.stopPropagation()}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const leadColumns: ColumnsType<LeadRequestRecord> = [
    {
      title: 'Customer',
      key: 'customer',
      width: 240,
      render: (_, row) => (
        <Space direction="vertical" size={0}>
          <strong>{row.full_name}</strong>
          <Typography.Text type="secondary">{row.email || 'No email'}</Typography.Text>
          <Typography.Text type="secondary">{row.phone}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 190,
      render: (_, row) => (
        <div onClick={(event) => event.stopPropagation()}>
          <Select
            value={leadStatusDrafts[row.id] ?? row.request_status}
            style={{ width: '100%' }}
            options={leadRequestStatusOptions.map((status) => ({ label: status, value: status }))}
            onChange={(value) => setLeadStatusDrafts((prev) => ({ ...prev, [row.id]: value }))}
          />
        </div>
      ),
    },
    {
      title: 'Current',
      key: 'current',
      width: 120,
      render: (_, row) => <Tag color={leadStatusColor(row.request_status)}>{row.request_status}</Tag>,
    },
    {
      title: 'Vehicle request',
      key: 'vehicle',
      width: 320,
      render: (_, row) => (
        <Space direction="vertical" size={0}>
          <strong>{row.brand === 'Autre' ? row.other_brand || row.brand : row.brand}</strong>
          <Typography.Text type="secondary">{row.model || row.vehicle_type_or_model || 'No model details'}</Typography.Text>
          <Typography.Text type="secondary">
            {row.budget ? `${row.budget} EUR` : 'No budget'} · {row.min_year || '-'} · {row.max_mileage || '-'} km
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Email status',
      dataIndex: 'email_delivery_status',
      key: 'email_delivery_status',
      width: 130,
      render: (value: LeadRequestRecord['email_delivery_status']) => <Tag color={value === 'sent' ? 'green' : 'red'}>{value}</Tag>,
    },
    {
      title: 'Save',
      key: 'save',
      width: 110,
      render: (_, row) => (
        <Button
          type="primary"
          loading={savingLeadRows[row.id]}
          onClick={(event) => {
            event.stopPropagation();
            void handleSaveLeadRequest(row);
          }}
        >
          Save
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      width: 110,
      render: (_, row) => (
        <Popconfirm
          title="Delete this request?"
          description="This action cannot be undone."
          okText="Delete"
          cancelText="Cancel"
          onConfirm={() => void handleDeleteLeadRequest(row)}
        >
          <Button danger onClick={(event) => event.stopPropagation()}>
            Delete
          </Button>
        </Popconfirm>
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
          <div className="admin-login-card__eyebrow">Mehdi Cars Admin</div>
          <h1>Backoffice login</h1>
          <p>Sign in with your Supabase admin account to manage conseil bookings, schedule windows and purchase requests.</p>

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
            <div className="admin-header__eyebrow">Mehdi Cars Backoffice</div>
            <h1>Conseil & Kaufanfragen</h1>
            <p>Manage advisory bookings, edit schedule windows, delete unneeded entries and inspect full reports directly in the admin.</p>
          </div>
          <Space>
            <Button onClick={() => void loadAdminData()} loading={dataLoading}>
              Refresh
            </Button>
            <Button onClick={() => void handleLogout()}>Sign out</Button>
          </Space>
        </header>

        <Tabs
          defaultActiveKey="conseil"
          items={[
            {
              key: 'conseil',
              label: `Conseil (${consultations.length})`,
              children: (
                <div className="admin-grid">
                  <section className="admin-card">
                    <div className="admin-card-header">
                      <div>
                        <h2>Bookings</h2>
                        <p>Click a row to open the booking report and billing notes.</p>
                      </div>
                    </div>
                    <div className="admin-card-body admin-table">
                      <Table
                        rowKey="id"
                        loading={dataLoading}
                        dataSource={consultations}
                        columns={consultationColumns}
                        pagination={{ pageSize: 8 }}
                        scroll={{ x: 1500 }}
                        onRow={(record) => ({
                          onClick: () => setSelectedConsultation(record),
                        })}
                      />
                    </div>
                  </section>

                  <div className="admin-split-grid">
                    <section className="admin-card">
                      <div className="admin-card-header">
                        <div>
                          <h2>Schedule windows</h2>
                          <p>Add morning, afternoon or evening slots. The public booking page reads these windows automatically.</p>
                        </div>
                      </div>
                      <div className="admin-card-body">
                        <Form form={windowForm} layout="vertical" className="admin-block-form" onFinish={(values) => void handleCreateWindow(values)}>
                          <Form.Item label="Day" name="dayOfWeek" rules={[{ required: true }]}>
                            <Select options={weekDayOptions} />
                          </Form.Item>
                          <Form.Item label="Slot duration" name="duration" initialValue={30} rules={[{ required: true }]}>
                            <Select options={[15, 20, 30, 45, 60].map((value) => ({ value, label: `${value} min` }))} />
                          </Form.Item>
                          <Form.Item label="Start" name="start" rules={[{ required: true }]}>
                            <Input type="time" />
                          </Form.Item>
                          <Form.Item label="End" name="end" rules={[{ required: true }]}>
                            <Input type="time" />
                          </Form.Item>
                          <Form.Item className="admin-field-full" label="Label" name="label">
                            <Input placeholder="Morning, Evening, Special hours..." />
                          </Form.Item>
                          <Form.Item className="admin-field-full">
                            <Button type="primary" htmlType="submit" loading={windowSaving}>
                              Add schedule window
                            </Button>
                          </Form.Item>
                        </Form>

                        <div className="admin-block-list">
                          {scheduleWindows.length === 0 ? (
                            <Typography.Text type="secondary">No schedule windows yet.</Typography.Text>
                          ) : (
                            scheduleWindows.map((window) => (
                              <div className="admin-block-item" key={window.id}>
                                <div className="admin-block-meta">
                                  <strong>{formatScheduleWindow(window)}</strong>
                                  <span>{window.label || 'No label'}</span>
                                </div>
                                <Button danger onClick={() => void handleDeleteWindow(window.id)}>
                                  Remove
                                </Button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </section>

                    <section className="admin-card">
                      <div className="admin-card-header">
                        <div>
                          <h2>Availability blocks</h2>
                          <p>Use this for vacations, meetings or one-off unavailable periods.</p>
                        </div>
                      </div>
                      <div className="admin-card-body">
                        <Form form={blockForm} layout="vertical" className="admin-block-form" onFinish={(values) => void handleCreateBlock(values)}>
                          <Form.Item className="admin-field-full" label="Quick examples">
                            <Alert
                              type="info"
                              showIcon
                              message="Examples"
                              description="Full day: 2026-06-10 00:00 to 2026-06-10 23:59. Specific slot: use exact start and end. Multi-day vacation: first day start to last day end."
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
              ),
            },
            {
              key: 'demande',
              label: `Kaufanfragen (${leadRequests.length})`,
              children: (
                <div className="admin-grid">
                  <section className="admin-card">
                    <div className="admin-card-header">
                      <div>
                        <h2>Purchase requests after envoyer</h2>
                        <p>Click a row to read the full report, then update the status or delete unnecessary entries.</p>
                      </div>
                    </div>
                    <div className="admin-card-body admin-table">
                      <Table
                        rowKey="id"
                        loading={dataLoading}
                        dataSource={leadRequests}
                        columns={leadColumns}
                        pagination={{ pageSize: 8 }}
                        scroll={{ x: 1550 }}
                        onRow={(record) => ({
                          onClick: () => setSelectedLeadRequest(record),
                        })}
                      />
                    </div>
                  </section>
                </div>
              ),
            },
          ]}
        />

        <Drawer
          title={selectedConsultation ? `Conseil report · ${selectedConsultation.name}` : 'Conseil report'}
          open={Boolean(selectedConsultation)}
          width={560}
          onClose={() => setSelectedConsultation(null)}
        >
          {selectedConsultation && (
            <div className="admin-report-drawer">
              <p><strong>Name:</strong> {selectedConsultation.name}</p>
              <p><strong>Email:</strong> {selectedConsultation.email}</p>
              <p><strong>Phone:</strong> {selectedConsultation.phone}</p>
              <p><strong>Date:</strong> {dayjs(selectedConsultation.appointment_date).format('DD.MM.YYYY')}</p>
              <p><strong>Time:</strong> {selectedConsultation.appointment_time.slice(0, 5)}</p>
              <p><strong>Status:</strong> {selectedConsultation.booking_status}</p>
              <p><strong>Payment:</strong> {selectedConsultation.payment_status}</p>
              <pre className="admin-report-box">{selectedConsultation.notes || 'No notes / billing data stored.'}</pre>
            </div>
          )}
        </Drawer>

        <Drawer
          title={selectedLeadRequest ? `Kaufanfrage report · ${selectedLeadRequest.full_name}` : 'Kaufanfrage report'}
          open={Boolean(selectedLeadRequest)}
          width={700}
          onClose={() => setSelectedLeadRequest(null)}
        >
          {selectedLeadRequest && (
            <div className="admin-report-drawer">
              <p><strong>Name:</strong> {selectedLeadRequest.full_name}</p>
              <p><strong>Email:</strong> {selectedLeadRequest.email || 'No email'}</p>
              <p><strong>Phone:</strong> {selectedLeadRequest.phone}</p>
              <p><strong>Status:</strong> {selectedLeadRequest.request_status}</p>
              <p><strong>Email delivery:</strong> {selectedLeadRequest.email_delivery_status}</p>
              <p><strong>Brand:</strong> {selectedLeadRequest.brand === 'Autre' ? selectedLeadRequest.other_brand || selectedLeadRequest.brand : selectedLeadRequest.brand}</p>
              <p><strong>Model / Type:</strong> {selectedLeadRequest.model || selectedLeadRequest.vehicle_type_or_model || '-'}</p>
              <p><strong>Budget:</strong> {selectedLeadRequest.budget ? `${selectedLeadRequest.budget} EUR` : '-'}</p>
              <p><strong>Gearbox:</strong> {selectedLeadRequest.gearbox?.join(', ') || '-'}</p>
              <p><strong>Fuel:</strong> {selectedLeadRequest.fuel?.join(', ') || '-'}</p>
              <p><strong>Timeline:</strong> {selectedLeadRequest.purchase_timeline || '-'}</p>
              <p><strong>Notes / link:</strong> {selectedLeadRequest.notes_or_listing_link || '-'}</p>
              <a href={selectedLeadRequest.internal_report_url} target="_blank" rel="noreferrer">Open internal report page</a>
              <pre className="admin-report-box">{selectedLeadRequest.report_text}</pre>
            </div>
          )}
        </Drawer>
      </div>
    </main>
  );
}
