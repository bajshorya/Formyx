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

export interface UseDebounce {
  <T extends unknown[]>(fn: (...args: T) => void, delay?: number): (
    ...args: T
  ) => void;
}

export interface UseThrottle {
  <T extends unknown[]>(fn: (...args: T) => void, delay?: number): (
    ...args: T
  ) => void;
}

export declare const Formyx: React.ComponentType<{}>;
export declare const Form: React.ComponentType<{}>;
export declare const InputField: React.ComponentType<InputFieldProps>;

export declare const useDebounce: UseDebounce;
export declare const useThrottle: UseThrottle;
