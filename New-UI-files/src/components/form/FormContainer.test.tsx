import React from "react";
import { render, screen } from "@testing-library/react";
import FormContainer from "./FormContainer";

describe("FormContainer", () => {
  it("renders children inside container", () => {
    render(
      <FormContainer>
        <p>Test Form</p>
      </FormContainer>
    );

    expect(screen.getByText(/test form/i)).toBeInTheDocument();
  });

  it("applies correct parent container classes", () => {
    const { container } = render(
      <FormContainer>
        <p>Child</p>
      </FormContainer>
    );

    const parentDiv = container.querySelector(".form-container");
    expect(parentDiv).toHaveClass("d-flex");
    expect(parentDiv).toHaveClass("justify-content-center");
    expect(parentDiv).toHaveClass("align-items-center");
    expect(parentDiv).toHaveClass("min-vh-100");
  });

  it("applies correct width class to inner div", () => {
    const { container } = render(
      <FormContainer>
        <p>Child</p>
      </FormContainer>
    );

    const innerDiv = container.querySelector(".w-50");
    expect(innerDiv).toBeInTheDocument();
  });
});
