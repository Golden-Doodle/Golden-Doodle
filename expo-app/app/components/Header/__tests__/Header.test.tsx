import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { act } from "react-test-renderer";
import Header from "../Header"; 
import { AuthContext } from "@/app/contexts/AuthContext";
import { useRouter } from "expo-router";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleCalendarEvent } from "@/app/utils/types";


jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onAuthStateChanged: jest.fn((callback) => {
      callback(null);
      return jest.fn();
    }),
    signOut: jest.fn(() => Promise.resolve()),
  })),
  FirebaseAuthTypes: {},
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
}));

jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() => Promise.resolve({})),
    getTokens: jest.fn(() =>
      Promise.resolve({ idToken: "dummy-id-token", accessToken: "dummy-access-token" })
    ),
    signOut: jest.fn(() => Promise.resolve()),
    revokeAccess: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

const mockRouterPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

const mockSignOut = jest.fn();

const renderHeader = async (
  user: FirebaseAuthTypes.User | null = null,
  isLoading = false,
  calendarEvents: GoogleCalendarEvent[] = [],
  refreshCalendarEvents = jest.fn()
) => {
  const rendered = render(
    <AuthContext.Provider
      value={{
        user,
        signOut: mockSignOut,
        setUser: jest.fn(),
        loading: false,
        handleGoogleSignIn: jest.fn(),
        handleSignInAsGuest: jest.fn(),
        googleCalendarEvents: [],
        selectedCalendarId: null,
        setSelectedCalendarId: jest.fn(),
      }}
    >
      <Header
        refreshCalendarEvents={refreshCalendarEvents}
        isLoading={isLoading}
        calendarEvents={calendarEvents}
      />
    </AuthContext.Provider>
  );
  await act(async () => {
    jest.runAllTimers();
  });
  return rendered;
};

describe("Header", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should render the Header component correctly", async () => {
    const { getByText } = await renderHeader();
    expect(getByText("Welcome!")).toBeTruthy();
    expect(getByText("Find your next study spot or coffee stop.")).toBeTruthy();
  });

  it("should show the user's display name if user is logged in", async () => {
    const user = { displayName: "Test User" } as unknown as FirebaseAuthTypes.User;
    const { getByText } = await renderHeader(user);
    expect(getByText("Welcome Back, Test User")).toBeTruthy();
  });

  it("should call signOut when logout button is pressed and user is logged in", async () => {
    const user = { displayName: "Test User" } as unknown as FirebaseAuthTypes.User;
    const { getByTestId } = await renderHeader(user);
    await act(async () => {
      fireEvent.press(getByTestId("logout-button"));
      jest.runAllTimers();
    });
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("should navigate to login screen when login button is pressed and user is not logged in", async () => {
    const { getByTestId } = await renderHeader(null);
    await act(async () => {
      fireEvent.press(getByTestId("login-button"));
      jest.runAllTimers();
    });
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("should navigate to HomeMenuScreen when menu button is pressed", async () => {
    const { getByTestId } = await renderHeader();
    await act(async () => {
      fireEvent.press(getByTestId("menu-button"));
      jest.runAllTimers();
    });
    expect(mockRouterPush).toHaveBeenCalledWith("/screens/Home/HomeMenuScreen");
  });

  it("should navigate to CampusMapScreen with optimize route param when optimize route button is pressed and nextClass is available", async () => {
    const user = { displayName: "Test User" } as unknown as FirebaseAuthTypes.User;
    const calendarEvents: GoogleCalendarEvent[] = [
      {
        id: "event1",
        summary: "Class 1",
        start: { dateTime: new Date().toISOString(), timeZone: "UTC" },
        end: { dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), timeZone: "UTC" },
      },
    ];
    const { getByTestId } = await renderHeader(user, false, calendarEvents);
    await act(async () => {
      fireEvent.press(getByTestId("optimize-route-button"));
      jest.runAllTimers();
    });
    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: "/screens/Home/CampusMapScreen",
      params: { pressedOptimizeRoute: "true" },
    });
  });

  it("should disable optimize route button if no nextClass is available", async () => {
    const user = { displayName: "Test User" } as unknown as FirebaseAuthTypes.User;
    const { getByTestId } = await renderHeader(user);
    const optimizeRouteButton = getByTestId("optimize-route-button");
    expect(optimizeRouteButton.props.accessibilityState.disabled).toBe(true);
  });
});