import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomMarker from "../CustomMarker"; 

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("CustomMarker", () => {
  it("should render the food icon when isFoodLocation is true", () => {
    const { getByTestId } = render(
      <CustomMarker
        coordinate={{ latitude: 45.5017, longitude: -73.5673 }}
        isFoodLocation={true}
      />
    );

    const icon = getByTestId("marker-view"); 
    expect(icon).toBeTruthy(); 
  });

  it("should render the marker with the correct default text", () => {
    const { getByText } = render(
      <CustomMarker
        coordinate={{ latitude: 45.5017, longitude: -73.5673 }}
      />
    );

    expect(getByText("U")).toBeTruthy();
  });

  it("should render the marker with custom title and description", () => {
    const { getByText } = render(
      <CustomMarker
        coordinate={{ latitude: 45.5017, longitude: -73.5673 }}
        title="Custom Title"
        description="Custom description"
      />
    );

    expect(getByText("C")).toBeTruthy();
  });

  it("should apply the correct styles when isFoodLocation is true", () => {
    const { getByTestId } = render(
      <CustomMarker
        coordinate={{ latitude: 45.5017, longitude: -73.5673 }}
        isFoodLocation={true}
      />
    );

    const markerView = getByTestId("marker-view");

    expect(markerView.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: "red" })
    );
  });

  it("should trigger the onPress function when the marker is pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomMarker
        coordinate={{ latitude: 45.5017, longitude: -73.5673 }}
        onPress={onPressMock}
      />
    );

    fireEvent.press(getByText("U"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("should render the default marker icon when isFoodLocation is false", () => {
    const { getByText } = render(
      <CustomMarker
        coordinate={{ latitude: 45.5017, longitude: -73.5673 }}
        isFoodLocation={false}
      />
    );

    expect(getByText("U")).toBeTruthy();
  });
});
