import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithForm } from "../../test-utils";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("renders and accepts input", () => {
    renderWithForm(<TextInput label="Username" name="username" />);

    const input = screen.getByLabelText(/username/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "john_doe" } });
    expect(input.value).toBe("john_doe");
  });

  it("shows error message when provided", () => {
    renderWithForm(
      <TextInput label="Username" name="username" error="Required" />
    );
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });
});
