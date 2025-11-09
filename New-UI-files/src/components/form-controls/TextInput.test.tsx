import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithForm } from "../../test-utils";
import TextInput from "./TextInput";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

describe("TextInput", () => {
  it("renders and accepts input", () => {
    renderWithForm(<TextInput label="Username" name="username" register={function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<any, TFieldName> | undefined): UseFormRegisterReturn<TFieldName> {
      throw new Error("Function not implemented.");
    }} />);

    const input = screen.getByLabelText(/username/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "john_doe" } });
    expect(input.value).toBe("john_doe");
  });

  it("shows error message when provided", () => {
    renderWithForm(
      <TextInput label="Username" name="username" error="Required" register={function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<any, TFieldName> | undefined): UseFormRegisterReturn<TFieldName> {
        throw new Error("Function not implemented.");
      }} />
    );
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });
});
