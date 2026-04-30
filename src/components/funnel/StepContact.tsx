import { Input, Select } from 'antd';
import type { SupportedLanguage } from '../../types/i18n';
import type { LeadFormDraft, PurchaseTimeline } from '../../types/lead';

interface StepProps {
  data: LeadFormDraft;
  errors: Record<string, string>;
  language: SupportedLanguage;
  updateFormData: (data: Partial<LeadFormDraft>) => void;
}

const timelineOptions: Array<{ value: PurchaseTimeline; fr: string; de: string }> = [
  { value: 'asap', fr: 'Dès que possible', de: 'So schnell wie möglich' },
  { value: 'one_month', fr: 'Dans 1 mois', de: 'In 1 Monat' },
  { value: 'three_months', fr: 'Dans 3 mois', de: 'In 3 Monaten' },
  { value: 'not_sure', fr: 'Je ne sais pas encore', de: 'Ich weiß es noch nicht' },
];

export function StepContact({ data, errors, language, updateFormData }: StepProps) {
  return (
    <div className="lead-step">
      <div className="lead-step-heading">
        <span>04</span>
        <h1>{language === 'fr' ? 'Et pour vous recontacter ?' : 'Wie können wir Sie erreichen?'}</h1>
      </div>

      <div className="contact-grid">
        <div className="lead-field">
          <label>{language === 'fr' ? 'Prénom et Nom' : 'Vorname und Name'} *</label>
          <Input size="large" value={data.fullName} onChange={(event) => updateFormData({ fullName: event.target.value })} />
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>
        <div className="lead-field">
          <label>{language === 'fr' ? 'E-mail' : 'E-Mail'}</label>
          <Input type="email" size="large" value={data.email} onChange={(event) => updateFormData({ email: event.target.value })} />
        </div>
        <div className="lead-field">
          <label>{language === 'fr' ? 'Téléphone' : 'Telefon'} *</label>
          <Input size="large" value={data.phone} onChange={(event) => updateFormData({ phone: event.target.value })} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
        <div className="lead-field">
          <label>{language === 'fr' ? 'Prévision d’achat' : 'Kaufzeitraum'}</label>
          <Select
            size="large"
            placeholder={language === 'fr' ? 'Sélectionner' : 'Auswählen'}
            value={data.purchaseTimeline || undefined}
            onChange={(purchaseTimeline) => updateFormData({ purchaseTimeline })}
            options={timelineOptions.map((option) => ({ value: option.value, label: option[language] }))}
          />
        </div>
        <div className="lead-field lead-field--full">
          <label>
            {language === 'fr'
              ? 'Ajoutez des précisions ou envoyez un lien d’annonce que vous aimez.'
              : 'Ergänzen Sie weitere Wünsche oder senden Sie einen Link zu einer Anzeige, die Ihnen gefällt.'}
          </label>
          <Input.TextArea
            value={data.notesOrListingLink}
            onChange={(event) => updateFormData({ notesOrListingLink: event.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
