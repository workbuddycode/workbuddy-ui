import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OnboardingWorkBuddy from "./OnboardingWorkBuddy";

describe("OnboardingWorkBuddy Form", () => {
  test("renders all fields including Services multi-select", () => {
    render(<OnboardingWorkBuddy />);

    expect(screen.getByLabelText(/Organisation Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Person Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Industry Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Size/i)).toBeInTheDocument();
    expect(screen.getByText(/Services to Opt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GST No \/ Regn No/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
  });

  test("shows validation error if no service is selected", async () => {
    render(<OnboardingWorkBuddy />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Select at least one service/i)
    ).toBeInTheDocument();

    // also check Bootstrap invalid class is applied
    const dropdown = screen.getByText("Select options...");
    expect(dropdown.closest(".react-select-container")).toHaveClass("is-invalid");
  });

  test("selects multiple services", async () => {
    render(<OnboardingWorkBuddy />);

    // open dropdown
    const dropdown = screen.getByText("Select options...");
    fireEvent.keyDown(dropdown, { key: "ArrowDown" });

    // select Attendance
    fireEvent.click(screen.getByText("Attendance Management"));

    // open again & select Leave
    fireEvent.keyDown(dropdown, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Leave Management"));

    // open again & select Payroll
    fireEvent.keyDown(dropdown, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Payroll Management"));

    // expect all three selected
    expect(screen.getByText("Attendance Management")).toBeInTheDocument();
    expect(screen.getByText("Leave Management")).toBeInTheDocument();
    expect(screen.getByText("Payroll Management")).toBeInTheDocument();
  });
});
