import { Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { localizeRoute } from '../../lib/language';
import { pickText } from '../../lib/localized';
import type { SupportedLanguage } from '../../types/i18n';
import type { LeadFormDraft, PurchaseTimeline } from '../../types/lead';

interface StepProps {
  data: LeadFormDraft;
  errors: Record<string, string>;
  language: SupportedLanguage;
  updateFormData: (data: Partial<LeadFormDraft>) => void;
}

const timelineOptions: Array<{ value: PurchaseTimeline; fr: string; de: string; en: string; es: string }> = [
  { value: 'asap', fr: 'Dès que possible', de: 'So schnell wie möglich', en: 'As soon as possible', es: 'Lo antes posible' },
  { value: 'one_month', fr: 'Dans 1 mois', de: 'In 1 Monat', en: 'Within 1 month', es: 'En 1 mes' },
  { value: 'three_months', fr: 'Dans 3 mois', de: 'In 3 Monaten', en: 'Within 3 months', es: 'En 3 meses' },
  { value: 'not_sure', fr: 'Je ne sais pas encore', de: 'Ich weiß es noch nicht', en: 'I am not sure yet', es: 'Todavía no lo sé' },
];

export function StepContact({ data, errors, language, updateFormData }: StepProps) {
  const privacyPath = `/${language}/${localizeRoute(language, 'privacy')}`;

  return (
    <div className="lead-step">
      <div className="lead-step-heading">
        <span>03</span>
        <h1>{pickText({ de: 'Wie koennen wir Sie erreichen?', en: 'How can we reach you?', es: '¿Cómo podemos contactarle?', fr: 'Et pour vous recontacter ?' }, language)}</h1>
      </div>

      <div className="contact-grid">
        <div className="lead-field">
          <label>{pickText({ de: 'Vorname und Name', en: 'First and last name', es: 'Nombre y apellido', fr: 'Prénom et Nom' }, language)} *</label>
          <Input size="large" value={data.fullName} onChange={(event) => updateFormData({ fullName: event.target.value })} />
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>
        <div className="lead-field">
          <label>{pickText({ de: 'E-Mail', en: 'Email', es: 'Correo electrónico', fr: 'E-mail' }, language)} *</label>
          <Input type="email" size="large" value={data.email} onChange={(event) => updateFormData({ email: event.target.value })} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="lead-field">
          <label>{pickText({ de: 'Telefon', en: 'Phone', es: 'Teléfono', fr: 'Téléphone' }, language)} *</label>
          <Input size="large" value={data.phone} onChange={(event) => updateFormData({ phone: event.target.value })} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
        <div className="lead-field">
          <label>{pickText({ de: 'Kaufzeitraum', en: 'Purchase timeline', es: 'Plazo de compra', fr: 'Prévision d’achat' }, language)}</label>
          <Select
            size="large"
            placeholder={pickText({ de: 'Auswaehlen', en: 'Select', es: 'Seleccionar', fr: 'Sélectionner' }, language)}
            value={data.purchaseTimeline || undefined}
            onChange={(purchaseTimeline) => updateFormData({ purchaseTimeline })}
            options={timelineOptions.map((option) => ({ value: option.value, label: option[language] }))}
          />
        </div>
        <div className="lead-field lead-field--full">
          <label>
            {pickText(
              {
                de: 'Ergaenzen Sie weitere Wuensche oder senden Sie einen Link zu einer Anzeige, die Ihnen gefaellt.',
                en: 'Add more details or send a listing link that you like.',
                es: 'Añada más detalles o envíe un enlace de un anuncio que le guste.',
                fr: 'Ajoutez des précisions ou envoyez un lien d’annonce que vous aimez.',
              },
              language,
            )}
          </label>
          <Input.TextArea
            value={data.notesOrListingLink}
            onChange={(event) => updateFormData({ notesOrListingLink: event.target.value })}
          />
          <p className="lead-bonus-note">
            {pickText(
              {
                de: 'Sie koennen jetzt 8 Minuten kostenfreie Beratungszeit erhalten, um Ihr Fahrzeugprojekt zu klaeren.',
                en: 'You can now benefit from 8 minutes of free consultation time to clarify your project.',
                es: 'Ahora puede beneficiarse de 8 minutos de consulta gratuita para aclarar su proyecto.',
                fr: 'Vous pouvez maintenant bénéficier de 8 minutes de temps de conseil offertes pour clarifier votre projet.',
              },
              language,
            )}
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
              {pickText(
                {
                  de: 'Ich stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden und Mehdi Cars mich bei Bedarf per E-Mail, Telefon oder WhatsApp kontaktieren darf. ',
                  en: 'I agree that my data may be used to process my request and that Mehdi Cars may contact me by email, phone or WhatsApp if needed. ',
                  es: 'Acepto que mis datos se utilicen para tramitar mi solicitud y que Mehdi Cars pueda contactarme por correo, teléfono o WhatsApp si es necesario. ',
                  fr: "J’accepte que mes données soient utilisées pour traiter ma demande et que Mehdi Cars puisse me contacter par e-mail, téléphone ou WhatsApp si nécessaire. ",
                },
                language,
              )}
              <Link to={privacyPath}>
                {pickText({ de: 'Datenschutzerklaerung ansehen', en: 'View the privacy policy', es: 'Ver la política de privacidad', fr: 'Voir la politique de confidentialité' }, language)}
              </Link>
            </span>
          </label>
          {errors.privacyConsent && <span className="field-error">{errors.privacyConsent}</span>}
        </div>
      </div>
    </div>
  );
}
