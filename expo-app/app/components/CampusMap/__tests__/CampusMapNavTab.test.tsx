import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NavTab from "../CampusMapNavTab"; 
import { Building } from "../../../utils/types";

describe("NavTab Component", () => {
  const mockOnNavigatePress = jest.fn();
  const mockOnTravelPress = jest.fn();
  const mockOnEatPress = jest.fn();
  const mockOnNextClassPress = jest.fn();
  const mockOnMoreOptionsPress = jest.fn();
  const mockOnInfoPress = jest.fn();
  const mockOnBackPress = jest.fn();
  const mockOnDirectionsPress = jest.fn();

  const mockBuilding: Building = {
    id: "EV",
    name: "EV Building",
    coordinates: [{ latitude: 45.495, longitude: -73.578 }], 
    fillColor: "blue",
    strokeColor: "black",
    campus: "SGW",
  };
  
  
  test("renders all default navigation buttons when no building is selected", () => {
    const { getByText } = render(
      <NavTab
        campus="SGW"
        selectedBuilding={null}
        onNavigatePress={mockOnNavigatePress}
        onTravelPress={mockOnTravelPress}
        onEatPress={mockOnEatPress}
        onNextClassPress={mockOnNextClassPress}
        onMoreOptionsPress={mockOnMoreOptionsPress}
      />
    );

    expect(getByText("Navigate")).toBeTruthy();
    expect(getByText("SGW")).toBeTruthy();
    expect(getByText("Eat")).toBeTruthy();
    expect(getByText("Class")).toBeTruthy();
    expect(getByText("More")).toBeTruthy();
  });

  test("renders alternative buttons when a building is selected", () => {
    const { getByText } = render(
      <NavTab
        campus="SGW"
        selectedBuilding={mockBuilding} 
        onBackPress={mockOnBackPress}
        onInfoPress={mockOnInfoPress}
        onDirectionsPress={mockOnDirectionsPress}
      />
    );

    expect(getByText("Back")).toBeTruthy();
    expect(getByText("Info")).toBeTruthy();
    expect(getByText("Directions")).toBeTruthy();
  });

  test("calls the correct function when a button is pressed", () => {
    const { getByText } = render(
      <NavTab
        campus="SGW"
        selectedBuilding={null}
        onNavigatePress={mockOnNavigatePress}
        onTravelPress={mockOnTravelPress}
        onEatPress={mockOnEatPress}
        onNextClassPress={mockOnNextClassPress}
        onMoreOptionsPress={mockOnMoreOptionsPress}
      />
    );

    fireEvent.press(getByText("Navigate"));
    expect(mockOnNavigatePress).toHaveBeenCalled();

    fireEvent.press(getByText("SGW"));
    expect(mockOnTravelPress).toHaveBeenCalled();

    fireEvent.press(getByText("Eat"));
    expect(mockOnEatPress).toHaveBeenCalled();

    fireEvent.press(getByText("Class"));
    expect(mockOnNextClassPress).toHaveBeenCalled();

    fireEvent.press(getByText("More"));
    expect(mockOnMoreOptionsPress).toHaveBeenCalled();
  });

  test("calls correct function for buttons when a building is selected", () => {
    const { getByText } = render(
      <NavTab
        campus="SGW"
        selectedBuilding={mockBuilding}
        onBackPress={mockOnBackPress}
        onInfoPress={mockOnInfoPress}
        onDirectionsPress={mockOnDirectionsPress}
      />
    );

    fireEvent.press(getByText("Back"));
    expect(mockOnBackPress).toHaveBeenCalled();

    fireEvent.press(getByText("Info"));
    expect(mockOnInfoPress).toHaveBeenCalled();

    fireEvent.press(getByText("Directions"));
    expect(mockOnDirectionsPress).toHaveBeenCalled();
  });

  test("updates active tab when a button is pressed", () => {
    const { getByText } = render(
      <NavTab
        campus="SGW"
        selectedBuilding={null}
        onNavigatePress={mockOnNavigatePress}
        onTravelPress={mockOnTravelPress}
        onEatPress={mockOnEatPress}
        onNextClassPress={mockOnNextClassPress}
        onMoreOptionsPress={mockOnMoreOptionsPress}
      />
    );

    fireEvent.press(getByText("Navigate"));
    expect(getByText("Navigate").props.style).toEqual(
      expect.arrayContaining([{ color: "#fff", fontWeight: "600" }])
    );
  });
});
