import { Checkbox, Input, InputNumber, Radio, Space } from 'antd';
import type { FunnelAnswers, FunnelQuestion } from '../../types/funnel';
import type { SupportedLanguage } from '../../types/i18n';

interface QuestionRendererProps {
  answers: FunnelAnswers;
  language: SupportedLanguage;
  question: FunnelQuestion;
  onChange: (key: string, value: FunnelAnswers[string]) => void;
}

export function QuestionRenderer({ answers, language, question, onChange }: QuestionRendererProps) {
  const value = answers[question.key];
  const placeholder = question.placeholder?.[language];

  if (question.type === 'single_select') {
    return (
      <Radio.Group
        className="option-grid"
        value={value}
        onChange={(event) => onChange(question.key, event.target.value)}
      >
        {question.options?.map((option) => (
          <Radio.Button key={option.value} value={option.value}>
            {option.label[language]}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }

  if (question.type === 'multi_select') {
    return (
      <Checkbox.Group
        className="option-check-grid"
        value={Array.isArray(value) ? value : []}
        onChange={(nextValue) => onChange(question.key, nextValue.map(String))}
      >
        <Space direction="vertical">
          {question.options?.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.label[language]}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    );
  }

  if (question.type === 'textarea') {
    return (
      <Input.TextArea
        className="full-control"
        rows={5}
        size="large"
        value={typeof value === 'string' ? value : ''}
        placeholder={placeholder}
        onChange={(event) => onChange(question.key, event.target.value)}
      />
    );
  }

  if (question.type === 'number') {
    return (
      <InputNumber
        className="full-control"
        min={0}
        size="large"
        value={typeof value === 'number' ? value : undefined}
        placeholder={placeholder}
        onChange={(nextValue) => onChange(question.key, nextValue ?? undefined)}
      />
    );
  }

  return (
    <Input
      className="full-control"
      size="large"
      type={question.type === 'email' ? 'email' : 'text'}
      value={typeof value === 'string' ? value : ''}
      placeholder={placeholder}
      onChange={(event) => onChange(question.key, event.target.value)}
    />
  );
}
