import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/common/AppLayout';
import { AdvisoryPage } from '../pages/public/AdvisoryPage';
import { AdminPage } from '../pages/admin/AdminPage';
import { InternalReportPage } from '../pages/internal/InternalReportPage';
import { FunnelPage } from '../pages/public/FunnelPage';
import { LandingPage } from '../pages/public/LandingPage';
import { LegalPage } from '../pages/public/LegalPage';
import { ThankYouPage } from '../pages/public/ThankYouPage';
import { getStoredLanguage } from '../lib/language';

function getInitialLanguagePath() {
  return `/${getStoredLanguage()}`;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={getInitialLanguagePath()} replace />,
  },
  {
    path: '/:lang',
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'demande', element: <FunnelPage /> },
      { path: 'demande/:token', element: <FunnelPage /> },
      { path: 'anfrage', element: <FunnelPage /> },
      { path: 'anfrage/:token', element: <FunnelPage /> },
      { path: 'conseil', element: <AdvisoryPage /> },
      { path: 'beratung', element: <AdvisoryPage /> },
      { path: 'advice', element: <AdvisoryPage /> },
      { path: 'consejo', element: <AdvisoryPage /> },
      { path: 'merci', element: <ThankYouPage /> },
      { path: 'danke', element: <ThankYouPage /> },
      { path: 'thanks', element: <ThankYouPage /> },
      { path: 'gracias', element: <ThankYouPage /> },
      { path: 'impressum', element: <LegalPage type="imprint" /> },
      { path: 'datenschutz', element: <LegalPage type="privacy" /> },
      { path: 'confidentialite', element: <LegalPage type="privacy" /> },
      { path: 'privacy', element: <LegalPage type="privacy" /> },
      { path: 'privacidad', element: <LegalPage type="privacy" /> },
      { path: 'request', element: <FunnelPage /> },
      { path: 'request/:token', element: <FunnelPage /> },
      { path: 'solicitud', element: <FunnelPage /> },
      { path: 'solicitud/:token', element: <FunnelPage /> },
    ],
  },
  {
    path: '/internal/report/:reportToken',
    element: <InternalReportPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
]);
