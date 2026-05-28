import { Select } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { defaultLanguage, getLanguage, localizedRouteSegments } from '../../lib/language';
import type { SupportedLanguage } from '../../types/i18n';

export function LanguageSwitch() {
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLanguage = getLanguage(lang);

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
    {
      label: (
        <span className="language-option">
          <span aria-hidden="true" className="language-option__flag">
            🇬🇧
          </span>
          <span className="language-option__label">English</span>
        </span>
      ),
      value: 'en',
    },
    {
      label: (
        <span className="language-option">
          <span aria-hidden="true" className="language-option__flag">
            🇪🇸
          </span>
          <span className="language-option__label">Español</span>
        </span>
      ),
      value: 'es',
    },
  ];

  const selectedLanguage = languageOptions.find((option) => option.value === currentLanguage)
    ?? languageOptions.find((option) => option.value === defaultLanguage);

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
