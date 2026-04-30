import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
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
        title={language === 'fr' ? 'Merci, votre demande a été envoyée.' : 'Vielen Dank, Ihre Anfrage wurde gesendet.'}
        subTitle={
          language === 'fr'
            ? 'Nous avons reçu vos informations. L’équipe Mehdi Cars va analyser votre demande et vous recontacter avec les prochaines étapes.'
            : 'Wir haben Ihre Informationen erhalten. Das Mehdi Cars Team prüft Ihre Anfrage und meldet sich mit den nächsten Schritten.'
        }
        extra={[
          <Button type="primary" key="home">
            <Link to={`/${language}`}>{language === 'fr' ? 'Retour à l’accueil' : 'Zurück zur Startseite'}</Link>
          </Button>,
          reportToken ? (
            <Button key="report">
              <Link to={`/internal/report/${reportToken}`}>{language === 'fr' ? 'Rapport interne' : 'Interner Bericht'}</Link>
            </Button>
          ) : null,
        ]}
      />
    </div>
  );
}
