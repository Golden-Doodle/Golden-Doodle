import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { View } from "react-native";
import HamburgerWidget from "../HamburgerWidget";
import { Campus } from "@/app/utils/types";

describe("HamburgerWidget Component", () => {
  const mockToggleCampus = jest.fn();
  const mockSetViewCampusMap = jest.fn();

  test("renders the hamburger button correctly", async () => {
    const { getByTestId } = render(
      <View>
        <HamburgerWidget
          toggleCampus={mockToggleCampus}
          viewCampusMap={false}
          setViewCampusMap={mockSetViewCampusMap}
          campus={"SGW" as Campus}
        />
      </View>
    );

    await waitFor(() => expect(getByTestId("hamburger-button")).toBeTruthy());
  });

  test("toggles visibility of menu when hamburger button is clicked", async () => {
    const { getByTestId, queryByTestId } = render(
      <View>
        <HamburgerWidget
          toggleCampus={mockToggleCampus}
          viewCampusMap={false}
          setViewCampusMap={mockSetViewCampusMap}
          campus={"SGW" as Campus}
        />
      </View>
    );

    const hamburgerButton = getByTestId("hamburger-button");

    expect(queryByTestId("menu-options")).toBeNull();

    fireEvent.press(hamburgerButton);
    await waitFor(() => expect(getByTestId("menu-options")).toBeTruthy());

    fireEvent.press(hamburgerButton);
    await waitFor(() => expect(queryByTestId("menu-options")).toBeNull());
  });

  test("toggles the campus map switch", async () => {
    const { getByTestId } = render(
      <View>
        <HamburgerWidget
          toggleCampus={mockToggleCampus}
          viewCampusMap={false}
          setViewCampusMap={mockSetViewCampusMap}
          campus={"SGW" as Campus}
        />
      </View>
    );
  
    fireEvent.press(getByTestId("hamburger-button"));
    await waitFor(() => expect(getByTestId("menu-options")).toBeTruthy());
  
    fireEvent(getByTestId("campus-map-switch"), "valueChange", true);
  
    expect(mockSetViewCampusMap).toHaveBeenCalled(); 
  });
  

  test("toggles dark mode switch", async () => {
    const { getByTestId } = render(
      <View>
        <HamburgerWidget
          toggleCampus={mockToggleCampus}
          viewCampusMap={false}
          setViewCampusMap={mockSetViewCampusMap}
          campus={"SGW" as Campus}
        />
      </View>
    );

    fireEvent.press(getByTestId("hamburger-button")); 
    await waitFor(() => expect(getByTestId("menu-options")).toBeTruthy());

    fireEvent.press(getByTestId("dark-mode-switch"));
    expect(getByTestId("dark-mode-switch")).toBeTruthy();
  });

  test("calls toggleCampus when campus switch button is pressed", async () => {
    const { getByTestId } = render(
      <View>
        <HamburgerWidget
          toggleCampus={mockToggleCampus}
          viewCampusMap={false}
          setViewCampusMap={mockSetViewCampusMap}
          campus={"SGW" as Campus}
        />
      </View>
    );

    fireEvent.press(getByTestId("hamburger-button"));
    await waitFor(() => expect(getByTestId("menu-options")).toBeTruthy());

    fireEvent.press(getByTestId("toggle-campus-button"));
    expect(mockToggleCampus).toHaveBeenCalled();
  });
});
