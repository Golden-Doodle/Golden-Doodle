import React from "react";
import { render, waitFor, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AuthProvider, AuthContext, AuthContextType } from "../AuthContext";
import { useRouter } from "expo-router";
import { fetchCalendarEvents } from "@/app/services/GoogleCalendar/fetchingUserCalendarData";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

const mockAuth = {
  onAuthStateChanged: jest.fn((callback) => {
    callback(null);
    return jest.fn();
  }),
  signOut: jest.fn().mockResolvedValue(null),
  signInWithCredential: jest.fn().mockResolvedValue({ user: { uid: "123" } }),
};


jest.mock("@react-native-firebase/auth", () => {
  return {
    __esModule: true,
    default: jest.fn(() => mockAuth), 
    auth: mockAuth, 
    GoogleAuthProvider: {
      credential: jest.fn(() => "mock-credential"), 
    },
  };
});




jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn().mockResolvedValue({ idToken: "mock-id-token" }),  // Ensure this is correctly returned
    getTokens: jest.fn().mockResolvedValue({ accessToken: "mock-access-token" }),
    revokeAccess: jest.fn(),
    signOut: jest.fn(),
  },
}));


jest.mock("@/app/services/GoogleCalendar/fetchingUserCalendarData", () => ({
  fetchCalendarEvents: jest.fn().mockResolvedValue([{ id: "1", summary: "Test Event" }]),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ replace: jest.fn() })),
}));

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.spyOn(AsyncStorage, "getItem").mockResolvedValue(JSON.stringify({ uid: "123" }));
    jest.spyOn(AsyncStorage, "setItem").mockResolvedValue();
    jest.spyOn(AsyncStorage, "removeItem").mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("loads user from AsyncStorage on mount", async () => {
    let contextValue = {} as AuthContextType;

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value as AuthContextType;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(contextValue?.user).toEqual({ uid: "123" });
    });
  });

  it("handles sign-out correctly", async () => {
    let contextValue = {} as AuthContextType;

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value as AuthContextType;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await act(async () => {
      await contextValue?.signOut();
    });

    expect(GoogleSignin.signOut).toHaveBeenCalled();
    expect(mockAuth.signOut).toHaveBeenCalled();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user");
    expect(contextValue?.user).toBeNull();
  });

  it("handles Google sign-in correctly", async () => {
    let contextValue = {} as AuthContextType;
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value as AuthContextType;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await act(async () => {
      await contextValue?.handleGoogleSignIn();
    });

    expect(GoogleSignin.signIn).toHaveBeenCalled();
    //expect(auth.GoogleAuthProvider.credential).toHaveBeenCalledWith("mock-id-token");
    //expect(mockAuth.signInWithCredential).toHaveBeenCalled();
    //expect(AsyncStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify({ uid: "123" }));
  });

  it("handles guest sign-in correctly", async () => {
    let contextValue = {} as AuthContextType;
    const mockRouter = { replace: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value as AuthContextType;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await act(async () => {
      await contextValue?.handleSignInAsGuest();
    });

    expect(mockRouter.replace).toHaveBeenCalledWith("/screens/Home/HomePageScreen");
  });

  it("fetches Google Calendar events when user is set", async () => {
    let contextValue = {} as AuthContextType;

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value as AuthContextType;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await act(async () => {
      contextValue.setUser({ uid: "123" } as any);
    });

    await waitFor(() => {
      expect(fetchCalendarEvents).toHaveBeenCalled();
      expect(contextValue.googleCalendarEvents).toEqual([{ id: "1", summary: "Test Event" }]);
    });
  });
});