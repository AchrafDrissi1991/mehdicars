import type { FunnelAnswers } from '../types/funnel';
import type { LeadFormData } from '../types/lead';

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

export async function createLead(payload: CreateLeadPayload): Promise<CreatedLead> {
  localStorage.setItem('lastLeadPayload', JSON.stringify(payload));
  const leadId = `mock-lead-${Date.now()}`;
  const reportText = buildReportText(payload);
  const reportToken = payload.token || mockReportToken;
  const internalReportUrl = `/internal/report/${reportToken}`;

  await sendReportEmail({
    internalReportUrl,
    leadId,
    payload,
    reportText,
    reportToken,
  });

  return {
    leadId,
    reportEmailRecipient,
    reportToken,
    internalReportUrl,
  };
}

export async function getReportByToken(reportToken: string) {
  const rawLead = localStorage.getItem('lastLeadPayload');
  const lead = rawLead ? (JSON.parse(rawLead) as CreateLeadPayload) : undefined;

  return {
    reportToken,
    lead,
    reportText: buildReportText(lead),
  };
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
  } catch (error) {
    console.error('Der Report konnte nicht per E-Mail gesendet werden.', error);
    localStorage.setItem(
      'lastLeadEmailError',
      JSON.stringify({
        at: new Date().toISOString(),
        message: error instanceof Error ? error.message : 'Unbekannter Fehler',
        recipient: reportEmailRecipient,
      }),
    );
  }
}

function buildReportText(payload: CreateLeadPayload | undefined) {
  if (!payload) {
    return 'Noch kein Mock-Lead gespeichert.';
  }

  if (payload.lead) {
    const lead = payload.lead;

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
      `- Getriebe: ${lead.gearbox || '-'}`,
      `- Kraftstoff: ${lead.fuel || '-'}`,
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
