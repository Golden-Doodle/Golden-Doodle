import React from "react";
import { render } from "@testing-library/react-native";
import CampusMap from "../CampusMap"; 

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({
    status: "granted", 
  }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: {
      latitude: 45.5017,
      longitude: -73.5673,
    },
  }),
}));

describe("CampusMap", () => {
  it("should render markers for SGW campus", async () => {
    const { findByText } = render(<CampusMap pressedOptimizeRoute={false} />);

    const markerTitle = "SGW";  
    const marker = await findByText(markerTitle);

    expect(marker).toBeTruthy();
  });
});