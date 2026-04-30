import { Input, Slider } from 'antd';
import type { SupportedLanguage } from '../../types/i18n';
import type { LeadFormDraft } from '../../types/lead';

interface StepProps {
  data: LeadFormDraft;
  errors: Record<string, string>;
  language: SupportedLanguage;
  updateFormData: (data: Partial<LeadFormDraft>) => void;
}

const currentYear = new Date().getFullYear();

function formatNumber(value: number) {
  return new Intl.NumberFormat('fr-FR').format(value);
}

export function StepCriteria({ data, errors, language, updateFormData }: StepProps) {
  return (
    <div className="lead-step">
      <div className="lead-step-heading">
        <span>02</span>
        <h1>{language === 'fr' ? 'Quel type de véhicule ?' : 'Welches Fahrzeug suchen Sie genau?'}</h1>
      </div>

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
    </div>
  );
}
