import React, { useState } from "react";
import InputField from "./InputField";
import type { FieldValue, FormData } from "../types";
import { useDebounce, useThrottle } from "../hooks";

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    age: "",
    bio: "",
    country: "",
    subscribe: false,
    gender: "",
    avatar: null,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Debounced form submission
  const debouncedSubmit = useDebounce((data: FormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  }, 500);

  // Throttled search (example for search fields)
  const throttledSearch = useThrottle((query: string) => {
    console.log("Searching for:", query);
    // This would typically call an API
  }, 1000);

  const handleChange = (
    name: string,
    value: FieldValue,
    shouldValidate = true
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Example: Use throttle for search-like fields
    if (name === "username" && typeof value === "string" && value.length > 2) {
      throttledSearch(value);
    }

    if (shouldValidate) {
      validateField(name, value);
    }
  };

  const handleBlur = (name: string, isTouched = true) => {
    if (isTouched) {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
      validateField(name, formData[name]);
    }
  };

  const validateField = (name: string, value: FieldValue) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value) error = "Username is required";
        else if ((value as string).length < 3)
          error = "Username must be at least 3 characters";
        break;

      case "email":
        if (!value) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value as string))
          error = "Email is invalid";
        break;

      case "password":
        if (!value) error = "Password is required";
        else if ((value as string).length < 6)
          error = "Password must be at least 6 characters";
        break;

      case "age":
        if (value && (Number(value) < 18 || Number(value) > 100)) {
          error = "Age must be between 18 and 100";
        }
        break;

      case "country":
        if (!value) error = "Please select a country";
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched on submit
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setTouched(allTouched);

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    // Check if form is valid
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      debouncedSubmit(formData);
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  const countryOptions = [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" },
    { label: "Australia", value: "au" },
  ];

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="formyx-form">
      <h2>Formyx Demo Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Text Input with Debounced Validation */}
        <InputField
          name="username"
          type="text"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
          touched={touched.username}
          required
          placeholder="Enter your username"
          debounce={500}
          validationStrategy="debounce"
        />

        {/* Email Input with Throttled Validation */}
        <InputField
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          required
          placeholder="Enter your email"
          throttle={1000}
          validationStrategy="throttle"
        />

        {/* Password Input with Immediate Validation */}
        <InputField
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
          required
          placeholder="Enter your password"
          validationStrategy="immediate"
        />

        {/* Number Input */}
        <InputField
          name="age"
          type="number"
          label="Age"
          value={formData.age}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.age}
          touched={touched.age}
          placeholder="Enter your age"
        />

        {/* Textarea */}
        <InputField
          name="bio"
          type="textarea"
          label="Bio"
          value={formData.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell us about yourself"
          rows={3}
        />

        {/* Select Dropdown */}
        <InputField
          name="country"
          type="select"
          label="Country"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.country}
          touched={touched.country}
          options={countryOptions}
          required
        />

        {/* Radio Buttons */}
        <InputField
          name="gender"
          type="radio"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          options={genderOptions}
        />

        {/* Checkbox */}
        <InputField
          name="subscribe"
          type="checkbox"
          label="Subscribe to newsletter"
          value={formData.subscribe}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* File Input */}
        <InputField
          name="avatar"
          type="file"
          label="Profile Picture"
          value={formData.avatar}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <button type="submit" className="formyx-submit-button">
          Submit Form
        </button>
      </form>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <h3>Form Data (Debug):</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        <h3>Errors:</h3>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
        <h3>Touched Fields:</h3>
        <pre>{JSON.stringify(touched, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Form;
