import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CampusMapScreen from "../CampusMapScreen";
import { useRouter, useLocalSearchParams } from "expo-router";
import CampusMapping from "../../../components/CampusMap/CampusMap";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
}));

jest.mock("../../../components/CampusMap/CampusMap", () => ({
  __esModule: true,
  default: () => <></>, 
}));

describe("CampusMapScreen", () => {
  let routerMock: { back: jest.Mock };

  beforeEach(() => {
    routerMock = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
  });

  it("renders correctly", () => {
    const { getByText } = render(<CampusMapScreen />);
    expect(getByText("")).toBeTruthy();
  });

  it("navigates back when the back button is pressed", () => {
    const { getByText } = render(<CampusMapScreen />);
    const backButton = getByText(""); 
    fireEvent.press(backButton);
    expect(routerMock.back).toHaveBeenCalled();
  });

  it("renders the CampusMapping component", () => {
    const { UNSAFE_getByType } = render(<CampusMapScreen />);
    expect(UNSAFE_getByType(CampusMapping)).toBeTruthy();
  });

  it("passes pressedOptimizeRoute prop correctly to CampusMapping", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ pressedOptimizeRoute: "true" });
    const { UNSAFE_getByType } = render(<CampusMapScreen />);
    expect(UNSAFE_getByType(CampusMapping).props.pressedOptimizeRoute).toBe(true);
  });

  it("handles missing pressedOptimizeRoute prop gracefully", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const { UNSAFE_getByType } = render(<CampusMapScreen />);
    expect(UNSAFE_getByType(CampusMapping).props.pressedOptimizeRoute).toBe(false);
  });
});
