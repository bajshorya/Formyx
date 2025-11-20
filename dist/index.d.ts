interface FieldConfig {
    name: string;
    label?: string;
    required?: boolean;
    validate?: (value: any, formData?: FormData) => string | undefined;
    dependencies?: string[];
}
type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "textarea" | "select" | "checkbox" | "radio" | "file" | "date" | "datetime-local" | "custom";
type FieldValue = string | number | boolean | File | FileList | any[] | null | undefined;
type FormData = Record<string, FieldValue>;
interface ValidationRule {
    required?: boolean | string;
    min?: number | string;
    max?: number | string;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp | string;
    validate?: (value: FieldValue, formData?: FormData) => string | boolean | undefined | Promise<string | boolean | undefined>;
    message?: string;
}
interface ValidatedFieldConfig extends FieldConfig {
    type?: InputType;
    validation?: ValidationRule;
    options?: {
        label: string;
        value: FieldValue;
    }[];
    multiple?: boolean;
}
interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string | undefined>;
    touched: Record<string, boolean>;
}
interface FormState {
    values: FormData;
    errors: Record<string, string | undefined>;
    touched: Record<string, boolean>;
    isValid: boolean;
    isSubmitting: boolean;
    isDirty: boolean;
}
interface FormConfig {
    fields: Record<string, ValidatedFieldConfig>;
    initialValues?: FormData;
    onSubmit?: (data: FormData) => void | Promise<void>;
    validate?: (values: FormData) => Record<string, string | undefined>;
    validationMode?: "onChange" | "onBlur" | "onSubmit" | "onTouched";
    reValidateMode?: "onChange" | "onBlur";
}

interface InputFieldProps {
    name: string;
    type?: InputType;
    label?: string;
    value: FieldValue;
    options?: {
        label: string;
        value: FieldValue;
    }[];
    multiple?: boolean;
    required?: boolean;
    validation?: ValidationRule;
    error?: string;
    touched?: boolean;
    onChange: (name: string, value: FieldValue, shouldValidate?: boolean) => void;
    onBlur: (name: string, touched?: boolean) => void;
    formData?: FormData;
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    pattern?: string;
    rows?: number;
    accept?: string;
    debounce?: number;
    throttle?: number;
    validationStrategy?: "debounce" | "throttle" | "immediate";
}

interface FormyxProps {
}
interface FormProps {
}
interface InputFieldComponentProps {
}
declare const Formyx: React.ComponentType<FormyxProps>;
declare const Form: React.ComponentType<FormProps>;
declare const InputField: React.ComponentType<InputFieldComponentProps>;

export { Form, Formyx, InputField };
export type { FieldConfig, FieldValue, FormConfig, FormData, FormProps, FormState, FormyxProps, InputFieldComponentProps, InputFieldProps, InputType, ValidatedFieldConfig, ValidationResult, ValidationRule };
