import { useState, type CSSProperties, type FormEvent } from 'react';
import { CalendarDays, CheckCircle2, CreditCard, Phone, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { FunnelTopBar } from '../../components/funnel/FunnelTopBar';
import { pickText } from '../../lib/localized';
import type { SupportedLanguage } from '../../types/i18n';
import designerHeroImageUrl from '../../../images/Designerimg.png';

export function AdvisoryPage() {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();
  const language = lang as SupportedLanguage;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    date: '',
    time: '',
    paymentMethod: 'Visa',
    question: '',
  });

  const advisoryCopy = {
    introTitle: {
      de: 'Persoenliche Beratung fuer Ihren Fahrzeugkauf',
      fr: 'Conseil personnalisé pour votre projet automobile',
    },
    introText: {
      de: 'In der Sprechstunde erklaeren wir den gesamten Ablauf: Wie Sie passende Fahrzeuge finden, welche Kriterien wichtig sind, wie wir Angebote pruefen und wie der Kauf sauber abgewickelt wird.',
      fr: 'Pendant la consultation, nous expliquons tout le processus: recherche du bon véhicule, critères importants, vérification des annonces et accompagnement jusqu’à l’achat.',
    },
    bullet1: {
      de: 'Klare Schritt-fuer-Schritt Erklaerung des Prozesses',
      fr: 'Explication claire du processus étape par étape',
    },
    bullet2: {
      de: 'Antworten auf Ihre Fragen zu Suche, Budget und Risiken',
      fr: 'Réponses à vos questions sur la recherche, le budget et les risques',
    },
    bullet3: {
      de: 'Persoenliche Empfehlungen fuer Ihr Fahrzeugprojekt',
      fr: 'Recommandations personnalisées pour votre projet',
    },
    promoTag: {
      de: 'Aktionspreis',
      fr: 'Prix promotionnel',
    },
    promoText: {
      de: 'Eine Sprechstunde kostet aktuell 39EUR statt 50EUR.',
      fr: 'Une consultation coûte actuellement 39EUR au lieu de 50EUR.',
    },
    bookingTitle: {
      de: 'Beratung buchen',
      fr: 'Réserver une consultation',
    },
    bookingSubtitle: {
      de: 'Geben Sie Ihre Daten ein, waehlen Sie Termin und Zahlungsart.',
      fr: 'Indiquez vos informations, choisissez un créneau et le mode de paiement.',
    },
    firstName: {
      de: 'Vorname',
      fr: 'Prénom',
    },
    lastName: {
      de: 'Name',
      fr: 'Nom',
    },
    phone: {
      de: 'Telefonnummer',
      fr: 'Numéro de téléphone',
    },
    date: {
      de: 'Termin (Datum)',
      fr: 'Date du rendez-vous',
    },
    time: {
      de: 'Uhrzeit',
      fr: 'Heure',
    },
    question: {
      de: 'Ihre Frage (optional)',
      fr: 'Votre question (optionnel)',
    },
    paymentTitle: {
      de: 'Online-Zahlung',
      fr: 'Paiement en ligne',
    },
    paymentHint: {
      de: 'Unterstuetzte Methoden:',
      fr: 'Méthodes prises en charge:',
    },
    submit: {
      de: '39EUR jetzt online bezahlen und Termin sichern',
      fr: 'Payer 39EUR en ligne et confirmer le rendez-vous',
    },
    legalNote: {
      de: 'Sichere Zahlung. Nach dem Bezahlen erhalten Sie direkt die Terminbestaetigung.',
      fr: 'Paiement sécurisé. Après le paiement, vous recevez la confirmation immédiate du rendez-vous.',
    },
    success: {
      de: 'Danke! Ihre Anfrage ist vorbereitet. Naechster Schritt: sichere Online-Zahlung.',
      fr: 'Merci ! Votre demande est prête. Prochaine étape: paiement en ligne sécurisé.',
    },
  };

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="funnel-page advisory-page">
      <FunnelTopBar current={1} total={1} showProgress={false} />

      <section className="funnel-hero" style={{ '--funnel-hero-image': `url(${designerHeroImageUrl})` } as CSSProperties}>
        <div className="section-inner funnel-hero__inner">
          <div className="funnel-hero__copy">
            <span className="funnel-hero__eyebrow">Mehdi cars</span>
            <h1>{t('advisory.title')}</h1>
            <p>{t('advisory.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="funnel-content">
        <div className="lead-funnel-shell">
          <div className="advisory-page-grid">
            <article className="advisory-info-card">
              <h2>{pickText(advisoryCopy.introTitle, language)}</h2>
              <p>{pickText(advisoryCopy.introText, language)}</p>

              <div className="advisory-bullet-list">
                {[advisoryCopy.bullet1, advisoryCopy.bullet2, advisoryCopy.bullet3].map((item) => (
                  <div className="advisory-bullet" key={item.de}>
                    <CheckCircle2 size={18} />
                    <span>{pickText(item, language)}</span>
                  </div>
                ))}
              </div>

              <div className="advisory-price-box" aria-label={pickText(advisoryCopy.promoTag, language)}>
                <span className="advisory-price-box__tag">{pickText(advisoryCopy.promoTag, language)}</span>
                <p>{pickText(advisoryCopy.promoText, language)}</p>
                <div className="advisory-price-box__values">
                  <strong>39EUR</strong>
                  <del>50EUR</del>
                </div>
              </div>
            </article>

            <article className="advisory-booking-card">
              <h2>{pickText(advisoryCopy.bookingTitle, language)}</h2>
              <p>{pickText(advisoryCopy.bookingSubtitle, language)}</p>

              <form className="advisory-form" onSubmit={handleSubmit}>
                <div className="advisory-form-grid">
                  <label>
                    {pickText(advisoryCopy.firstName, language)}
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(event) => setFormData((prev) => ({ ...prev, firstName: event.target.value }))}
                    />
                  </label>

                  <label>
                    {pickText(advisoryCopy.lastName, language)}
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(event) => setFormData((prev) => ({ ...prev, lastName: event.target.value }))}
                    />
                  </label>

                  <label>
                    {pickText(advisoryCopy.phone, language)}
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                    />
                  </label>

                  <label>
                    {pickText(advisoryCopy.date, language)}
                    <div className="advisory-input-icon-wrap">
                      <CalendarDays size={18} />
                      <input
                        type="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
                      />
                    </div>
                  </label>

                  <label>
                    {pickText(advisoryCopy.time, language)}
                    <div className="advisory-input-icon-wrap">
                      <Phone size={18} />
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(event) => setFormData((prev) => ({ ...prev, time: event.target.value }))}
                      />
                    </div>
                  </label>

                  <label className="advisory-form-grid__full">
                    {pickText(advisoryCopy.question, language)}
                    <textarea
                      value={formData.question}
                      onChange={(event) => setFormData((prev) => ({ ...prev, question: event.target.value }))}
                      rows={4}
                    />
                  </label>
                </div>

                <div className="advisory-payment-box">
                  <h3>
                    <CreditCard size={18} />
                    {pickText(advisoryCopy.paymentTitle, language)}
                  </h3>
                  <p>{pickText(advisoryCopy.paymentHint, language)}</p>

                  <div className="advisory-payment-methods" role="radiogroup" aria-label={pickText(advisoryCopy.paymentTitle, language)}>
                    {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay', 'TWINT'].map((method) => (
                      <label className="advisory-payment-chip" key={method}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === method}
                          onChange={() => setFormData((prev) => ({ ...prev, paymentMethod: method }))}
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>

                  <button className="advisory-submit" type="submit">
                    <ShieldCheck size={18} />
                    {pickText(advisoryCopy.submit, language)}
                  </button>

                  <small>{pickText(advisoryCopy.legalNote, language)}</small>
                  {isSubmitted && <p className="advisory-success">{pickText(advisoryCopy.success, language)}</p>}
                </div>
              </form>
            </article>
          </div>
        </div>
      </section>

      <footer className="funnel-footer">
        <div className="section-inner funnel-footer__inner">
          <SocialLinks />
        </div>
      </footer>
    </main>
  );
}
