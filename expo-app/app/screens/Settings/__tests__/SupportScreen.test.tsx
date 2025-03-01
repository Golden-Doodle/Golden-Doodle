import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import SupportScreen from "../SupportScreen";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("SupportScreen", () => {
  let mockBack: jest.Mock;

  beforeEach(() => {
    mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  it("renders the SupportScreen correctly", () => {
    render(<SupportScreen />);

    expect(screen.getByTestId("headerText")).toHaveTextContent("Support");

    expect(screen.getByTestId("contactEmail")).toHaveTextContent("support@example.com");

    expect(screen.getByTestId("needHelpLabel")).toBeTruthy();
  });

  it("calls router.back() when back button is pressed", () => {
    render(<SupportScreen />);

    fireEvent.press(screen.getByTestId("backButton"));

    expect(mockBack).toHaveBeenCalled();
  });

  it("displays the FAQ section", () => {
    render(<SupportScreen />);

    expect(screen.getByTestId("faqLabel")).toBeTruthy();
    expect(screen.getByTestId("infoText2")).toHaveTextContent(
      "Visit our FAQ section for common questions and answers."
    );
  });

  it("renders the support email correctly and allows email interaction", () => {
    render(<SupportScreen />);
    const emailLink = screen.getByTestId("contactEmail");
    
    expect(emailLink).toHaveTextContent("support@example.com");
    fireEvent.press(emailLink); 
  });
});
