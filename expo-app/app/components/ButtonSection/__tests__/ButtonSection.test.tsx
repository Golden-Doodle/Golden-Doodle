import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ButtonSection from "../ButtonSection";

describe("ButtonSection Component", () => {
  it("renders both buttons", () => {
    const { getByText } = render(<ButtonSection />);

    expect(getByText("Study Spot")).toBeTruthy();
    expect(getByText("Coffee Stop")).toBeTruthy();
  });

  it("buttons are clickable", () => {
    const { getByText } = render(<ButtonSection />);

    const studySpotButton = getByText("Study Spot");
    const coffeeStopButton = getByText("Coffee Stop");

    fireEvent.press(studySpotButton);
    fireEvent.press(coffeeStopButton);

    expect(studySpotButton).toBeTruthy();
    expect(coffeeStopButton).toBeTruthy();
  });
});
