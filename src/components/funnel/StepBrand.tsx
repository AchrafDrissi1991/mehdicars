import { Input, Select } from 'antd';
import { carBrands, popularCarBrands } from '../../data/carBrands';
import type { SupportedLanguage } from '../../types/i18n';
import type { LeadFormDraft } from '../../types/lead';

interface StepProps {
  data: LeadFormDraft;
  errors: Record<string, string>;
  language: SupportedLanguage;
  updateFormData: (data: Partial<LeadFormDraft>) => void;
}

const brandOptions = carBrands.map((brand) => ({ label: brand, value: brand }));

export function StepBrand({ data, errors, language, updateFormData }: StepProps) {
  const isOtherBrand = data.brand === 'Autre';

  return (
    <div className="lead-step">
      <div className="lead-step-heading">
        <span>01</span>
        <h1>{language === 'fr' ? 'Quelle marque recherchez-vous ?' : 'Welche Automarke suchen Sie?'}</h1>
      </div>

      <div className="lead-field">
        <label>{language === 'fr' ? 'Marque' : 'Automarke'} *</label>
        <Select
          showSearch
          size="large"
          placeholder={language === 'fr' ? 'Sélectionnez une marque' : 'Marke auswählen'}
          options={brandOptions}
          value={data.brand || undefined}
          onChange={(brand) => updateFormData({ brand, otherBrand: brand === 'Autre' ? data.otherBrand : '' })}
          filterOption={(input, option) =>
            String(option?.label ?? '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
        {errors.brand && <span className="field-error">{errors.brand}</span>}
      </div>

      {isOtherBrand && (
        <div className="lead-field">
          <label>{language === 'fr' ? 'Précisez la marque' : 'Andere Marke angeben'} *</label>
          <Input
            size="large"
            value={data.otherBrand}
            placeholder={language === 'fr' ? 'Précisez la marque' : 'Andere Marke angeben'}
            onChange={(event) => updateFormData({ otherBrand: event.target.value })}
          />
          {errors.otherBrand && <span className="field-error">{errors.otherBrand}</span>}
        </div>
      )}

      <div className="lead-field">
        <label>{language === 'fr' ? 'Modèle optionnel' : 'Modell optional'}</label>
        <Input
          size="large"
          value={data.model}
          placeholder={language === 'fr' ? 'Ex. Q5, Série 3, Golf...' : 'z. B. Q5, 3er, Golf...'}
          onChange={(event) => updateFormData({ model: event.target.value })}
        />
      </div>

      <div className="quick-chip-row" aria-label="Popular brands">
        {popularCarBrands.map((brand) => (
          <button key={brand} type="button" onClick={() => updateFormData({ brand, otherBrand: '' })}>
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
}
