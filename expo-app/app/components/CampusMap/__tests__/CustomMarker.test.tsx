import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CustomMarker from "../CustomMarker";
import { Alert } from "react-native";

describe("CustomMarker Component", () => {
  const mockCoordinate = { latitude: 37.7749, longitude: -122.4194 };

  test("renders the marker correctly", async () => {
    const { getByTestId } = render(<CustomMarker coordinate={mockCoordinate} />);
    expect(getByTestId("marker")).toBeTruthy(); 
  });

  test("displays correct title and description in the callout", async () => {
    const { getByText } = render(
      <CustomMarker
        coordinate={mockCoordinate}
        title="Test Location"
        description="Test Description"
      />
    );

    await waitFor(() => {
      expect(getByText("Test Location")).toBeTruthy();
      expect(getByText("Test Description")).toBeTruthy();
    });
  });

  test("renders food location marker with correct icon", async () => {
    const { getByTestId } = render(
      <CustomMarker coordinate={mockCoordinate} isFoodLocation={true} />
    );

    await waitFor(() => {
      expect(getByTestId("food-marker")).toBeTruthy();
    });
  });

  test("calls onPress function when marker is pressed", async () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <CustomMarker coordinate={mockCoordinate} onPress={mockOnPress} />
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("marker")); 
    });

    expect(mockOnPress).toHaveBeenCalled();
  });

  test("shows alert when 'Navigate Here' button is pressed without onPress", async () => {
    jest.spyOn(Alert, "alert"); 
    
    const { getByTestId } = render(<CustomMarker coordinate={mockCoordinate} />);

    await waitFor(() => {
      expect(getByTestId("callout")).toBeTruthy();
    });

    fireEvent.press(getByTestId("navigate-button"));

    expect(Alert.alert).toHaveBeenCalledWith("Navigation", "Navigate to this location");
  });
});
