import type { InputFieldProps } from "./types";

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

export interface FormyxProps {}
export interface FormProps {}

export type { InputFieldProps as InputFieldComponentProps } from "./types";

export declare const Formyx: React.ComponentType<FormyxProps>;
export declare const CustomForm: React.ComponentType<FormProps>;
export declare const InputField: React.ComponentType<InputFieldProps>; // Use InputFieldProps here
