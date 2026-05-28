import { Button } from 'antd';
import { ChevronDown, LogIn, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getLanguage, localizeRoute } from '../../lib/language';
import { pickText } from '../../lib/localized';
import { LanguageSwitch } from '../common/LanguageSwitch';
import { SocialLinks } from '../common/SocialLinks';
import mehdiCarsLogoUrl from '../../../images/mehdi_cars_logo.svg';

export function LandingTopBar() {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();
  const language = getLanguage(lang);
  const location = useLocation();
  const funnelPath = `/${language}/${localizeRoute(language, 'request')}`;
  const advisoryPath = `/${language}/${localizeRoute(language, 'advisory')}`;
  const landingPath = `/${language}`;
  const isLandingPage = location.pathname === landingPath;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionHref = (sectionId: string) => (isLandingPage ? `#${sectionId}` : `${landingPath}#${sectionId}`);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setServicesOpen(false);
    }
  }, [mobileMenuOpen]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }

  return (
    <header className={`landing-topbar ${isScrolled ? 'is-scrolled' : ''} ${mobileMenuOpen ? 'is-mobile-menu-open' : ''}`}>
      <div className="landing-topbar__inner">
        <Link className="brand" to={`/${language}`}>
          <img alt={t('landing.brand')} className="brand-logo" src={mehdiCarsLogoUrl} />
        </Link>

        <nav aria-label={t('landing.nav.label')} className="landing-nav">
          <a className="nav-link" href={sectionHref('home')}>
            {t('landing.nav.home')}
          </a>
          <div className="nav-services">
            <button className="nav-link nav-dropdown-trigger" type="button">
              {t('landing.nav.services')}
              <ChevronDown size={15} />
            </button>
            <div className="services-dropdown">
              <Link className="service-menu-card" to={funnelPath}>
                {t('landing.servicesMenu.advisory.title')}
              </Link>
              <Link className="service-menu-card" to={advisoryPath}>
                {t('landing.servicesMenu.sell.title')}
              </Link>
            </div>
          </div>
          <a className="nav-link" href={sectionHref('service-details')}>
            {pickText({ de: 'Service-Details', en: 'Service details', es: 'Detalles del servicio', fr: 'Details du service' }, language)}
          </a>
          <a className="nav-link" href={sectionHref('contact')}>
            {t('landing.nav.contact')}
          </a>
        </nav>

        <div className="topbar-actions">
          <SocialLinks />
          <Link aria-label="Admin login" className="topbar-admin-link" title="Admin login" to="/admin">
            <LogIn size={16} />
          </Link>
          <LanguageSwitch />
        </div>

        <Button
          aria-label={t('landing.nav.openMenu')}
          className="mobile-menu-button"
          icon={mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          onClick={() => setMobileMenuOpen((current) => !current)}
          type="text"
        />
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-panel">
          <nav aria-label={t('landing.nav.mobileLabel')} className="mobile-nav">
            <a href={sectionHref('home')} onClick={closeMobileMenu}>
              {t('landing.nav.home')}
            </a>
            <button className="mobile-services-toggle" onClick={() => setServicesOpen((current) => !current)} type="button">
              {t('landing.nav.services')}
              <ChevronDown className={servicesOpen ? 'is-open' : ''} size={17} />
            </button>
            {servicesOpen && (
              <div className="mobile-services-panel">
                <Link onClick={closeMobileMenu} to={funnelPath}>
                  {t('landing.servicesMenu.advisory.title')}
                </Link>
                <Link onClick={closeMobileMenu} to={advisoryPath}>
                  {t('landing.servicesMenu.sell.title')}
                </Link>
              </div>
            )}
            <a href={sectionHref('service-details')} onClick={closeMobileMenu}>
              {pickText({ de: 'Service-Details', en: 'Service details', es: 'Detalles del servicio', fr: 'Details du service' }, language)}
            </a>
            <a href={sectionHref('contact')} onClick={closeMobileMenu}>
              {t('landing.nav.contact')}
            </a>
          </nav>

          <div className="mobile-nav-actions">
            <SocialLinks />
            <Link aria-label="Admin login" className="topbar-admin-link" onClick={closeMobileMenu} title="Admin login" to="/admin">
              <LogIn size={16} />
            </Link>
            <LanguageSwitch />
          </div>
        </div>
      )}
    </header>
  );
}
