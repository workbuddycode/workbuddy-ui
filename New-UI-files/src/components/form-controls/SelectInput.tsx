import React from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectInputProps {
  label: string;
  name: string;
  options: string[];
  register: UseFormRegister<any>;
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, options, register, error }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    <select
      id={name}
      className={`form-select ${error ? "is-invalid" : ""}`}
      {...register(name)}
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default SelectInput;
