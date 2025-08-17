import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OnboardingClient from "./OnboardingClient";

describe("OnboardingClient Form", () => {
  it("renders required fields", () => {
    render(<OnboardingClient />);
    expect(screen.getByLabelText(/additional contact person/i)).toBeInTheDocument();
  });

  it("shows image preview when logo file is uploaded", async () => {
    render(<OnboardingClient />);
    const file = new File(["dummy"], "logo.png", { type: "image/png" });

    fireEvent.change(screen.getByLabelText(/logo/i), {
      target: { files: [file] }
    });

    await waitFor(() => {
      expect(screen.getByAltText(/logo preview/i)).toBeInTheDocument();
    });
  });

  it("shows validation errors if form is empty", async () => {
    render(<OnboardingClient />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });
});
