import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import MultiSelectInput from "./MultiSelectInput";

// Reusable wrapper with react-hook-form
const Wrapper = ({ error }: { error?: string }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>
        <MultiSelectInput
          label="Services to Opt"
          name="services"
          options={[
            { value: "attendance", label: "Attendance Management" },
            { value: "leave", label: "Leave Management" },
            { value: "payroll", label: "Payroll Management" },
          ]}
          control={methods.control}
          error={error}
        />
      </form>
    </FormProvider>
  );
};

describe("MultiSelectInput Component", () => {
  test("renders label and placeholder", () => {
    render(<Wrapper />);
    expect(screen.getByText("Services to Opt")).toBeInTheDocument();
    expect(screen.getByText("Select options...")).toBeInTheDocument();
  });

  test("selects multiple options", () => {
    render(<Wrapper />);
    const dropdown = screen.getByText("Select options...");

    // open & select Attendance
    fireEvent.keyDown(dropdown, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Attendance Management"));

    // open & select Leave
    fireEvent.keyDown(dropdown, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Leave Management"));

    // open & select Payroll
    fireEvent.keyDown(dropdown, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Payroll Management"));

    // All 3 should appear as selected
    expect(screen.getByText("Attendance Management")).toBeInTheDocument();
    expect(screen.getByText("Leave Management")).toBeInTheDocument();
    expect(screen.getByText("Payroll Management")).toBeInTheDocument();
  });

  test("displays error message with Bootstrap invalid class", () => {
    render(<Wrapper error="Please select at least one service" />);
    expect(
      screen.getByText("Please select at least one service")
    ).toBeInTheDocument();

    const dropdown = screen.getByText("Select options...");
    expect(dropdown.closest(".react-select-container")).toHaveClass("is-invalid");
  });
});
