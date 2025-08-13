import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileInput from "./FileInput";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

describe("FileInput", () => {
  const mockRegister = jest.fn(() => ({
    onChange: jest.fn(),
    onBlur: jest.fn(),
    name: "file"
  }));

  it("renders label and input", () => {
    render(<FileInput label="Upload File" name="file" register={function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<any, TFieldName> | undefined): UseFormRegisterReturn<TFieldName> {
      throw new Error("Function not implemented.");
    } }  />);
    expect(screen.getByLabelText(/upload file/i)).toBeInTheDocument();
  });

  it("applies error class and shows error message", () => {
    render(
      <FileInput
        label="Upload File"
        name="file"
        error="This field is required" register={function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<any, TFieldName> | undefined): UseFormRegisterReturn<TFieldName> {
          throw new Error("Function not implemented.");
        } }      />
    );
    const input = screen.getByLabelText(/upload file/i);
    expect(input).toHaveClass("is-invalid");
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });

  it("shows image preview when an image is uploaded", async () => {
    render(<FileInput label="Upload File" name="file" register={function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<any, TFieldName> | undefined): UseFormRegisterReturn<TFieldName> {
      throw new Error("Function not implemented.");
    } }  />);

    const input = screen.getByLabelText(/upload file/i) as HTMLInputElement;
    const file = new File(["dummy"], "test.png", { type: "image/png" });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText(/preview/i)).toBeInTheDocument();
    });
  });

  it("does not show preview for non-image file", async () => {
    render(<FileInput label="Upload File" name="file" register={function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<any, TFieldName> | undefined): UseFormRegisterReturn<TFieldName> {
      throw new Error("Function not implemented.");
    } }  />);

    const input = screen.getByLabelText(/upload file/i) as HTMLInputElement;
    const file = new File(["dummy"], "test.pdf", { type: "application/pdf" });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.queryByAltText(/preview/i)).toBeNull();
    });
  });
});
