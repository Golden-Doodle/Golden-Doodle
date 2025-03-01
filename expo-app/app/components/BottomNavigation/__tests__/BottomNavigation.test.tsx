import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import BottomNavigation from "../BottomNavigation";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("BottomNavigation Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all tabs with correct labels and icons", () => {
    const { getByText, getByTestId } = render(<BottomNavigation testID="bottom-nav" />);

    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Services")).toBeTruthy();
    expect(getByText("Report")).toBeTruthy();
    expect(getByText("Settings")).toBeTruthy();

    expect(getByTestId("bottom-nav-home-tab")).toBeTruthy();
    expect(getByTestId("bottom-nav-services-tab")).toBeTruthy();
    expect(getByTestId("bottom-nav-report-tab")).toBeTruthy();
    expect(getByTestId("bottom-nav-settings-tab")).toBeTruthy();
  });

  it("navigates to the correct path when a tab is clicked", () => {
    const { getByTestId } = render(<BottomNavigation testID="bottom-nav" />);

    fireEvent.press(getByTestId("bottom-nav-home-tab"));
    expect(mockPush).toHaveBeenCalledWith("/screens/Home/HomePageScreen");

    fireEvent.press(getByTestId("bottom-nav-report-tab"));
    expect(mockPush).toHaveBeenCalledWith("/screens/Report/ReportScreen");

    fireEvent.press(getByTestId("bottom-nav-settings-tab"));
    expect(mockPush).toHaveBeenCalledWith("/screens/Settings/SettingsScreen");
  });
});
