import InputField from "./components/InputField";
import { useDebounce, useThrottle } from "./hooks";
import "./styles/formyx.css";
import CustomForm from "./components/page";

const Formyx = () => {
  return (
    <div className="formyx-form">
      Formyx Library
      <CustomForm />
    </div>
  );
};

export { Formyx, CustomForm, InputField, useDebounce, useThrottle };

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
