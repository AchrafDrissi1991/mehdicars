import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Alert, Spin } from 'antd';
import { CheckCircle2, ChevronLeft, ChevronRight, Lock, ShieldCheck } from 'lucide-react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { LandingTopBar } from '../../components/landing/LandingTopBar';
import { pickText } from '../../lib/localized';
import { hasSupabaseConfig } from '../../lib/supabase';
import {
  buildSlotRangeLabel,
  createConsultation,
  getBookingAvailabilityWindow,
  isSlotBlocked,
} from '../../services/consultationService';
import type { AvailabilityBlockRecord, ConsultationSlotRecord } from '../../types/consultation';
import type { SupportedLanguage } from '../../types/i18n';
import '../../components/funnel/funnel.css';
import './landingPage.css';

interface BookingWindowState {
  consultations: ConsultationSlotRecord[];
  blocks: AvailabilityBlockRecord[];
}

const advisoryCopy = {
  brand: {
    de: 'Andi Cars - Beratungsservice',
    fr: 'Andi Cars - Service conseil',
  },
  leftHeadline: {
    de: 'Ihr Projekt. Professionell begleitet.',
    fr: 'Votre projet. Accompagne professionnellement.',
  },
  leftText: {
    de: 'Wir fuehren Sie Schritt fuer Schritt durch den gesamten Kaufprozess - von der Fahrzeugsuche bis zur finalen Uebergabe.',
    fr: "Nous vous guidons etape par etape dans tout le processus d'achat, de la recherche du vehicule jusqu'a la remise finale.",
  },
  bullet1: {
    de: 'Klare Erklaerung jedes Prozessschritts',
    fr: 'Explication claire de chaque etape du processus',
  },
  bullet2: {
    de: 'Antworten zu Budget, Suche und Risiken',
    fr: 'Reponses sur le budget, la recherche et les risques',
  },
  bullet3: {
    de: 'Persoenliche Empfehlungen fuer Ihr Vorhaben',
    fr: 'Recommandations personnalisees pour votre projet',
  },
  promoTag: {
    de: 'Aktionspreis',
    fr: 'Prix promotionnel',
  },
  bookingTitle: {
    de: 'Termin buchen',
    fr: 'Réserver une consultation',
  },
  bookingSubtitle: {
    de: 'Waehlen Sie ein Datum, einen freien Slot und hinterlassen Sie Ihre Angaben.',
    fr: 'Choisissez une date, un creneau libre et laissez vos informations.',
  },
  calendarLabel: {
    de: 'Kalender',
    fr: 'Calendrier',
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
    de: 'Datum',
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
    de: 'Zahlungsmethoden',
    fr: 'Moyens de paiement',
  },
  submit: {
    de: '39 EUR bezahlen und Termin bestaetigen',
    fr: 'Payer 39 EUR et confirmer le rendez-vous',
  },
  legalNote: {
    de: 'Sichere Zahlung · Sofortige Bestaetigung per E-Mail',
    fr: 'Paiement securise · Confirmation immediate par e-mail',
  },
  successBanner: {
    de: 'Buchung bestätigt! Eine Bestätigungsmail wurde an',
    fr: 'Réservation confirmée ! Un e-mail de confirmation a été envoyé à',
  },
  successBannerSuffix: {
    de: 'gesendet.',
    fr: 'envoyé.',
  },
  schedulerSubtitle: {
    de: 'Verfuegbare Slots -',
    fr: 'Créneaux disponibles le',
  },
  slotButton: {
    de: 'Waehlen',
    fr: 'Choisir',
  },
  slotChosen: {
    de: 'Gewaehlt',
    fr: 'Choisi',
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
  selectSlotHint: {
    de: 'Bitte zuerst einen freien Termin auswaehlen.',
    fr: "Veuillez d'abord choisir un créneau libre.",
  },
  limited: {
    de: 'Limitiert',
    fr: 'Limite',
  },
};

function formatDateKey(date: Date) {
  return dayjs(date).format('YYYY-MM-DD');
}

function validatePhone(value: string) {
  const cleaned = value.replace(/\s/g, '');
  return /^[+]?[0-9]{7,15}$/.test(cleaned);
}

export function AdvisoryPage() {
  const { lang = 'fr' } = useParams();
  const language = lang as SupportedLanguage;
  const locale = language === 'de' ? 'de-DE' : 'fr-FR';
  const slotTemplates = useMemo(() => Array.from({ length: 11 }, (_, index) => `${String(index + 9).padStart(2, '0')}:00`), []);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [availabilityWindow, setAvailabilityWindow] = useState<BookingWindowState>({ consultations: [], blocks: [] });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [slotError, setSlotError] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    if (!hasSupabaseConfig()) {
      return;
    }

    const start = dayjs(viewDate).startOf('month').startOf('week').format('YYYY-MM-DD');
    const end = dayjs(viewDate).endOf('month').endOf('week').format('YYYY-MM-DD');

    let isMounted = true;
    setLoadingAvailability(true);
    setAvailabilityError('');

    getBookingAvailabilityWindow(start, end)
      .then((windowData) => {
        if (isMounted) {
          setAvailabilityWindow(windowData);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setAvailabilityError(error instanceof Error ? error.message : 'Availability could not be loaded.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoadingAvailability(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [viewDate]);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate),
    [locale, viewDate],
  );

  const selectedDateLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(selectedDate),
    [locale, selectedDate],
  );

  const currentDateKey = formatDateKey(new Date());
  const selectedDateKey = formatDateKey(selectedDate);
  const selectedDateInput = useMemo(
    () => new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(selectedDate),
    [locale, selectedDate],
  );

  const weekDays = language === 'de'
    ? ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO']
    : ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];

  const availableSlots = useMemo(() => {
    return slotTemplates.map((time) => {
      const blocked = isSlotBlocked({
        appointmentDate: selectedDateKey,
        appointmentTime: time,
        consultations: availabilityWindow.consultations,
        blocks: availabilityWindow.blocks,
      });

      return {
        time,
        range: buildSlotRangeLabel(time),
        available: !blocked,
      };
    });
  }, [availabilityWindow.blocks, availabilityWindow.consultations, selectedDateKey, slotTemplates]);

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    return Array.from({ length: 42 }, (_, index) => {
      const dayOffset = index - firstWeekday + 1;
      const inCurrentMonth = dayOffset > 0 && dayOffset <= daysInMonth;
      const date = inCurrentMonth
        ? new Date(year, month, dayOffset)
        : dayOffset <= 0
          ? new Date(year, month - 1, prevMonthDays + dayOffset)
          : new Date(year, month + 1, dayOffset - daysInMonth);
      const dateKey = formatDateKey(date);
      const availableCount = inCurrentMonth
        ? slotTemplates.filter((time) =>
            !isSlotBlocked({
              appointmentDate: dateKey,
              appointmentTime: time,
              consultations: availabilityWindow.consultations,
              blocks: availabilityWindow.blocks,
            }),
          ).length
        : 0;

      return {
        date,
        dateKey,
        inCurrentMonth,
        isSelected: dateKey === selectedDateKey,
        availableCount,
      };
    });
  }, [availabilityWindow.blocks, availabilityWindow.consultations, selectedDateKey, slotTemplates, viewDate]);

  function handleSelectDate(date: Date) {
    setSelectedDate(date);
    setSelectedSlot('');
    setSlotError('');
    setFormData((prev) => ({
      ...prev,
      date: formatDateKey(date),
      time: '',
    }));
  }

  function handleBookSlot(range: string, time: string) {
    setSelectedSlot(range);
    setSlotError('');
    setFormData((prev) => ({
      ...prev,
      date: selectedDateKey,
      time,
    }));
  }

  async function reloadAvailabilityForCurrentMonth() {
    const start = dayjs(viewDate).startOf('month').startOf('week').format('YYYY-MM-DD');
    const end = dayjs(viewDate).endOf('month').endOf('week').format('YYYY-MM-DD');
    const nextWindow = await getBookingAvailabilityWindow(start, end);
    setAvailabilityWindow(nextWindow);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedSlot || !formData.time) {
      setSlotError(pickText(advisoryCopy.selectSlotHint, language));
      setIsSubmitted(false);
      return;
    }

    if (!validatePhone(formData.phone)) {
      setPhoneError(pickText(advisoryCopy.phoneError, language));
      return;
    }

    setPhoneError('');
    setSlotError('');
    setSubmitting(true);

    try {
      await createConsultation({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        notes: formData.question,
        paymentStatus: 'pending',
        bookingStatus: 'pending',
      });
      setSelectedSlot('');
      setIsSubmitted(true);
      setFormData((prev) => ({ ...prev, time: '' }));

      try {
        await reloadAvailabilityForCurrentMonth();
      } catch (reloadError) {
        setAvailabilityError(
          reloadError instanceof Error
            ? reloadError.message
            : 'Booking was saved, but availability could not be refreshed.',
        );
      }
    } catch (error) {
      setAvailabilityError(error instanceof Error ? error.message : 'Booking could not be saved.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="landing-page funnel-page advisory-page advisory-page-redesign">
      <LandingTopBar />

      {isSubmitted && (
        <div className="advisory-success-banner" role="alert">
          <CheckCircle2 size={28} />
          <span>
            {pickText(advisoryCopy.successBanner, language)} <strong>{formData.email}</strong>{' '}
            {pickText(advisoryCopy.successBannerSuffix, language)}
          </span>
          <button type="button" onClick={() => setIsSubmitted(false)} aria-label="Schließen">✕</button>
        </div>
      )}

      <section className="funnel-content consultation-redesign-section">
        <div className="lead-funnel-shell">
          {!hasSupabaseConfig() && (
            <Alert
              type="warning"
              showIcon
              style={{ marginBottom: 20 }}
              message="Booking backend not configured"
              description="Create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the app. See SUPABASE_SETUP.md for the exact steps."
            />
          )}

          {availabilityError && (
            <Alert
              type="error"
              showIcon
              style={{ marginBottom: 20 }}
              message="Availability issue"
              description={availabilityError}
            />
          )}

          <div className="consultation-redesign" role="region" aria-label={pickText(advisoryCopy.bookingTitle, language)}>
            <article className="consultation-left">
              <div>
                <p className="consultation-brand">{pickText(advisoryCopy.brand, language)}</p>
                <h1 className="consultation-title">{pickText(advisoryCopy.leftHeadline, language)}</h1>
                <p className="consultation-text">{pickText(advisoryCopy.leftText, language)}</p>
                <div className="consultation-features">
                  {[advisoryCopy.bullet1, advisoryCopy.bullet2, advisoryCopy.bullet3].map((item) => (
                    <div className="consultation-feature" key={item.de}>
                      <span className="consultation-feature-dot" aria-hidden="true" />
                      <span>{pickText(item, language)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="consultation-price-box" aria-label={pickText(advisoryCopy.promoTag, language)}>
                <div>
                  <p className="consultation-price-label">{pickText(advisoryCopy.promoTag, language)}</p>
                  <div className="consultation-price-values">
                    <span className="consultation-price-new">39 EUR</span>
                    <span className="consultation-price-old">50 EUR</span>
                  </div>
                </div>
                <span className="consultation-price-badge">{pickText(advisoryCopy.limited, language)}</span>
              </div>
            </article>

            <article className="consultation-right">
              <h2>{pickText(advisoryCopy.bookingTitle, language)}</h2>
              <p className="consultation-subtitle">{pickText(advisoryCopy.bookingSubtitle, language)}</p>

              <p className="consultation-section-label">
                {pickText(advisoryCopy.calendarLabel, language)} - {monthLabel}
              </p>
              <div className="consultation-calendar-wrap">
                <div className="consultation-cal-header">
                  <span className="consultation-cal-month">{monthLabel}</span>
                  <div className="consultation-cal-nav">
                    <button
                      className="consultation-cal-btn"
                      type="button"
                      aria-label="Previous month"
                      onClick={() => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      className="consultation-cal-btn"
                      type="button"
                      aria-label="Next month"
                      onClick={() => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="consultation-cal-grid" role="grid">
                  {weekDays.map((day) => (
                    <div key={day} className="consultation-cal-day-name">{day}</div>
                  ))}

                  {calendarDays.map((dayItem) => {
                    const isToday = dayItem.dateKey === currentDateKey;
                    const label = new Intl.DateTimeFormat(locale, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).format(dayItem.date);

                    return (
                      <button
                        key={`${dayItem.dateKey}-${dayItem.inCurrentMonth ? 'current' : 'other'}`}
                        type="button"
                        className={[
                          'consultation-cal-day',
                          dayItem.inCurrentMonth ? 'is-current' : 'is-other',
                          dayItem.inCurrentMonth && dayItem.availableCount > 0 ? 'is-available' : '',
                          dayItem.isSelected ? 'is-selected' : '',
                          isToday ? 'is-today' : '',
                        ].join(' ').trim()}
                        aria-label={label}
                        disabled={!dayItem.inCurrentMonth}
                        onClick={() => handleSelectDate(dayItem.date)}
                      >
                        {dayItem.date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="consultation-slots-heading">
                {pickText(advisoryCopy.schedulerSubtitle, language)} <strong>{selectedDateLabel}</strong>
              </p>

              {loadingAvailability ? (
                <div className="consultation-empty-hint" style={{ display: 'flex', justifyContent: 'center', padding: '18px 0' }}>
                  <Spin />
                </div>
              ) : (
                <div className="consultation-slots-grid" id="slots">
                  {availableSlots.some((slot) => slot.available) ? (
                    availableSlots.map((slot) => {
                      const isPicked = slot.range === selectedSlot;
                      return (
                        <button
                          key={slot.range}
                          type="button"
                          className={['consultation-slot', isPicked ? 'is-picked' : ''].join(' ').trim()}
                          disabled={!slot.available}
                          onClick={() => handleBookSlot(slot.range, slot.time)}
                        >
                          <div>
                            <p className="consultation-slot-time">{slot.range}</p>
                            <p className="consultation-slot-availability">
                              {slot.available
                                ? pickText(advisoryCopy.availableOne, language)
                                : pickText(advisoryCopy.reserved, language)}
                            </p>
                          </div>
                          <span className="consultation-slot-pill">
                            {isPicked ? pickText(advisoryCopy.slotChosen, language) : pickText(advisoryCopy.slotButton, language)}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <p className="consultation-empty-hint">{pickText(advisoryCopy.noSlots, language)}</p>
                  )}
                </div>
              )}

              {slotError && <p className="consultation-empty-hint">{slotError}</p>}
              {!selectedSlot && !slotError && <p className="consultation-empty-hint">{pickText(advisoryCopy.selectSlotHint, language)}</p>}

              <p className="consultation-section-label">{pickText(advisoryCopy.bookingTitle, language)}</p>
              <form className="consultation-form" onSubmit={(event) => void handleSubmit(event)}>
                <div className="consultation-form-grid">
                  <label className="consultation-field">
                    <span>{pickText(advisoryCopy.firstName, language)}</span>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      placeholder={language === 'de' ? 'Max' : 'Jean'}
                      onChange={(event) => setFormData((prev) => ({ ...prev, firstName: event.target.value }))}
                    />
                  </label>

                  <label className="consultation-field">
                    <span>{pickText(advisoryCopy.lastName, language)}</span>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      placeholder={language === 'de' ? 'Mustermann' : 'Dupont'}
                      onChange={(event) => setFormData((prev) => ({ ...prev, lastName: event.target.value }))}
                    />
                  </label>

                  <label className="consultation-field">
                    <span>{pickText(advisoryCopy.phone, language)}</span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      placeholder="+41 79 123 45 67"
                      onChange={(event) => {
                        setFormData((prev) => ({ ...prev, phone: event.target.value }));
                        if (phoneError) {
                          setPhoneError('');
                        }
                      }}
                    />
                    {phoneError && <span className="consultation-field-error">{phoneError}</span>}
                  </label>

                  <label className="consultation-field">
                    <span>{pickText(advisoryCopy.email, language)}</span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      placeholder="name@example.com"
                      onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    />
                  </label>

                  <label className="consultation-field">
                    <span>{pickText(advisoryCopy.date, language)}</span>
                    <input
                      type="text"
                      required
                      readOnly
                      value={selectedDateInput}
                      aria-readonly="true"
                    />
                  </label>

                  <label className="consultation-field">
                    <span>{pickText(advisoryCopy.time, language)}</span>
                    <input
                      type="text"
                      required
                      readOnly
                      value={formData.time}
                      placeholder="-"
                      aria-readonly="true"
                    />
                  </label>

                  <label className="consultation-field consultation-field-full">
                    <span>{pickText(advisoryCopy.question, language)}</span>
                    <textarea
                      value={formData.question}
                      onChange={(event) => setFormData((prev) => ({ ...prev, question: event.target.value }))}
                      rows={3}
                    />
                  </label>
                </div>

                <div className="consultation-divider" aria-hidden="true" />

                <div className="consultation-payment-title">
                  <ShieldCheck size={16} />
                  <span>{pickText(advisoryCopy.paymentTitle, language)}</span>
                </div>

                <div className="consultation-payment-methods" role="radiogroup" aria-label={pickText(advisoryCopy.paymentTitle, language)}>
                  {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay', 'TWINT'].map((method) => (
                    <label className="consultation-pay-badge" key={method}>
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

                <button className="consultation-cta" type="submit" disabled={!hasSupabaseConfig() || submitting}>
                  <Lock size={14} />
                  {submitting ? 'Saving...' : pickText(advisoryCopy.submit, language)}
                </button>

                <p className="consultation-legal-note">{pickText(advisoryCopy.legalNote, language)}</p>
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
