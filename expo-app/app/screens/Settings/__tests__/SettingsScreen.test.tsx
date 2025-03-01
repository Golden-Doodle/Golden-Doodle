import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SettingsScreen from "../SettingsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
    GoogleAuthProvider: {
      credential: jest.fn(),
    },
  })),
}));

describe("SettingsScreen", () => {
  it("renders correctly", async () => {
    const { getByTestId } = render(<SettingsScreen />);
    expect(getByTestId("settings-header")).toBeTruthy();
    expect(getByTestId("settings-list")).toBeTruthy();
    expect(getByTestId("bottom-navigation")).toBeTruthy();
  });

  it("handles notifications toggle", async () => {
    const { getByTestId } = render(<SettingsScreen />);
    const switchElement = getByTestId("notifications-switch");
    fireEvent(switchElement, 'valueChange', true);

    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalledWith("notifications", "true"));
  });

  it("loads default values when no settings are stored in AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null); 

    const { getByTestId } = render(<SettingsScreen />);

    await waitFor(() => {
        expect(getByTestId("notifications-switch").props.value).toBe(false);
        expect(getByTestId("dark-mode-switch").props.value).toBe(false);
    });
  });

});
