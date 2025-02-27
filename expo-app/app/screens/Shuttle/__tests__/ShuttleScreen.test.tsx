import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ShuttleScreen from "../ShuttleScreen"; 

describe("ShuttleScreen", () => {
    it("renders correctly", () => {
        const { getByTestId } = render(<ShuttleScreen />);

        expect(getByTestId("SGW-text")).toBeTruthy();
        expect(getByTestId("LOY-text")).toBeTruthy();
    });

    it("should toggle the route when switch is pressed", () => {
        const { getByTestId } = render(<ShuttleScreen />);

        expect(getByTestId("SGW-text")).toHaveStyle({ color: "#912338" });
        expect(getByTestId("LOY-text")).toHaveStyle({ color: "#999" });

        const switchButton = getByTestId("route-switch");
        fireEvent(switchButton, 'valueChange', true);

        expect(getByTestId("SGW-text")).toHaveStyle({ color: "#999" });
        expect(getByTestId("LOY-text")).toHaveStyle({ color: "#912338" });
    });

    it("should display correct shuttle schedule based on selected route", () => {
        const { getByTestId, queryByText } = render(<ShuttleScreen />);

        expect(queryByText("9:15 AM")).toBeTruthy();  

        const switchButton = getByTestId("route-switch");
        fireEvent(switchButton, 'valueChange', true);

        expect(queryByText("9:15 AM")).toBeTruthy();  
    });
});
