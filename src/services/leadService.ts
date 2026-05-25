import { getSupabaseClient } from '../lib/supabase';
import type { FunnelAnswers } from '../types/funnel';
import type { LeadFormData, LeadRequestRecord } from '../types/lead';

export interface CreateLeadPayload {
  answers?: FunnelAnswers;
  lead?: LeadFormData;
  language: string;
  source?: string;
  token?: string;
}

export interface CreatedLead {
  leadId: string;
  reportToken: string;
  internalReportUrl: string;
  reportEmailRecipient: string;
}

const mockReportToken = 'mock-9cb7bb4f-ec9d-4a33-8924-52bc3e';
const reportEmailRecipient = 'achraf.elbouzaidi@gmail.com';
const defaultReportEmailEndpoint = `https://formsubmit.co/ajax/${reportEmailRecipient}`;
const reportSenderName = 'Mehdi Cars';
const LEAD_REQUEST_SELECT = `
  id,
  report_token,
  internal_report_url,
  request_status,
  full_name,
  email,
  phone,
  language,
  brand,
  other_brand,
  model,
  vehicle_type_or_model,
  min_year,
  max_mileage,
  budget,
  gearbox,
  fuel,
  purchase_timeline,
  notes_or_listing_link,
  report_text,
  email_delivery_status,
  email_delivery_error,
  created_at
`;

export async function createLead(payload: CreateLeadPayload): Promise<CreatedLead> {
  const reportText = buildReportText(payload);
  const reportToken = payload.token || (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : mockReportToken);
  const internalReportUrl = `/internal/report/${reportToken}`;
  const emailResult = await sendReportEmail({
    internalReportUrl,
    leadId: `lead-${Date.now()}`,
    payload,
    reportText,
    reportToken,
  });

  let createdRecord: LeadRequestRecord | null = null;

  try {
    createdRecord = await persistLeadRequest({
      emailDeliveryError: emailResult.errorMessage ?? null,
      emailDeliveryStatus: emailResult.status,
      internalReportUrl,
      payload,
      reportText,
      reportToken,
    });
  } catch (error) {
    console.error('Lead request could not be persisted remotely.', error);
  }

  return {
    leadId: createdRecord?.id || `local-${Date.now()}`,
    reportEmailRecipient,
    reportToken,
    internalReportUrl,
  };
}

export async function listLeadRequests() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return getLocalLeadRequests();
  }

  const { data, error } = await supabase
    .from('lead_requests')
    .select(LEAD_REQUEST_SELECT)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as LeadRequestRecord[];
}

export async function updateLeadRequest(id: string, updates: { requestStatus?: LeadRequestRecord['request_status'] }) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await supabase
    .from('lead_requests')
    .update({
      ...(updates.requestStatus ? { request_status: updates.requestStatus } : {}),
    })
    .eq('id', id)
    .select(LEAD_REQUEST_SELECT)
    .single();

  if (error) {
    throw error;
  }

  return data as LeadRequestRecord;
}

export async function deleteLeadRequest(id: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { error } = await supabase.from('lead_requests').delete().eq('id', id);

  if (error) {
    throw error;
  }
}

export async function getReportByToken(reportToken: string) {
  const supabase = getSupabaseClient();

  if (supabase) {
    const { data, error } = await supabase
      .from('lead_requests')
      .select('report_token, report_text')
      .eq('report_token', reportToken)
      .maybeSingle();

    if (!error && data) {
      return {
        reportToken,
        reportText: data.report_text,
      };
    }
  }

  const localMatch = getLocalLeadRequests().find((item) => item.report_token === reportToken);

  return {
    reportToken,
    reportText: localMatch?.report_text || 'Noch kein gespeicherter Bericht gefunden.',
  };
}

