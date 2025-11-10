import React from "react";
import Select, {
  StylesConfig,
  CSSObjectWithLabel,
  GroupBase,
} from "react-select";
import { Controller, Control } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectInputProps {
  label: string;
  name: string;
  options: Option[];
  control: Control<any>;
  error?: string;
  placeholder?: string;
}

const customStyles: StylesConfig<Option, true, GroupBase<Option>> = {
  control: (
    base: CSSObjectWithLabel,
    state: { isFocused: boolean }
  ): CSSObjectWithLabel => ({
    ...base,
    borderColor: state.isFocused ? "#86b7fe" : base.borderColor,
    boxShadow: "none",
    "&:hover": {
      borderColor: state.isFocused ? "#86b7fe" : base.borderColor,
    },
    minHeight: "38px",
  }),
  multiValue: (base: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...base,
    backgroundColor: "#0d6efd",
    color: "white",
  }),
  multiValueLabel: (base: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...base,
    color: "white",
  }),
  multiValueRemove: (base: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...base,
    color: "white",
    ":hover": {
      backgroundColor: "#dc3545",
      color: "white",
    },
  }),
};

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  label,
  name,
  options,
  control,
  error,
  placeholder = "Select options...",
}) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={options}
            placeholder={placeholder}
            classNamePrefix="react-select"
            className={`react-select-container ${error ? "is-invalid" : ""}`}
            styles={customStyles}
            value={
              field.value
                ? options.filter((option) => field.value.includes(option.value))
                : []
            }
            onChange={(selectedOptions) => {
              field.onChange(selectedOptions.map((option) => option.value));
            }}
          />
        )}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default MultiSelectInput;
