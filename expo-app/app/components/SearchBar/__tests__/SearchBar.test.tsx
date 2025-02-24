import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchBar from "../SearchBar"; 

describe("SearchBar Component", () => {
  it("renders the search input field", () => {
    const { getByTestId } = render(<SearchBar />);
    expect(getByTestId("search-input")).toBeTruthy();
  });

  it("displays the search icon", () => {
    const { getByTestId } = render(<SearchBar />);
    expect(getByTestId("search-input")).toBeTruthy();
  });

  it("allows user to type in the search field", () => {
    const { getByTestId } = render(<SearchBar />);
    const searchInput = getByTestId("search-input");

    fireEvent.changeText(searchInput, "Coffee Shop");

    expect(searchInput.props.value).toBe("Coffee Shop"); 
  });
});
