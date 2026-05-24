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

  const languageOptions = [
    {
      label: (
        <span className="language-option">
          <span aria-hidden="true" className="language-option__flag">
            🇩🇪
          </span>
          <span className="language-option__label">Deutsch</span>
        </span>
      ),
      value: 'de',
    },
    {
      label: (
        <span className="language-option">
          <span aria-hidden="true" className="language-option__flag">
            🇫🇷
          </span>
          <span className="language-option__label">French</span>
        </span>
      ),
      value: 'fr',
    },
  ];

  const selectedLanguage = languageOptions.find((option) => option.value === currentLanguage);

  return (
    <Select
      aria-label="Language"
      className="language-select"
      labelInValue
      onChange={({ value }) => switchLanguage(value as SupportedLanguage)}
      options={languageOptions}
      optionLabelProp="label"
      popupMatchSelectWidth={false}
      popupClassName="language-select-dropdown"
      value={selectedLanguage}
    />
  );
}
