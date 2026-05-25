import { Input, Slider } from 'antd';
import { Fuel, Settings } from 'lucide-react';
import type { SupportedLanguage } from '../../types/i18n';
import type { FuelType, Gearbox, LeadFormDraft } from '../../types/lead';

interface StepProps {
  data: LeadFormDraft;
  errors: Record<string, string>;
  language: SupportedLanguage;
  updateFormData: (data: Partial<LeadFormDraft>) => void;
}

const gearboxOptions: Array<{ value: Gearbox; fr: string; de: string }> = [
  { value: 'manual', fr: 'Manuelle', de: 'Manuell' },
  { value: 'automatic', fr: 'Automatique', de: 'Automatik' },
];

const fuelOptions: Array<{ value: FuelType; fr: string; de: string }> = [
  { value: 'petrol', fr: 'Essence', de: 'Benzin' },
  { value: 'diesel', fr: 'Diesel', de: 'Diesel' },
  { value: 'hybrid', fr: 'Hybride', de: 'Hybrid' },
  { value: 'electric', fr: 'Électrique', de: 'Elektro' },
];

const currentYear = new Date().getFullYear();

function formatNumber(value: number) {
  return new Intl.NumberFormat('fr-FR').format(value);
}

function toggleValue<T extends string>(current: T[] | undefined, value: T) {
  const values = current ?? [];
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function StepTechnicalPreferences({ data, errors, language, updateFormData }: StepProps) {
  return (
    <div className="lead-step">
      <div className="lead-step-heading">
        <span>02</span>
        <h1>{language === 'fr' ? 'Critères et préférences techniques' : 'Kriterien und technische Wünsche'}</h1>
      </div>

      <p className="lead-step-intro">
        {language === 'fr'
          ? 'Définissez le véhicule recherché, votre budget ainsi que les options techniques qui vous conviennent.'
          : 'Definieren Sie Ihr Wunschfahrzeug, Ihr Budget sowie die technischen Optionen, die zu Ihnen passen.'}
      </p>

      <div className="lead-field">
        <label>{language === 'fr' ? 'Type de véhicule ou modèle recherché' : 'Fahrzeugtyp oder Modellwunsch'}</label>
        <Input
          size="large"
          value={data.vehicleTypeOrModel}
          placeholder={language === 'fr' ? 'SUV, break, berline...' : 'SUV, Kombi, Limousine...'}
          onChange={(event) => updateFormData({ vehicleTypeOrModel: event.target.value })}
        />
        {errors.criteria && <span className="field-error">{errors.criteria}</span>}
      </div>

      <div className="slider-grid">
        <div className="lead-slider">
          <div>
            <label>{language === 'fr' ? 'Année minimum' : 'Baujahr ab'}</label>
            <strong>{data.minYear ?? currentYear}</strong>
          </div>
          <Slider min={2005} max={currentYear} value={data.minYear ?? currentYear} onChange={(minYear) => updateFormData({ minYear })} />
        </div>
        <div className="lead-slider">
          <div>
            <label>{language === 'fr' ? 'Kilométrage maximum' : 'Maximale Kilometer'}</label>
            <strong>{formatNumber(data.maxMileage ?? 80000)} km</strong>
          </div>
          <Slider
            min={0}
            max={250000}
            step={5000}
            value={data.maxMileage ?? 80000}
            onChange={(maxMileage) => updateFormData({ maxMileage })}
          />
        </div>
        <div className="lead-slider">
          <div>
            <label>{language === 'fr' ? 'Votre budget' : 'Budget'}</label>
            <strong>{formatNumber(data.budget ?? 30000)} €</strong>
          </div>
          <Slider min={5000} max={100000} step={1000} value={data.budget ?? 30000} onChange={(budget) => updateFormData({ budget })} />
        </div>
      </div>

      <div className="choice-section">
        <label>{language === 'fr' ? 'Boîte de vitesses' : 'Getriebe'} *</label>
        <div className="choice-grid choice-grid--two">
          {gearboxOptions.map((option) => (
            <button
              className={data.gearbox?.includes(option.value) ? 'is-selected' : ''}
              key={option.value}
              type="button"
              onClick={() => updateFormData({ gearbox: toggleValue(data.gearbox, option.value) })}
            >
              <Settings size={20} />
              {option[language]}
            </button>
          ))}
        </div>
        {errors.gearbox && <span className="field-error">{errors.gearbox}</span>}
      </div>

      <div className="choice-section">
        <label>{language === 'fr' ? 'Carburant' : 'Kraftstoff'} *</label>
        <div className="choice-grid">
          {fuelOptions.map((option) => (
            <button
              className={data.fuel?.includes(option.value) ? 'is-selected' : ''}
              key={option.value}
              type="button"
              onClick={() => updateFormData({ fuel: toggleValue(data.fuel, option.value) })}
            >
              <Fuel size={20} />
              {option[language]}
            </button>
          ))}
        </div>
        {errors.fuel && <span className="field-error">{errors.fuel}</span>}
      </div>
    </div>
  );
}
