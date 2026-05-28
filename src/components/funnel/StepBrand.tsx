import { Input, Select } from 'antd';
import { carBrands } from '../../data/carBrands';
import { pickText } from '../../lib/localized';
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
        <h1>{pickText({ de: 'Welche Automarke suchen Sie?', en: 'Which car brand are you looking for?', es: '¿Qué marca de coche busca?', fr: 'Quelle marque recherchez-vous ?' }, language)}</h1>
      </div>

      <div className="lead-field">
        <label>{pickText({ de: 'Automarke', en: 'Brand', es: 'Marca', fr: 'Marque' }, language)} *</label>
        <Select
          showSearch
          size="large"
          placeholder={pickText({ de: 'Marke auswaehlen', en: 'Select a brand', es: 'Seleccione una marca', fr: 'Sélectionnez une marque' }, language)}
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
          <label>{pickText({ de: 'Andere Marke angeben', en: 'Specify the brand', es: 'Indique la marca', fr: 'Précisez la marque' }, language)} *</label>
          <Input
            size="large"
            value={data.otherBrand}
            placeholder={pickText({ de: 'Andere Marke angeben', en: 'Specify the brand', es: 'Indique la marca', fr: 'Précisez la marque' }, language)}
            onChange={(event) => updateFormData({ otherBrand: event.target.value })}
          />
          {errors.otherBrand && <span className="field-error">{errors.otherBrand}</span>}
        </div>
      )}

      <div className="lead-field">
        <label>{pickText({ de: 'Modell optional', en: 'Optional model', es: 'Modelo opcional', fr: 'Modèle optionnel' }, language)}</label>
        <Input
          size="large"
          value={data.model}
          placeholder={pickText({ de: 'z. B. Q5, 3er, Golf...', en: 'e.g. Q5, 3 Series, Golf...', es: 'Ej. Q5, Serie 3, Golf...', fr: 'Ex. Q5, Série 3, Golf...' }, language)}
          onChange={(event) => updateFormData({ model: event.target.value })}
        />
      </div>
    </div>
  );
}
