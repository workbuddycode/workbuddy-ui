import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./InternalHeader";

describe("Header", () => {
  it("calls onMenuClick when hamburger is clicked", () => {
    const mockClick = jest.fn();
    render(<Header onMenuClick={mockClick} />);

    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("renders logo text", () => {
    render(<Header />);
    expect(screen.getByText(/workbuddy/i)).toBeInTheDocument();
  });

  it("shows activities popover when clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByText(/activities/i));
    expect(screen.getByText(/recent activities/i)).toBeInTheDocument();
  });

  it("shows notifications popover when clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByText(/Notifications/i));
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });
});
