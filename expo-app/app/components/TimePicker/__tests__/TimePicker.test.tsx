import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import TimePicker from "../TimePicker";

describe("TimePicker Component", () => {
  test("renders correctly", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} testID="time-picker" />
    );

    expect(getByTestId("time-picker-time-button")).toBeTruthy();
    expect(getByTestId("time-picker-selected-time-text")).toHaveTextContent("12:00 PM");
  });

  test("modal does not open by default", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { queryByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} testID="time-picker" />
    );

    expect(queryByTestId("time-picker-time-picker-modal")).toBeNull();
  });

  test("opens modal when time button is pressed", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} testID="time-picker" />
    );

    const timeButton = getByTestId("time-picker-time-button");
    fireEvent.press(timeButton);

    expect(getByTestId("time-picker-time-picker-modal")).toBeTruthy();
  });

  test("confirms time selection", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} testID="time-picker" />
    );

    fireEvent.press(getByTestId("time-picker-time-button"));
    const doneButton = getByTestId("time-picker-confirm-button");
    fireEvent.press(doneButton);

    expect(mockSetSelectedTime).toHaveBeenCalled();
  });

  test("modal closes when done button is pressed", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByTestId, queryByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} testID="time-picker" />
    );

    fireEvent.press(getByTestId("time-picker-time-button"));
    fireEvent.press(getByTestId("time-picker-confirm-button"));

    expect(queryByTestId("time-picker-time-picker-modal")).toBeNull();
  });

  test("dismisses modal without selecting time", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByTestId, queryByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} testID="time-picker" />
    );

    fireEvent.press(getByTestId("time-picker-time-button"));
    fireEvent.press(getByTestId("time-picker-confirm-button"));

    expect(mockSetSelectedTime).not.toHaveBeenCalledWith(undefined);
    expect(queryByTestId("time-picker-time-picker-modal")).toBeNull();
  });

  test("handles undefined time change", () => {
    const mockSetSelectedTime = jest.fn();
    const selectedTime = new Date("2023-01-01T12:00:00");

    const { getByTestId } = render(
      <TimePicker selectedTime={selectedTime} setSelectedTime={mockSetSelectedTime} testID="time-picker" />
    );

    fireEvent.press(getByTestId("time-picker-time-button"));
    const dateTimePicker = getByTestId("time-picker-date-time-picker");
    fireEvent(dateTimePicker, "onChange", { nativeEvent: {} }, undefined);

    expect(mockSetSelectedTime).not.toHaveBeenCalled();
  });
});
