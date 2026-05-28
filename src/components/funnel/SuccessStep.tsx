import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { pickText } from '../../lib/localized';
import type { SupportedLanguage } from '../../types/i18n';

interface SuccessStepProps {
  language: SupportedLanguage;
  reportToken?: string;
}

export function SuccessStep({ language, reportToken }: SuccessStepProps) {
  return (
    <div className="success-step">
      <Result
        status="success"
        title={pickText(
          {
            de: 'Vielen Dank, Ihre Anfrage wurde gesendet.',
            en: 'Thank you, your request has been sent.',
            es: 'Gracias, su solicitud ha sido enviada.',
            fr: 'Merci, votre demande a été envoyée.',
          },
          language,
        )}
        subTitle={
          pickText(
            {
              de: 'Wir haben Ihre Informationen erhalten. Das Mehdi Cars Team prueft Ihre Anfrage und meldet sich mit den naechsten Schritten.',
              en: 'We received your information. The Mehdi Cars team will review your request and contact you with the next steps.',
              es: 'Hemos recibido su información. El equipo de Mehdi Cars revisará su solicitud y se pondrá en contacto con los siguientes pasos.',
              fr: 'Nous avons reçu vos informations. L’équipe Mehdi Cars va analyser votre demande et vous recontacter avec les prochaines étapes.',
            },
            language,
          )
        }
        extra={[
          <Button type="primary" key="home">
            <Link to={`/${language}`}>{pickText({ de: 'Zurueck zur Startseite', en: 'Back to home', es: 'Volver al inicio', fr: 'Retour à l’accueil' }, language)}</Link>
          </Button>,
          reportToken ? (
            <Button key="report">
              <Link to={`/internal/report/${reportToken}`}>{pickText({ de: 'Interner Bericht', en: 'Internal report', es: 'Informe interno', fr: 'Rapport interne' }, language)}</Link>
            </Button>
          ) : null,
        ]}
      />
    </div>
  );
}
