import React from "react";
import Form from "./components/page";
import InputField from "./components/InputField";
import { useDebounce, useThrottle } from "./hooks";
import "./styles/formyx.css";

// Main component
const Formyx = () => {
  return (
    <div className="formyx-form">
      Formyx Library
      <Form />
    </div>
  );
};

// Export everything as named exports
export { Formyx, Form, InputField, useDebounce, useThrottle };

// Export types
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
