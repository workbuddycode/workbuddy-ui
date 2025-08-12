import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectInput from "./SelectInput";

// Mock register function from react-hook-form
const mockRegister = jest.fn(() => ({}));

describe("SelectInput", () => {
  const label = "Choose Option";
  const name = "choice";
  const options = ["Option 1", "Option 2"];

  it("renders label and default option", () => {
    render(
      <SelectInput
        label={label}
        name={name}
        options={options}
        register={mockRegister}
      />
    );

    // Label
    expect(screen.getByLabelText(label)).toBeInTheDocument();

    // Default option
    expect(screen.getByText(/select\.\.\./i)).toBeInTheDocument();

    // Provided options
    options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument();
    });
  });

  it("calls register with the correct name", () => {
    render(
      <SelectInput
        label={label}
        name={name}
        options={options}
        register={mockRegister}
      />
    );

    expect(mockRegister).toHaveBeenCalledWith(name);
  });

  it("changes value when an option is selected", () => {
    render(
      <SelectInput
        label={label}
        name={name}
        options={options}
        register={mockRegister}
      />
    );

    const select = screen.getByLabelText(label) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "Option 2" } });
    expect(select.value).toBe("Option 2");
  });

  it("renders error message when error is provided", () => {
    render(
      <SelectInput
        label={label}
        name={name}
        options={options}
        register={mockRegister}
        error="This field is required"
      />
    );

    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toHaveClass("is-invalid");
  });
});
