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
}

const mockReportToken = 'mock-9cb7bb4f-ec9d-4a33-8924-52bc3e';

export async function createLead(payload: CreateLeadPayload): Promise<CreatedLead> {
  localStorage.setItem('lastLeadPayload', JSON.stringify(payload));

  return {
    leadId: 'mock-lead-001',
    reportToken: mockReportToken,
    internalReportUrl: `/internal/report/${mockReportToken}`,
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
