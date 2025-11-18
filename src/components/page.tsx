import React, { useState } from "react";
import InputField from "./InputField";
import type { FieldValue, FormData } from "../types";

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

  const handleChange = (
    name: string,
    value: FieldValue,
    shouldValidate = true
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setTouched(allTouched);

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
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
        />

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
        />

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
        />

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

        <InputField
          name="bio"
          type="textarea"
          label="Bio"
          value={formData.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell us about yourself"
        />

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

        <InputField
          name="gender"
          type="radio"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          options={genderOptions}
        />

        <InputField
          name="subscribe"
          type="checkbox"
          label="Subscribe to newsletter"
          value={formData.subscribe}
          onChange={handleChange}
          onBlur={handleBlur}
        />

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
