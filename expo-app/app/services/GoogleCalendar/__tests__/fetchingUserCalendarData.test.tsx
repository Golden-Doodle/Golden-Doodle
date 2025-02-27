import { fetchAllCalendars, fetchGoogleCalendarEvents, fetchCalendarEvents } from "../fetchingUserCalendarData";  // Adjust path accordingly
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

global.fetch = jest.fn() as jest.Mock;

describe("Google Calendar Utils", () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("should fetch all calendars successfully", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("mockAccessToken");

    const mockCalendars = {
      items: [
        { id: "1", summary: "Test Calendar 1" },
        { id: "2", summary: "Schedule Calendar" },
      ],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCalendars,
    });

    const calendars = await fetchAllCalendars();

    expect(calendars).toEqual(mockCalendars.items);
    expect(fetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer mockAccessToken",
        }),
      })
    );
  });

  it("should fetch events based on calendar ID and days ahead", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("mockAccessToken");

    const mockEvents = {
      items: [
        { id: "event1", summary: "Event 1", start: { dateTime: "2022-03-01T10:00:00Z" } },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents,
    });

    const calendarId = "mockCalendarId";
    const events = await fetchGoogleCalendarEvents(calendarId, 7);

    expect(events).toEqual(mockEvents.items);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://www.googleapis.com/calendar/v3/calendars/mockCalendarId/events"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer mockAccessToken",
        }),
      })
    );
  });


  it("should handle error when fetchCalendarEvents fails due to missing calendar ID", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(""); 
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(""); 

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [] 
      }),
    });

    try {
      await fetchCalendarEvents();
    } catch (error: unknown) {
      const typedError = error as Error;

      expect(typedError.message).toBe("No schedule calendar found.");
    }
  });
});
