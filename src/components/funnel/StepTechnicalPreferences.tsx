import { Fuel, Settings } from 'lucide-react';
import type { SupportedLanguage } from '../../types/i18n';
import type { FuelType, Gearbox, LeadFormDraft } from '../../types/lead';

interface StepProps {
  data: LeadFormDraft;
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

export function StepTechnicalPreferences({ data, language, updateFormData }: StepProps) {
  return (
    <div className="lead-step">
      <div className="lead-step-heading">
        <span>03</span>
        <h1>{language === 'fr' ? 'Précisez vos préférences techniques' : 'Technische Präferenzen'}</h1>
      </div>

      <div className="choice-section">
        <label>{language === 'fr' ? 'Boîte de vitesses' : 'Getriebe'}</label>
        <div className="choice-grid choice-grid--two">
          {gearboxOptions.map((option) => (
            <button
              className={data.gearbox === option.value ? 'is-selected' : ''}
              key={option.value}
              type="button"
              onClick={() => updateFormData({ gearbox: data.gearbox === option.value ? '' : option.value })}
            >
              <Settings size={20} />
              {option[language]}
            </button>
          ))}
        </div>
      </div>

      <div className="choice-section">
        <label>{language === 'fr' ? 'Carburant' : 'Kraftstoff'}</label>
        <div className="choice-grid">
          {fuelOptions.map((option) => (
            <button
              className={data.fuel === option.value ? 'is-selected' : ''}
              key={option.value}
              type="button"
              onClick={() => updateFormData({ fuel: data.fuel === option.value ? '' : option.value })}
            >
              <Fuel size={20} />
              {option[language]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
