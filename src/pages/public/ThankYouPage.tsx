import { Button, Result, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useSearchParams } from 'react-router-dom';

export function ThankYouPage() {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();
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
              <Link to={`/${lang}`}>Start</Link>
            </Button>
          </Space>
        }
      />
    </main>
  );
}
