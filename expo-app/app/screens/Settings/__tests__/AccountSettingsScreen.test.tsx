import React from "react";
import { render, fireEvent, waitFor, cleanup, act } from "@testing-library/react-native";
import { AuthContext } from "../../../contexts/AuthContext";
import AccountSettingsScreen from "../AccountSettingsScreen";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    signOut: jest.fn(),
    revokeAccess: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn(),
    getTokens: jest.fn().mockResolvedValue({
      idToken: "test-id-token",
      accessToken: "test-access-token",
    }),
  },
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("@react-native-firebase/auth", () => ({
  default: {
    signOut: jest.fn(),
    GoogleAuthProvider: {
      credential: jest.fn(),
    },
  },
  FirebaseAuthTypes: {},
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("AccountSettingsScreen", () => {
  let mockAuthContext: any;

  beforeEach(() => {
    mockAuthContext = {
      user: {
        uid: "test-uid",
        email: "test@example.com",
        photoURL: "https://example.com/photo.jpg",
        displayName: "Test User",
        emailVerified: true,
        isAnonymous: false,
        providerId: "google.com",
        phoneNumber: "123-456-7890",
        providerData: [],
        metadata: {
          creationTime: "1234567890",
          lastSignInTime: "1234567890",
        },
        multiFactor: {},
        refreshToken: "test-refresh-token",
        toJSON: jest.fn().mockReturnValue({ email: "test@example.com" }),
      },
      setUser: jest.fn(),
      loading: false,
      signOut: jest.fn(),
      handleGoogleSignIn: jest.fn(),
      handleSignInAsGuest: jest.fn(),
      googleCalendarEvents: [],
      selectedCalendarId: null,
      setSelectedCalendarId: jest.fn(),
    };
  });

  it("renders correctly", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <AccountSettingsScreen />
      </AuthContext.Provider>
    );

    expect(getByTestId("header")).toBeTruthy();
    expect(getByTestId("profile-image")).toBeTruthy();
    expect(getByTestId("email-input").props.value).toBe("test@example.com");
  });


  it("handles save changes button press", async () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <AccountSettingsScreen />
      </AuthContext.Provider>
    );

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByTestId("save-button")).toBeDisabled();
    });
  });
});
