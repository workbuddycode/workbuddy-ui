import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Registration from "./Registration";

describe("Registration Form", () => {
  it("renders all required fields", () => {
    render(<Registration />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("shows validation errors if fields are empty", async () => {
    render(<Registration />);
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(await screen.findAllByText(/required/i)).toHaveLength(3);
  });

  it("submits when valid data is entered", async () => {
    render(<Registration />);
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" }
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      // You can check mock submit function call here if you pass it as prop
      expect(screen.queryByText(/required/i)).toBeNull();
    });
  });
});
