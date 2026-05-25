import { Progress } from 'antd';
import { LogIn, Menu, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { LanguageSwitch } from '../common/LanguageSwitch';
import mehdiCarsLogoUrl from '../../../images/mehdi_cars_logo.svg';
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
      <div className="funnel-topbar__menu">
        <Menu size={24} />
      </div>
      
      <Link className="funnel-topbar__brand" to={`/${lang}`}>
        <img alt={t('landing.brand')} className="brand-logo" src={mehdiCarsLogoUrl} />
      </Link>

      {showProgress && (
        <div className="funnel-progress">
          <span>
            {current}/{total}
          </span>
          <Progress percent={Math.round((current / total) * 100)} showInfo={false} />
        </div>
      )}

      <div className="funnel-topbar__actions">
        <ShoppingCart size={20} />
        <Link aria-label="Admin login" className="funnel-topbar__admin-link" title="Admin login" to="/admin">
          <LogIn size={16} />
        </Link>
        <LanguageSwitch />
      </div>
    </header>
  );
}
