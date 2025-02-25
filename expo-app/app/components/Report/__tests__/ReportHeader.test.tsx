import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ReportHeader from "../ReportHeader"; // Adjust the path if necessary
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

// Mocking useRouter to simulate its behavior
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("ReportHeader Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
    });
  });

  test("renders background image", () => {
    const { getByTestId } = render(<ReportHeader />);

    // Check if the ImageBackground is rendered correctly
    const background = getByTestId("background-image");
    expect(background).toBeTruthy();
  });

  test("back button calls router.back when pressed", () => {
    const { getByTestId } = render(<ReportHeader />);

    // Get the back button by testID and simulate press
    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    // Check if router.back() was called
    expect(useRouter().back).toHaveBeenCalled();
  });

  test("renders the report title correctly", () => {
    const { getByTestId } = render(<ReportHeader />);

    // Check if the report title is rendered correctly
    const reportTitle = getByTestId("report-title");
    expect(reportTitle).toHaveTextContent("Report");
  });

  test("renders the anonymous notice", () => {
    const { getByTestId } = render(<ReportHeader />);

    // Check if the anonymous notice is rendered
    const noticeText = getByTestId("notice-text");
    expect(noticeText).toHaveTextContent("All reports remain anonymous.");
  });
});
