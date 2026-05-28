import { Input, Slider } from 'antd';
import { Fuel, Settings } from 'lucide-react';
import { pickText } from '../../lib/localized';
import type { SupportedLanguage } from '../../types/i18n';
import type { FuelType, Gearbox, LeadFormDraft } from '../../types/lead';

interface StepProps {
  data: LeadFormDraft;
  errors: Record<string, string>;
  language: SupportedLanguage;
  updateFormData: (data: Partial<LeadFormDraft>) => void;
}

const gearboxOptions: Array<{ value: Gearbox; fr: string; de: string; en: string; es: string }> = [
  { value: 'manual', fr: 'Manuelle', de: 'Manuell', en: 'Manual', es: 'Manual' },
  { value: 'automatic', fr: 'Automatique', de: 'Automatik', en: 'Automatic', es: 'Automático' },
];

const fuelOptions: Array<{ value: FuelType; fr: string; de: string; en: string; es: string }> = [
  { value: 'petrol', fr: 'Essence', de: 'Benzin', en: 'Petrol', es: 'Gasolina' },
  { value: 'diesel', fr: 'Diesel', de: 'Diesel', en: 'Diesel', es: 'Diésel' },
  { value: 'hybrid', fr: 'Hybride', de: 'Hybrid', en: 'Hybrid', es: 'Híbrido' },
  { value: 'electric', fr: 'Électrique', de: 'Elektro', en: 'Electric', es: 'Eléctrico' },
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
        <h1>{pickText({ de: 'Kriterien und technische Wuensche', en: 'Criteria and technical preferences', es: 'Criterios y preferencias técnicas', fr: 'Critères et préférences techniques' }, language)}</h1>
      </div>

      <p className="lead-step-intro">
        {pickText(
          {
            de: 'Definieren Sie Ihr Wunschfahrzeug, Ihr Budget sowie die technischen Optionen, die zu Ihnen passen.',
            en: 'Define your target vehicle, your budget and the technical options that fit your needs.',
            es: 'Defina el vehículo deseado, su presupuesto y las opciones técnicas que le convienen.',
            fr: 'Définissez le véhicule recherché, votre budget ainsi que les options techniques qui vous conviennent.',
          },
          language,
        )}
      </p>

      <div className="lead-field">
        <label>{pickText({ de: 'Fahrzeugtyp oder Modellwunsch', en: 'Vehicle type or desired model', es: 'Tipo de vehículo o modelo deseado', fr: 'Type de véhicule ou modèle recherché' }, language)}</label>
        <Input
          size="large"
          value={data.vehicleTypeOrModel}
          placeholder={pickText({ de: 'SUV, Kombi, Limousine...', en: 'SUV, estate, sedan...', es: 'SUV, familiar, berlina...', fr: 'SUV, break, berline...' }, language)}
          onChange={(event) => updateFormData({ vehicleTypeOrModel: event.target.value })}
        />
        {errors.criteria && <span className="field-error">{errors.criteria}</span>}
      </div>

      <div className="slider-grid">
        <div className="lead-slider">
          <div>
            <label>{pickText({ de: 'Baujahr ab', en: 'Minimum year', es: 'Año mínimo', fr: 'Année minimum' }, language)}</label>
            <strong>{data.minYear ?? currentYear}</strong>
          </div>
          <Slider min={2005} max={currentYear} value={data.minYear ?? currentYear} onChange={(minYear) => updateFormData({ minYear })} />
        </div>
        <div className="lead-slider">
          <div>
            <label>{pickText({ de: 'Maximale Kilometer', en: 'Maximum mileage', es: 'Kilometraje máximo', fr: 'Kilométrage maximum' }, language)}</label>
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
            <label>{pickText({ de: 'Budget', en: 'Budget', es: 'Presupuesto', fr: 'Votre budget' }, language)}</label>
            <strong>{formatNumber(data.budget ?? 30000)} €</strong>
          </div>
          <Slider min={5000} max={100000} step={1000} value={data.budget ?? 30000} onChange={(budget) => updateFormData({ budget })} />
        </div>
      </div>

      <div className="choice-section">
        <label>{pickText({ de: 'Getriebe', en: 'Gearbox', es: 'Caja de cambios', fr: 'Boîte de vitesses' }, language)} *</label>
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
        <label>{pickText({ de: 'Kraftstoff', en: 'Fuel', es: 'Combustible', fr: 'Carburant' }, language)} *</label>
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
