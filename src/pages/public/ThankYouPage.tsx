import { Button, Result, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getLanguage } from '../../lib/language';
import { pickText } from '../../lib/localized';

export function ThankYouPage() {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();
  const language = getLanguage(lang);
  const [searchParams] = useSearchParams();
  const reportToken = searchParams.get('report');

  return (
    <main className="page-shell">
      <Result
        status="success"
        title={t('thankYou.title')}
        subTitle={t('thankYou.subtitle')}
        extra={
          <Space wrap>
            {reportToken && (
              <Button>
                <Link to={`/internal/report/${reportToken}`}>{t('report.title')}</Link>
              </Button>
            )}
            <Button>
              <Link to={`/${language}`}>{pickText({ de: 'Start', en: 'Home', es: 'Inicio', fr: 'Accueil' }, language)}</Link>
            </Button>
          </Space>
        }
      />
    </main>
  );
}
