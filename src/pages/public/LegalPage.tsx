import { Typography } from 'antd';
import { useParams } from 'react-router-dom';

interface LegalPageProps {
  type: 'imprint' | 'privacy';
}

export function LegalPage({ type }: LegalPageProps) {
  const { lang = 'fr' } = useParams();
  const isPrivacy = type === 'privacy';

  return (
    <main className="page-shell">
      <section className="section-inner content-section">
        <Typography.Title>{isPrivacy ? 'Datenschutz / Confidentialite' : 'Impressum'}</Typography.Title>
        <Typography.Paragraph>
          {lang === 'fr'
            ? 'Contenu juridique provisoire pour le release candidate. A remplacer avant production.'
            : 'Vorlaeufiger Rechtstext fuer den Release Candidate. Vor Produktion ersetzen.'}
        </Typography.Paragraph>
      </section>
    </main>
  );
}
