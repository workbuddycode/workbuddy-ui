import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextAreaInputProps {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, name, rows = 3, placeholder, register, error }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    <textarea
      id={name}
      rows={rows}
      placeholder={placeholder}
      className={`form-control ${error ? "is-invalid" : ""}`}
      {...register(name)}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default TextAreaInput;
