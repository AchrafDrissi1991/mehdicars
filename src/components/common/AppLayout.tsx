import { Outlet, useParams } from 'react-router-dom';
import { useSyncLanguage } from '../../hooks/useSyncLanguage';

export function AppLayout() {
  const { lang } = useParams();
  useSyncLanguage(lang);

  return <Outlet />;
}
