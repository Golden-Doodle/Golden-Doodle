import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock('expo-font', () => ({
    loadAsync: jest.fn(),
    isLoaded: jest.fn(() => true)
}));


jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);