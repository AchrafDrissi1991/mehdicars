import { Progress } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { LanguageSwitch } from '../common/LanguageSwitch';
import './funnel.css';

interface FunnelTopBarProps {
  current: number;
  total: number;
  showProgress?: boolean;
}

export function FunnelTopBar({ current, total, showProgress = true }: FunnelTopBarProps) {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();

  return (
    <header className="funnel-topbar">
      <Link className="brand" to={`/${lang}`}>
        <span className="brand-mark">{t('landing.brandMark')}</span>
        <span>{t('landing.brand')}</span>
      </Link>
      {showProgress && (
        <div className="funnel-progress">
          <span>
            {current}/{total}
          </span>
          <Progress percent={Math.round((current / total) * 100)} showInfo={false} />
        </div>
      )}
      <div className="funnel-help">
        <LanguageSwitch />
      </div>
    </header>
  );
}
