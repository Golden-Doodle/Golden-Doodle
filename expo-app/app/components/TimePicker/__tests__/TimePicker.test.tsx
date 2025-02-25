import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TimePicker from "../TimePicker";

describe("TimePicker Component", () => {
  test("renders correctly", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByText } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} />
    );

    expect(getByText("12:00 PM")).toBeTruthy();
  });

  test("modal does not open by default", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");
    
    const { queryByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} />
    );

    expect(queryByTestId("time-picker-modal")).toBeNull();
  });

  test("opens modal when time button is pressed", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByText, getByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} />
    );

    const timeButton = getByText("12:00 PM");
    fireEvent.press(timeButton);

    expect(getByTestId("time-picker-modal")).toBeTruthy();
  });

  test("confirms time selection", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByText, getByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} />
    );

    fireEvent.press(getByText("12:00 PM"));
    const doneButton = getByText("Done");
    fireEvent.press(doneButton);

    expect(mockSetSelectedTime).toHaveBeenCalled();
  });

  test("modal closes when done button is pressed", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByText, queryByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} />
    );

    fireEvent.press(getByText("12:00 PM"));
    fireEvent.press(getByText("Done"));

    expect(queryByTestId("time-picker-modal")).toBeNull();
  });

  test("dismisses modal without selecting time", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByText, queryByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} />
    );

    fireEvent.press(getByText("12:00 PM"));
    fireEvent.press(getByText("Done"));
    
    expect(mockSetSelectedTime).not.toHaveBeenCalledWith(undefined);
    expect(queryByTestId("time-picker-modal")).toBeNull();
  });

  test("handles undefined time change", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByText, getByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} />
    );

    fireEvent.press(getByText("12:00 PM"));
    const dateTimePicker = getByTestId("date-time-picker");
    fireEvent(dateTimePicker, "onChange", { nativeEvent: {} }, undefined);

    expect(mockSetSelectedTime).not.toHaveBeenCalled();
  });
});