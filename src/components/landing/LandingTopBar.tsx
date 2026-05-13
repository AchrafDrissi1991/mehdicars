import { Button, Drawer } from 'antd';
import { ChevronDown, Menu, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { LanguageSwitch } from '../common/LanguageSwitch';
import { SocialLinks } from '../common/SocialLinks';

export function LandingTopBar() {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();
  const funnelPath = `/${lang}/${lang === 'de' ? 'anfrage' : 'demande'}`;
  const advisoryPath = `/${lang}/${lang === 'de' ? 'beratung' : 'conseil'}`;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <header className={`landing-topbar ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="landing-topbar__inner">
        <Link className="brand" to={`/${lang}`}>
          <span className="brand-mark">{t('landing.brandMark')}</span>
          <span>{t('landing.brand')}</span>
        </Link>

        <nav aria-label={t('landing.nav.label')} className="landing-nav">
          <a className="nav-link" href="#home">
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
          <a className="nav-link" href="#process">
            {t('landing.nav.process')}
          </a>
          <a className="nav-link" href="#faq">
            {t('landing.nav.faq')}
          </a>
          <a className="nav-link" href="#contact">
            {t('landing.nav.contact')}
          </a>
        </nav>

        <div className="topbar-actions">
          <SocialLinks />
          <LanguageSwitch />
        </div>

        <Button
          aria-label={t('landing.nav.openMenu')}
          className="mobile-menu-button"
          icon={<Menu size={22} />}
          onClick={() => setDrawerOpen(true)}
          type="text"
        />
        <Link aria-label="Warenkorb" className="mobile-cart-button" to={funnelPath}>
          <ShoppingCart size={20} />
        </Link>
      </div>

      <Drawer
        className="mobile-nav-drawer"
        closeIcon={<X size={22} />}
        onClose={closeDrawer}
        open={drawerOpen}
        placement="right"
        title={t('landing.brand')}
        width={340}
      >
        <nav aria-label={t('landing.nav.mobileLabel')} className="mobile-nav">
          <a href="#home" onClick={closeDrawer}>
            {t('landing.nav.home')}
          </a>
          <button className="mobile-services-toggle" onClick={() => setServicesOpen((current) => !current)} type="button">
            {t('landing.nav.services')}
            <ChevronDown className={servicesOpen ? 'is-open' : ''} size={17} />
          </button>
          {servicesOpen && (
            <div className="mobile-services-panel">
              <Link onClick={closeDrawer} to={funnelPath}>
                {t('landing.servicesMenu.advisory.title')}
              </Link>
              <Link onClick={closeDrawer} to={advisoryPath}>
                {t('landing.servicesMenu.sell.title')}
              </Link>
            </div>
          )}
          <a href="#process" onClick={closeDrawer}>
            {t('landing.nav.process')}
          </a>
          <a href="#faq" onClick={closeDrawer}>
            {t('landing.nav.faq')}
          </a>
          <a href="#contact" onClick={closeDrawer}>
            {t('landing.nav.contact')}
          </a>
        </nav>

        <div className="mobile-nav-actions">
          <SocialLinks />
          <LanguageSwitch />
        </div>
      </Drawer>
    </header>
  );
}
