import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OnboardingWorkBuddy from "./OnboardingWorkBuddy";

describe("OnboardingWorkBuddy Form", () => {
  it("renders all required fields", () => {
    render(<OnboardingWorkBuddy />);
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact person/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/services to be opted/i)).toBeInTheDocument();
  });

  it("shows validation errors when empty", async () => {
    render(<OnboardingWorkBuddy />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findAllByText(/required/i)).toHaveLength(4);
  });

  it("submits when all fields are valid", async () => {
    render(<OnboardingWorkBuddy />);
    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "Acme Corp" }
    });
    fireEvent.change(screen.getByLabelText(/contact person/i), {
      target: { value: "Jane Doe" }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jane@example.com" }
    });
    fireEvent.change(screen.getByLabelText(/services to be opted/i), {
      target: { value: "Payroll, Recruitment" }
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.queryByText(/required/i)).toBeNull();
    });
  });

  it("shows file preview when uploading logo", async () => {
    render(<OnboardingWorkBuddy />);
    const file = new File(["dummy"], "logo.png", { type: "image/png" });

    fireEvent.change(screen.getByLabelText(/logo/i), {
      target: { files: [file] }
    });

    await waitFor(() => {
      expect(screen.getByAltText(/logo preview/i)).toBeInTheDocument();
    });
  });
});
