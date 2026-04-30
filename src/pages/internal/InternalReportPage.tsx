import { Button, Typography } from 'antd';
import { Clipboard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getReportByToken } from '../../services/leadService';
import './internalReportPage.css';

export function InternalReportPage() {
  const { t } = useTranslation();
  const { reportToken = '' } = useParams();
  const [reportText, setReportText] = useState('');

  useEffect(() => {
    void getReportByToken(reportToken).then((report) => setReportText(report.reportText));
  }, [reportToken]);

  return (
    <main className="report-page">
      <section className="report-shell">
        <div className="report-header">
          <div>
            <Typography.Title level={1}>{t('report.title')}</Typography.Title>
            <Typography.Text type="secondary">Token: {reportToken}</Typography.Text>
          </div>
          <Button icon={<Clipboard size={18} />} onClick={() => void navigator.clipboard.writeText(reportText)}>
            {t('report.copy')}
          </Button>
        </div>
        <pre className="report-box">{reportText}</pre>
      </section>
    </main>
  );
}
