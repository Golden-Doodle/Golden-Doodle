import React from "react";
import { render } from "@testing-library/react-native";
import ReportScreen from "../../../screens/Report/ReportScreen";

jest.mock("../../../components/Report/ReportHeader", () => {
  const { View } = require("react-native"); 
  return () => <View testID="report-header" />;
});

jest.mock("../../../components/Report/ReportForm", () => {
  const { View } = require("react-native"); 
  return () => <View testID="report-form" />;
});

jest.mock("../../../components/BottomNavigation/BottomNavigation", () => {
  const { View } = require("react-native"); 
  return () => <View testID="bottom-navigation" />;
});

describe("ReportScreen", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<ReportScreen />);

    expect(getByTestId("report-header")).toBeTruthy();
    expect(getByTestId("report-form")).toBeTruthy();
    expect(getByTestId("bottom-navigation")).toBeTruthy();
  });
});
