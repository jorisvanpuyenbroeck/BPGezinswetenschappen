export type FormFieldType = 'text' | 'textarea' | 'select' | 'date';

export interface BaseFieldConfig {
  readonly name: string;
  readonly label: string;
  readonly type: FormFieldType;
  readonly placeholder?: string;
  readonly required: boolean;
}

export interface TextFieldConfig extends BaseFieldConfig {
  readonly type: 'text';
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  readonly type: 'textarea';
  readonly rows?: number;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  readonly type: 'select';
  readonly options: readonly {
    readonly value: any;
    readonly viewValue: string;
  }[];
}

export interface DateFieldConfig extends BaseFieldConfig {
  readonly type: 'date';
}

export type FormFieldConfig =
  | TextFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | DateFieldConfig;

export type FormFields = readonly FormFieldConfig[];

export function isTextArea(
  field: FormFieldConfig
): field is TextareaFieldConfig {
  return field.type === 'textarea';
}

export function isSelect(field: FormFieldConfig): field is SelectFieldConfig {
  return field.type === 'select';
}

export function isDate(field: FormFieldConfig): field is DateFieldConfig {
  return field.type === 'date';
}
