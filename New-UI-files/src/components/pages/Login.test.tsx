import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login Page", () => {
  it("renders email and password fields", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("shows validation error when fields are empty", async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it("submits when form is valid", async () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" }
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    // You can check submit mock handler if passed
  });
});
