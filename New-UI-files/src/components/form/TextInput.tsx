import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, type = "text", placeholder, register, error }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    <input
      type={type}
      id={name}
      className={`form-control ${error ? "is-invalid" : ""}`}
      placeholder={placeholder}
      {...register(name)}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default TextInput;
