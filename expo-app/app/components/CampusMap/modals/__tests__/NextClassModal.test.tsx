import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import NextClassModal from "../NextClassModal";
import { fetchCalendarEvents } from "@/app/services/GoogleCalendar/fetchingUserCalendarData";
import { GoogleCalendarEvent } from "@/app/utils/types";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock("@/app/services/GoogleCalendar/fetchingUserCalendarData", () => ({
  fetchCalendarEvents: jest.fn(),
}));

const mockNextClass: GoogleCalendarEvent = {
  id: "1",
  summary: "Math 101",
  start: { dateTime: "2025-03-01T10:00:00", timeZone: "America/Toronto" },
  end: { dateTime: "2025-03-01T11:00:00", timeZone: "America/Toronto" },
  location: '{"room": "123", "building": {"id": "1", "name": "Engineering", "coordinates": [{"latitude": 45.497, "longitude": -73.579}], "campus": "SGW"}}',
};

describe("NextClassModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly when no upcoming class is found", async () => {
    (fetchCalendarEvents as jest.Mock).mockResolvedValueOnce({ scheduleName: "Test Schedule", events: [] });

    const { getByTestId } = render(
      <NextClassModal visible={true} onClose={() => {}} destination={{ coordinates: { latitude: 0, longitude: 0 } }} setDestination={() => {}} />
    );

    await waitFor(() => {
      expect(getByTestId("no-class-text")).toHaveTextContent("No upcoming classes found.");
    });
  });

  it("should render loading state correctly", async () => {
    (fetchCalendarEvents as jest.Mock).mockResolvedValueOnce({ scheduleName: "Test Schedule", events: [] });

    const { getByTestId } = render(
      <NextClassModal visible={true} onClose={() => {}} destination={{ coordinates: { latitude: 0, longitude: 0 } }} setDestination={() => {}} />
    );

    await waitFor(() => {
      expect(getByTestId("loading-indicator")).toBeTruthy();
    });
  });

  it("should display class details when events are available", async () => {
    (fetchCalendarEvents as jest.Mock).mockResolvedValueOnce({ scheduleName: "Test Schedule", events: [mockNextClass] });

    const { getByTestId } = render(
      <NextClassModal visible={true} onClose={() => {}} destination={{ coordinates: { latitude: 0, longitude: 0 } }} setDestination={() => {}} />
    );

    await waitFor(() => {
      expect(getByTestId("class-name")).toHaveTextContent("Math 101");
      expect(getByTestId("class-time")).toHaveTextContent("10:00 a.m. - 11:00 a.m.");
      expect(getByTestId("room-value")).toHaveTextContent("123");
      expect(getByTestId("building-value")).toHaveTextContent("Engineering");
    });
  });

  it("should disable the button if no location is provided", async () => {
    (fetchCalendarEvents as jest.Mock).mockResolvedValueOnce({
      scheduleName: "Test Schedule",
      events: [mockNextClass],
    });

    const { getByTestId, queryByTestId } = render(
      <NextClassModal
        visible={true}
        onClose={() => {}}
        destination={{ coordinates: { latitude: 0, longitude: 0 } }}
        setDestination={() => {}}
      />
    );

    await waitFor(() => {
      expect(queryByTestId("loading-indicator")).toBeNull();
    });

    const button = getByTestId("get-directions-button");
    expect(button).toBeDisabled();

    expect(getByTestId("class-name")).toHaveTextContent("Math 101");
    expect(getByTestId("class-time")).toHaveTextContent("10:00 a.m. - 11:00 a.m.");
    expect(getByTestId("room-value")).toHaveTextContent("123");
    expect(getByTestId("building-value")).toHaveTextContent("Engineering");
    expect(getByTestId("campus-value")).toHaveTextContent("Unknown");
  });

  it("should close the modal when close button is pressed", async () => {
    const mockOnClose = jest.fn();

    const { getByTestId } = render(
      <NextClassModal
        visible={true}
        onClose={mockOnClose}
        destination={{ coordinates: { latitude: 0, longitude: 0 } }}
        setDestination={() => {}} 
      />
    );

    const closeButton = getByTestId("close-button");

    await act(async () => {
      fireEvent.press(closeButton);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});