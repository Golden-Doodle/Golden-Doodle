import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import StudySpots from "../StudySpotScreen"; 

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("StudySpots", () => {
  it("renders correctly", () => {
    const { getByText } = render(<StudySpots />);

    expect(getByText("Study Spots")).toBeTruthy();
    expect(getByText("Nearby study spots will be displayed here.")).toBeTruthy();
  });

  it("should call router.back() when back button is pressed", () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });

    const { getByText } = render(<StudySpots />);

    const backButton = getByText("Back");
    fireEvent.press(backButton);

    expect(mockBack).toHaveBeenCalled();
  });
});