async function persistLeadRequest({
  emailDeliveryError,
  emailDeliveryStatus,
  internalReportUrl,
  payload,
  reportText,
  reportToken,
}: {
  emailDeliveryError: string | null;
  emailDeliveryStatus: 'sent' | 'failed';
  internalReportUrl: string;
  payload: CreateLeadPayload;
  reportText: string;
  reportToken: string;
}) {
  const lead = payload.lead;

  if (!lead) {
    return null;
  }

  const record: LeadRequestRecord = {
    id: `local-${Date.now()}`,
    report_token: reportToken,
    internal_report_url: internalReportUrl,
    request_status: 'new',
    full_name: lead.fullName || '',
    email: lead.email?.trim() || null,
    phone: lead.phone || '',
    language: lead.language,
    brand: lead.brand,
    other_brand: lead.otherBrand?.trim() || null,
    model: lead.model?.trim() || null,
    vehicle_type_or_model: lead.vehicleTypeOrModel?.trim() || null,
    min_year: lead.minYear ?? null,
    max_mileage: lead.maxMileage ?? null,
    budget: lead.budget ?? null,
    gearbox: lead.gearbox ?? [],
    fuel: lead.fuel ?? [],
    purchase_timeline: lead.purchaseTimeline || null,
    notes_or_listing_link: lead.notesOrListingLink?.trim() || null,
    report_text: reportText,
    email_delivery_status: emailDeliveryStatus,
    email_delivery_error: emailDeliveryError,
    created_at: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();

  saveLocalLeadRequest(record);

  if (!supabase) {
    return record;
  }

  const { data, error } = await supabase
    .from('lead_requests')
    .insert({
      report_token: record.report_token,
      internal_report_url: record.internal_report_url,
      request_status: record.request_status,
      full_name: record.full_name,
      email: record.email,
      phone: record.phone,
      language: record.language,
      brand: record.brand,
      other_brand: record.other_brand,
      model: record.model,
      vehicle_type_or_model: record.vehicle_type_or_model,
      min_year: record.min_year,
      max_mileage: record.max_mileage,
      budget: record.budget,
      gearbox: record.gearbox,
      fuel: record.fuel,
      purchase_timeline: record.purchase_timeline,
      notes_or_listing_link: record.notes_or_listing_link,
      report_text: record.report_text,
      email_delivery_status: record.email_delivery_status,
      email_delivery_error: record.email_delivery_error,
    })
    .select(LEAD_REQUEST_SELECT)
    .single();

  if (error) {
    throw error;
  }

  return data as LeadRequestRecord;
}

async function sendReportEmail({
  internalReportUrl,
  leadId,
  payload,
  reportText,
  reportToken,
}: {
  internalReportUrl: string;
  leadId: string;
  payload: CreateLeadPayload;
  reportText: string;
  reportToken: string;
}) {
  const reportEmailEndpoint = import.meta.env.VITE_REPORT_EMAIL_ENDPOINT?.trim() || defaultReportEmailEndpoint;
  const subject = `Neue Fahrzeuganfrage - ${payload.lead?.fullName || payload.answers?.firstName || leadId}`;
  const customerEmail = payload.lead?.email?.trim();

  try {
    const response = await fetch(reportEmailEndpoint, {
      body: JSON.stringify({
        _captcha: 'false',
        ...(customerEmail ? { _cc: customerEmail, _replyto: customerEmail } : {}),
        _subject: subject,
        _template: 'table',
        brand: reportSenderName,
        customerEmail: customerEmail || '-',
        email: customerEmail || reportEmailRecipient,
        internalReportUrl,
        leadId,
        message: reportText,
        name: reportSenderName,
        ownerEmail: reportEmailRecipient,
        recipientEmails: customerEmail ? [reportEmailRecipient, customerEmail].join(', ') : reportEmailRecipient,
        reportText,
        reportToken,
        replyTo: customerEmail || reportEmailRecipient,
        source: payload.source || 'landing',
        subject,
        to: reportEmailRecipient,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Report email request failed with status ${response.status}`);
    }

    localStorage.removeItem('lastLeadEmailError');

    return {
      status: 'sent' as const,
      errorMessage: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unbekannter Fehler';
    console.error('Der Report konnte nicht per E-Mail gesendet werden.', error);
    localStorage.setItem(
      'lastLeadEmailError',
      JSON.stringify({
        at: new Date().toISOString(),
        message,
        recipient: reportEmailRecipient,
      }),
    );

    return {
      status: 'failed' as const,
      errorMessage: message,
    };
  }
}

function buildReportText(payload: CreateLeadPayload | undefined) {
  if (!payload) {
    return 'Noch kein Mock-Lead gespeichert.';
  }

  if (payload.lead) {
    const lead = payload.lead;
    const gearboxValue = lead.gearbox?.length ? lead.gearbox.join(', ') : '-';
    const fuelValue = lead.fuel?.length ? lead.fuel.join(', ') : '-';

    return [
      'Neue Kundenanfrage',
      '',
      'Kunde:',
      `- Name: ${lead.fullName || '-'}`,
      `- E-Mail: ${lead.email || '-'}`,
      `- Telefon: ${lead.phone || '-'}`,
      `- Sprache: ${payload.language}`,
      '',
      'Fahrzeugwunsch:',
      `- Marke: ${lead.brand === 'Autre' ? lead.otherBrand || 'Autre' : lead.brand || '-'}`,
      `- Modell: ${lead.model || '-'}`,
      `- Fahrzeugtyp / Wunsch: ${lead.vehicleTypeOrModel || '-'}`,
      `- Baujahr ab: ${lead.minYear ?? '-'}`,
      `- Kilometer max.: ${lead.maxMileage ?? '-'}`,
      `- Budget: ${lead.budget ?? '-'} EUR`,
      `- Getriebe: ${gearboxValue}`,
      `- Kraftstoff: ${fuelValue}`,
      `- Kaufzeitraum: ${lead.purchaseTimeline || '-'}`,
      '',
      'Zusatzinfos / Anzeigenlink:',
      `${lead.notesOrListingLink || '-'}`,
    ].join('\n');
  }

  const answers = payload.answers ?? {};

  return [
    'Neue Kundenanfrage',
    '',
    'Kunde:',
    `- Name: ${answers.firstName ?? '-'}`,
    `- Telefon: ${answers.whatsappPhone ?? '-'}`,
    `- Sprache: ${payload.language}`,
    '',
    'Fahrzeugwunsch:',
    `- Fahrzeugtyp: ${answers.vehicleType ?? '-'}`,
    `- Marke: ${answers.brand ?? '-'}`,
    `- Budget bis: ${answers.budgetMax ?? '-'} EUR`,
    `- Zielort: ${answers.destinationCity ?? '-'}`,
    '',
    'Bemerkung:',
    `${answers.notes ?? '-'}`,
  ].join('\n');
}

function getLocalLeadRequests() {
  const raw = localStorage.getItem('leadRequests');
  return raw ? (JSON.parse(raw) as LeadRequestRecord[]) : [];
}

function saveLocalLeadRequest(record: LeadRequestRecord) {
  const current = getLocalLeadRequests();
  current.unshift(record);
  localStorage.setItem('leadRequests', JSON.stringify(current));
}
