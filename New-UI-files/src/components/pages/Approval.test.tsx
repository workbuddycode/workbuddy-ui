import React from "react";
import { render, screen } from "@testing-library/react";
import Approval from "./Approval";

describe("Approval Component", () => {
  test("renders heading", () => {
    render(<Approval />);
    expect(
      screen.getByText(/Client Details Approval & Profile Creation/i)
    ).toBeInTheDocument();
  });

  test("renders all checklist items", () => {
    render(<Approval />);
    const checklistItems = [
      "Company Overview",
      "Logo Uploaded",
      "Key Contacts Added",
      "GST / Registration Verified",
      "Services Selected",
      "Payment Details",
    ];

    checklistItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders Approve and Reject buttons", () => {
    render(<Approval />);
    expect(
      screen.getByRole("button", { name: /Approve & Create Profile/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reject/i })
    ).toBeInTheDocument();
  });
});
