import { Select } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { SupportedLanguage } from '../../types/i18n';

const supportedLanguages: SupportedLanguage[] = ['de', 'fr'];

const localizedRouteSegments: Record<SupportedLanguage, Record<string, string>> = {
  de: {
    confidentialite: 'datenschutz',
    demande: 'anfrage',
    merci: 'danke',
  },
  fr: {
    anfrage: 'demande',
    danke: 'merci',
    datenschutz: 'confidentialite',
  },
};

export function LanguageSwitch() {
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLanguage = supportedLanguages.includes(lang as SupportedLanguage)
    ? (lang as SupportedLanguage)
    : 'fr';

  function switchLanguage(nextLanguage: SupportedLanguage) {
    const segments = location.pathname.split('/');
    segments[1] = nextLanguage;

    const routeSegment = segments[2];
    if (routeSegment && localizedRouteSegments[nextLanguage][routeSegment]) {
      segments[2] = localizedRouteSegments[nextLanguage][routeSegment];
    }

    window.localStorage.setItem('appLanguage', nextLanguage);
    navigate(`${segments.join('/')}${location.search}`);
  }

  return (
    <Select
      aria-label="Language"
      className="language-select"
      onChange={switchLanguage}
      options={[
        { label: 'DE', value: 'de' },
        { label: 'FR', value: 'fr' },
      ]}
      popupMatchSelectWidth={false}
      value={currentLanguage}
    />
  );
}
