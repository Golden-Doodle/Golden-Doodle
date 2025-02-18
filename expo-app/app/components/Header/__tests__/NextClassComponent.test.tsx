import React from "react";
import { render } from "@testing-library/react-native";
import NextClassComponent from "@/app/components/Header/NextClassComponent"
import { GoogleCalendarEvent } from "@/app/utils/types";

jest.useFakeTimers().setSystemTime(new Date("2025-02-17T10:00:00Z"));

describe("NextClassComponent", () => {
  it("renders message when there are no classes", () => {
    const { getByText } = render(<NextClassComponent calendarEvents={[]} />);
    expect(getByText("No classes scheduled for today.")).toBeTruthy();
  });

  it("renders the next upcoming class", () => {
    const mockEvents: GoogleCalendarEvent[] = [
      {
        id: "1",
        summary: "SOEN - 390",
        start: { dateTime: "2025-02-17T11:00:00Z", timeZone: "UTC" },
        end: { dateTime: "2025-02-17T12:00:00Z", timeZone: "UTC" },
      },
      {
        id: "2",
        summary: "COMP - 232",
        start: { dateTime: "2025-02-17T13:00:00Z", timeZone: "UTC" },
        end: { dateTime: "2025-02-17T14:00:00Z", timeZone: "UTC" },
      },
    ];

    const { getByText } = render(<NextClassComponent calendarEvents={mockEvents} />);
    expect(getByText(/Next class in 60 minutes at/)).toBeTruthy();
    expect(getByText(/SOEN - 390/)).toBeTruthy();
  });

  it("renders ongoing class message", () => {
    const mockEvents: GoogleCalendarEvent[] = [
      {
        id: "3",
        summary: "COMP - 346",
        start: { dateTime: "2025-02-17T09:30:00Z", timeZone: "UTC" },
        end: { dateTime: "2025-02-17T11:30:00Z", timeZone: "UTC" },
      },
    ];

    const { getByText } = render(<NextClassComponent calendarEvents={mockEvents} />);
    expect(getByText(/Class is ongoing/)).toBeTruthy();
    expect(getByText(/COMP - 346/)).toBeTruthy();
  });

  it("renders past class message if no upcoming classes", () => {
    const mockEvents: GoogleCalendarEvent[] = [
      {
        id: "4",
        summary: "COMP - 344",
        start: { dateTime: "2025-02-17T07:00:00Z", timeZone: "UTC" },
        end: { dateTime: "2025-02-17T08:00:00Z", timeZone: "UTC" },
      },
    ];

    const { getByText } = render(<NextClassComponent calendarEvents={mockEvents} />);
    expect(getByText("No classes scheduled for today.")).toBeTruthy();
  });
});