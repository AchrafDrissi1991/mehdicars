import { useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock3, CreditCard, Mail, ShieldCheck } from 'lucide-react';
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
  const locale = language === 'de' ? 'de-DE' : 'fr-FR';
  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const slotTemplates = useMemo(() => {
    const slots: string[] = [];
    for (let hour = 9; hour < 20; hour += 1) {
      const from = `${String(hour).padStart(2, '0')}:00`;
      const to = `${String(hour + 1).padStart(2, '0')}:00`;
      slots.push(`${from} - ${to}`);
    }

    return slots;
  }, []);

  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [reservedSlotsByDate, setReservedSlotsByDate] = useState<Record<string, string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    date: formatDateKey(new Date()),
    time: '',
    paymentMethod: 'Visa',
    question: '',
  });

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    return /^[+]?[0-9]{7,15}$/.test(cleaned);
  };

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
    phoneError: {
      de: 'Bitte eine gueltige Telefonnummer eingeben (nur Ziffern, z.B. +41791234567).',
      fr: 'Veuillez saisir un numéro de téléphone valide (ex: +41791234567).',
    },
    email: {
      de: 'E-Mail-Adresse',
      fr: 'Adresse e-mail',
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
    successBanner: {
      de: 'Buchung bestätigt! Eine Bestätigungsmail wurde an',
      fr: 'Réservation confirmée ! Un e-mail de confirmation a été envoyé à',
    },
    successBannerSuffix: {
      de: 'gesendet.',
      fr: 'envoyé.',
    },
    schedulerTitle: {
      de: 'Termin-Kalender',
      fr: 'Calendrier des rendez-vous',
    },
    schedulerSubtitle: {
      de: 'Verfuegbare Termine am',
      fr: 'Créneaux disponibles le',
    },
    slotButton: {
      de: 'Termin buchen',
      fr: 'Réserver',
    },
    noSlots: {
      de: 'Keine freien Termine an diesem Tag.',
      fr: 'Aucun créneau libre ce jour.',
    },
    reserved: {
      de: 'Reserviert',
      fr: 'Réservé',
    },
    availableOne: {
      de: '1 Platz verfuegbar',
      fr: '1 place disponible',
    },
    selectedSlotText: {
      de: 'Ausgewaehlter Termin:',
      fr: 'Créneau sélectionné:',
    },
    dateReadonlyHint: {
      de: 'Wird ueber den Kalender ausgewaehlt',
      fr: 'Sélectionné via le calendrier',
    },
    selectSlotHint: {
      de: 'Bitte zuerst einen freien Termin auswaehlen.',
      fr: 'Veuillez d\'abord choisir un créneau libre.',
    },
  };

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate),
    [locale, viewDate],
  );

  const selectedDateLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(selectedDate),
    [locale, selectedDate],
  );

  const weekDays = language === 'de'
    ? ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO']
    : ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const totalCells = 42;

    return Array.from({ length: totalCells }, (_, index) => {
      const dayOffset = index - firstWeekday + 1;
      const inCurrentMonth = dayOffset > 0 && dayOffset <= daysInMonth;
      const date = inCurrentMonth
        ? new Date(year, month, dayOffset)
        : dayOffset <= 0
          ? new Date(year, month - 1, prevMonthDays + dayOffset)
          : new Date(year, month + 1, dayOffset - daysInMonth);

      return {
        date,
        inCurrentMonth,
        isSelected: formatDateKey(date) === formatDateKey(selectedDate),
        availableCount: inCurrentMonth
          ? slotTemplates.length - (reservedSlotsByDate[formatDateKey(date)]?.length ?? 0)
          : 0,
      };
    });
  }, [reservedSlotsByDate, selectedDate, slotTemplates, viewDate]);

  const availableSlots = useMemo(() => {
    const reservedForDay = reservedSlotsByDate[formatDateKey(selectedDate)] ?? [];

    return slotTemplates.map((range) => ({
      range,
      available: !reservedForDay.includes(range),
    }));
  }, [reservedSlotsByDate, selectedDate, slotTemplates]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setFormData((prev) => ({ ...prev, date: formatDateKey(date), time: '' }));
    setSelectedSlot('');
  };

  const handleBookSlot = (range: string) => {
    const [start] = range.split(' - ');
    setSelectedSlot(range);
    setFormData((prev) => ({
      ...prev,
      date: formatDateKey(selectedDate),
      time: start,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedSlot) {
      setIsSubmitted(false);
      return;
    }
    if (!validatePhone(formData.phone)) {
      setPhoneError(pickText(advisoryCopy.phoneError, language));
      return;
    }
    setPhoneError('');

    const dayKey = formatDateKey(selectedDate);
    setReservedSlotsByDate((prev) => ({
      ...prev,
      [dayKey]: Array.from(new Set([...(prev[dayKey] ?? []), selectedSlot])),
    }));

    setSelectedSlot('');
    setFormData((prev) => ({ ...prev, time: '' }));
    setIsSubmitted(true);
  };

  return (
    <main className="funnel-page advisory-page">
      <FunnelTopBar current={1} total={1} showProgress={false} />

      {isSubmitted && (
        <div className="advisory-success-banner" role="alert">
          <CheckCircle2 size={28} />
          <span>
            {pickText(advisoryCopy.successBanner, language)}{' '}
            <strong>{formData.email}</strong>{' '}
            {pickText(advisoryCopy.successBannerSuffix, language)}
          </span>
          <button type="button" onClick={() => setIsSubmitted(false)} aria-label="Schließen">✕</button>
        </div>
      )}

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

              <div className="booking-scheduler">
                <div className="booking-scheduler__calendar">
                  <div className="booking-scheduler__header">
                    <strong>{pickText(advisoryCopy.schedulerTitle, language)}</strong>
                    <div className="booking-scheduler__month-nav">
                      <button
                        type="button"
                        aria-label="Previous month"
                        onClick={() => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span>{monthLabel}</span>
                      <button
                        type="button"
                        aria-label="Next month"
                        onClick={() => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="booking-scheduler__weekdays">
                    {weekDays.map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>

                  <div className="booking-scheduler__grid" role="grid">
                    {calendarDays.map((dayItem) => {
                      const label = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(dayItem.date);
                      return (
                        <button
                          key={`${formatDateKey(dayItem.date)}-${dayItem.inCurrentMonth ? 'current' : 'other'}`}
                          className={[
                            'booking-day',
                            dayItem.inCurrentMonth ? 'booking-day--current' : 'booking-day--muted',
                            dayItem.isSelected ? 'booking-day--selected' : '',
                          ].join(' ').trim()}
                          type="button"
                          aria-label={label}
                          onClick={() => handleSelectDate(dayItem.date)}
                        >
                          <span>{dayItem.date.getDate()}</span>
                          {dayItem.inCurrentMonth && dayItem.availableCount > 0 && (
                            <small>{dayItem.availableCount}</small>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="booking-scheduler__slots">
                  <h3>
                    {pickText(advisoryCopy.schedulerSubtitle, language)} <span>{selectedDateLabel}</span>
                  </h3>

                  <div className="booking-slot-list">
                    {availableSlots.some((slot) => slot.available) ? (
                      availableSlots.map((slot) => (
                        <article className="booking-slot-item" key={slot.range}>
                          <div>
                            <strong>
                              <Clock3 size={15} />
                              {slot.range}
                            </strong>
                            <small>
                              {slot.available
                                ? pickText(advisoryCopy.availableOne, language)
                                : pickText(advisoryCopy.reserved, language)}
                            </small>
                          </div>
                          <button
                            type="button"
                            disabled={!slot.available}
                            onClick={() => handleBookSlot(slot.range)}
                          >
                            {pickText(advisoryCopy.slotButton, language)}
                          </button>
                        </article>
                      ))
                    ) : (
                      <p className="booking-slot-list__empty">{pickText(advisoryCopy.noSlots, language)}</p>
                    )}
                  </div>

                  {!selectedSlot && <p className="booking-slot-list__empty">{pickText(advisoryCopy.selectSlotHint, language)}</p>}

                  {selectedSlot && (
                    <p className="booking-scheduler__selected">
                      {pickText(advisoryCopy.selectedSlotText, language)} <strong>{selectedSlot}</strong>
                    </p>
                  )}
                </div>
              </div>

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
                      placeholder="+41 79 123 45 67"
                      onChange={(event) => {
                        setFormData((prev) => ({ ...prev, phone: event.target.value }));
                        if (phoneError) setPhoneError('');
                      }}
                    />
                    {phoneError && <span className="advisory-field-error">{phoneError}</span>}
                  </label>

                  <label>
                    {pickText(advisoryCopy.email, language)}
                    <div className="advisory-input-icon-wrap">
                      <Mail size={18} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        placeholder="name@example.com"
                        onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                      />
                    </div>
                  </label>

                  <label>
                    {pickText(advisoryCopy.date, language)}
                    <div className="advisory-input-icon-wrap">
                      <CalendarDays size={18} />
                      <input
                        type="date"
                        required
                        readOnly
                        value={formData.date}
                        aria-readonly="true"
                      />
                    </div>
                    <small>{pickText(advisoryCopy.dateReadonlyHint, language)}</small>
                  </label>

                  <label>
                    {pickText(advisoryCopy.time, language)}
                    <div className="advisory-input-icon-wrap">
                      <Clock3 size={18} />
                      <input
                        type="time"
                        required
                        readOnly
                        value={formData.time}
                        aria-readonly="true"
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
