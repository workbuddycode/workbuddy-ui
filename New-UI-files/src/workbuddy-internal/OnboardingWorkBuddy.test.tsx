import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OnboardingWorkBuddy from "./OnboardingWorkBuddy";

describe("OnboardingWorkBuddy Form", () => {
  test("renders all fields in a row-column structure", () => {
    render(<OnboardingWorkBuddy />);

    // Check for the presence of all fields
    expect(screen.getByLabelText(/Organisation Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Person Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Industry Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Size/i)).toBeInTheDocument();
    expect(screen.getByText(/Services to Opt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GST No \/ Regn No/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Logo Upload/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hero Image Upload/i)).toBeInTheDocument();

    // Check for row-column structure
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(0); // Ensure rows exist

    const columns = screen.getAllByRole("column");
    expect(columns.length).toBeGreaterThan(0); // Ensure columns exist
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

  test("shows image preview when logo file is uploaded", async () => {
    render(<OnboardingWorkBuddy />);
    const file = new File(["dummy"], "logo.png", { type: "image/png" });

    fireEvent.change(screen.getByLabelText(/Logo Upload/i), {
      target: { files: [file] }
    });

    await waitFor(() => {
      expect(screen.getByAltText(/logo preview/i)).toBeInTheDocument();
    });
  });

  test("shows validation errors if form is empty", async () => {
    render(<OnboardingWorkBuddy />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });

  test("shows validation error if client type is not selected", async () => {
    render(<OnboardingWorkBuddy />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Client Type is required/i)
    ).toBeInTheDocument();

    // also check Bootstrap invalid class is applied
    const dropdown = screen.getByLabelText("Client Type");
    expect(dropdown).toHaveClass("is-invalid");
  });
});

describe("OnboardingWorkBuddy Component", () => {
  it("renders the dropdown for client type", () => {
    render(<OnboardingWorkBuddy />);

    expect(screen.getByLabelText("Client Type")).toBeInTheDocument();
  });

  it("renders datepickers when 'Free Trial' is selected", () => {
    render(<OnboardingWorkBuddy />);

    const dropdown = screen.getByLabelText("Client Type");
    fireEvent.change(dropdown, { target: { value: "Free Trial" } });

    expect(screen.getByLabelText("From Date")).toBeInTheDocument();
    expect(screen.getByLabelText("To Date")).toBeInTheDocument();
  });

  it("does not render datepickers when 'New Client' is selected", () => {
    render(<OnboardingWorkBuddy />);

    const dropdown = screen.getByLabelText("Client Type");
    fireEvent.change(dropdown, { target: { value: "New Client" } });

    expect(screen.queryByLabelText("From Date")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("To Date")).not.toBeInTheDocument();
  });

  it("submits the correct data for 'New Client'", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<OnboardingWorkBuddy />);

    const dropdown = screen.getByLabelText("Client Type");
    fireEvent.change(dropdown, { target: { value: "New Client" } });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({ clientType: "New Client" })
    );

    consoleSpy.mockRestore();
  });

  it("submits the correct data for 'Free Trial'", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<OnboardingWorkBuddy />);

    const dropdown = screen.getByLabelText("Client Type");
    fireEvent.change(dropdown, { target: { value: "Free Trial" } });

    const fromDateInput = screen.getByLabelText("From Date");
    fireEvent.change(fromDateInput, { target: { value: "2025-11-10" } });

    const toDateInput = screen.getByLabelText("To Date");
    fireEvent.change(toDateInput, { target: { value: "2025-11-20" } });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        clientType: "Free Trial",
        fromDate: "2025-11-10",
        toDate: "2025-11-20",
      })
    );

    consoleSpy.mockRestore();
  });
});
