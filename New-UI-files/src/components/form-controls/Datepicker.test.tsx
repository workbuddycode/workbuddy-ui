import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Datepicker from "./Datepicker";

describe("Datepicker Component", () => {
  it("renders the Datepicker component with the correct label", () => {
    const { getByLabelText } = render(
      <Datepicker label="Test Date" selectedDate={null} onChange={() => {}} />
    );

    expect(getByLabelText("Test Date")).toBeInTheDocument();
  });

  it("calls the onChange handler when a date is selected", () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(
      <Datepicker label="Test Date" selectedDate={null} onChange={mockOnChange} />
    );

    const input = getByLabelText("Test Date");
    fireEvent.change(input, { target: { value: "2025-11-10" } });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
