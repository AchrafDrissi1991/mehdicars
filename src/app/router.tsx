import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/common/AppLayout';
import { AdvisoryPage } from '../pages/public/AdvisoryPage';
import { AdminPage } from '../pages/admin/AdminPage';
import { InternalReportPage } from '../pages/internal/InternalReportPage';
import { FunnelPage } from '../pages/public/FunnelPage';
import { LandingPage } from '../pages/public/LandingPage';
import { LegalPage } from '../pages/public/LegalPage';
import { ThankYouPage } from '../pages/public/ThankYouPage';

function getInitialLanguagePath() {
  const storedLanguage = window.localStorage.getItem('appLanguage');
  const language = storedLanguage === 'de' ? 'de' : 'fr';

  return `/${language}`;
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
      { path: 'merci', element: <ThankYouPage /> },
      { path: 'danke', element: <ThankYouPage /> },
      { path: 'impressum', element: <LegalPage type="imprint" /> },
      { path: 'datenschutz', element: <LegalPage type="privacy" /> },
      { path: 'confidentialite', element: <LegalPage type="privacy" /> },
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
