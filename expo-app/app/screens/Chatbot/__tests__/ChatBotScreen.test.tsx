// screens/Chatbot/__tests__/ChatBotScreen.test.tsx

import React from "react";
import { renderComponent } from "@/app/__tests__/test-utils";
import { fireEvent, screen } from "@testing-library/react-native";
import ChatBotScreen from "../ChatBotScreen";

describe("ChatBotScreen", () => {
  it("renders the greeting message on initial load", () => {
    renderComponent(<ChatBotScreen />);
    // The default greeting is “Hi, I’m Cony! How can I help you today?” in English
    expect(
      screen.getByText(/How can I help you today\?/i)
    ).toBeTruthy();
  });

  it("sends user message and displays it on screen", () => {
    renderComponent(<ChatBotScreen />);
    
    const inputField = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByText("Send");

    // Type a message
    fireEvent.changeText(inputField, "Hello from the test!");
    // Press 'Send'
    fireEvent.press(sendButton);

    // User message should appear in the chat
    expect(screen.getByText("Hello from the test!")).toBeTruthy();
  });

  // If you want to test the loading indicator ("Cony is typing...") or network error, 
  // you can mock the API call or handle the error scenario similarly.
});
