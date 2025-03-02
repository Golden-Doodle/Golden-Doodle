import React from "react";
import { render, fireEvent, waitFor, cleanup, act } from "@testing-library/react-native";
import SignInScreen from "../index";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

jest.useFakeTimers();

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn().mockResolvedValue({ idToken: "test-id-token" }),
    getTokens: jest.fn().mockResolvedValue({ idToken: "test-id-token", accessToken: "test-access-token" }),
    revokeAccess: jest.fn(),
    signOut: jest.fn(),
  },
}));

jest.mock("@react-native-firebase/auth", () => ({
  default: {
    GoogleAuthProvider: {
      credential: jest.fn(),
    },
    signInWithCredential: jest.fn().mockResolvedValue({ user: { uid: "1", email: "test@example.com" } }),
    signOut: jest.fn(),
  },
  FirebaseAuthTypes: {},
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

describe("SignInScreen", () => {
  let mockAuthContext: AuthContextType;

  beforeEach(() => {
    mockAuthContext = {
      user: null as FirebaseAuthTypes.User | null,
      setUser: jest.fn(),
      signOut: jest.fn(),
      handleGoogleSignIn: jest.fn(),
      handleSignInAsGuest: jest.fn(),
      googleCalendarEvents: [],
      selectedCalendarId: null,
      setSelectedCalendarId: jest.fn(),
      loading: false,
    };
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <SignInScreen />
      </AuthContext.Provider>
    );

    expect(getByText("Welcome to Concordia Navigator")).toBeTruthy();
    expect(getByText("Sign in or continue as a guest")).toBeTruthy();
  });

  it("navigates to HomePageScreen if user is logged in", () => {
    mockAuthContext.user = { uid: "1", email: "test@example.com" } as FirebaseAuthTypes.User;
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <SignInScreen />
      </AuthContext.Provider>
    );

    expect(mockPush).toHaveBeenCalledWith("/screens/Home/HomePageScreen");
  });

  it("calls handleGoogleSignIn when the Google button is pressed", async () => {
    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <SignInScreen />
      </AuthContext.Provider>
    );

    const googleButton = getByText("Sign in with Google");
    fireEvent.press(googleButton);

    await waitFor(() => expect(mockAuthContext.handleGoogleSignIn).toHaveBeenCalled());
  });

  it("calls handleSignInAsGuest when the Guest button is pressed", async () => {
    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <SignInScreen />
      </AuthContext.Provider>
    );

    const guestButton = getByText("Continue as Guest");
    fireEvent.press(guestButton);

    await waitFor(() => expect(mockAuthContext.handleSignInAsGuest).toHaveBeenCalled());
  });

  it("renders a loading screen when loading is true", () => {
    mockAuthContext.loading = true;
    const { getByTestId } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <SignInScreen />
      </AuthContext.Provider>
    );

    expect(getByTestId("loading-screen")).toBeTruthy();
  });
});
