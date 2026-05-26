import { Input, Select } from 'antd';
import { Link } from 'react-router-dom';
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
  const privacyPath = `/${language}/${language === 'de' ? 'datenschutz' : 'confidentialite'}`;

  return (
    <div className="lead-step">
      <div className="lead-step-heading">
        <span>03</span>
        <h1>{language === 'fr' ? 'Et pour vous recontacter ?' : 'Wie können wir Sie erreichen?'}</h1>
      </div>

      <div className="contact-grid">
        <div className="lead-field">
          <label>{language === 'fr' ? 'Prénom et Nom' : 'Vorname und Name'} *</label>
          <Input size="large" value={data.fullName} onChange={(event) => updateFormData({ fullName: event.target.value })} />
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>
        <div className="lead-field">
          <label>{language === 'fr' ? 'E-mail' : 'E-Mail'} *</label>
          <Input type="email" size="large" value={data.email} onChange={(event) => updateFormData({ email: event.target.value })} />
          {errors.email && <span className="field-error">{errors.email}</span>}
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
          <p className="lead-bonus-note">
            {language === 'fr'
              ? 'Vous pouvez maintenant bénéficier de 8 minutes de temps de conseil offertes pour clarifier votre projet.'
              : 'Sie können jetzt 8 Minuten kostenfreie Beratungszeit erhalten, um Ihr Fahrzeugprojekt zu klären.'}
          </p>
        </div>

        <div className="privacy-row lead-field--full">
          <label className="privacy-consent-label">
            <input
              type="checkbox"
              checked={Boolean(data.privacyConsent)}
              onChange={(event) => updateFormData({ privacyConsent: event.target.checked })}
            />
            <span>
              {language === 'fr'
                ? "J’accepte que mes données soient utilisées pour traiter ma demande et que Mehdi Cars puisse me contacter par e-mail, téléphone ou WhatsApp si nécessaire. "
                : 'Ich stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden und Mehdi Cars mich bei Bedarf per E-Mail, Telefon oder WhatsApp kontaktieren darf. '}
              <Link to={privacyPath}>
                {language === 'fr' ? 'Voir la politique de confidentialité' : 'Datenschutzerklärung ansehen'}
              </Link>
            </span>
          </label>
          {errors.privacyConsent && <span className="field-error">{errors.privacyConsent}</span>}
        </div>
      </div>
    </div>
  );
}
