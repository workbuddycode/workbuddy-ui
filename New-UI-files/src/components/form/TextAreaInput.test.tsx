import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextAreaInput from "./TextAreaInput";

describe("TextAreaInput", () => {
  const mockRegister = jest.fn(() => ({
    onChange: jest.fn(),
    onBlur: jest.fn(),
    name: "description"
  }));

  it("renders label and textarea", () => {
    render(
      <TextAreaInput
        label="Description"
        name="description"
        register={mockRegister}
      />
    );

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it("applies placeholder and rows props", () => {
    render(
      <TextAreaInput
        label="Comments"
        name="comments"
        placeholder="Enter your comments"
        rows={5}
        register={mockRegister}
      />
    );

    const textarea = screen.getByLabelText(/comments/i);
    expect(textarea).toHaveAttribute("placeholder", "Enter your comments");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("updates value when typed into", () => {
    render(
      <TextAreaInput
        label="Feedback"
        name="feedback"
        register={mockRegister}
      />
    );

    const textarea = screen.getByLabelText(/feedback/i) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Great job!" } });
    expect(textarea.value).toBe("Great job!");
  });

  it("renders error message and applies invalid class", () => {
    render(
      <TextAreaInput
        label="Description"
        name="description"
        register={mockRegister}
        error="This field is required"
      />
    );

    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toHaveClass("is-invalid");
  });
});
