// Type-only exports - no runtime code, no CSS imports
export type {
  FieldConfig,
  InputType,
  FieldValue,
  FormData,
  ValidationRule,
  ValidatedFieldConfig,
  ValidationResult,
  FormState,
  FormConfig,
  InputFieldProps,
} from "./types";

// Component types without implementations
export interface FormyxProps {}
export interface FormProps {}
export interface InputFieldComponentProps {}

// Export component types
export declare const Formyx: React.ComponentType<FormyxProps>;
export declare const Form: React.ComponentType<FormProps>;
export declare const InputField: React.ComponentType<InputFieldComponentProps>;
