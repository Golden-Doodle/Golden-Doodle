import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaView } from 'react-native';
import ChatBotScreen from '../ChatBotScreen';

jest.mock('expo-router', () => ({
  useRouter: jest.fn().mockReturnValue({ back: jest.fn() }),
}));

describe('ChatBotScreen', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the initial greeting message', () => {
    const { getByText } = render(
      <SafeAreaView>
        <ChatBotScreen />
      </SafeAreaView>
    );
    expect(getByText(/Hi, I’m Cony!/i)).toBeTruthy(); 
  });

  it('should capture user input and send the message', async () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaView>
        <ChatBotScreen />
      </SafeAreaView>
    );

    const inputField = getByPlaceholderText('Type your message...');
    fireEvent.changeText(inputField, 'Hello, Cony!');
    fireEvent(inputField, 'submitEditing'); 

    await waitFor(() => {
      expect(getByText('Hello, Cony!')).toBeTruthy();
    });
  });

  it('should display the bot response after user sends a message', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [{ message: { content: 'Hello, I am Cony!' } }],
        }),
        { status: 200, statusText: 'OK', headers: { 'Content-Type': 'application/json' } }
      )
    );

    const { getByPlaceholderText, getByText } = render(
      <SafeAreaView>
        <ChatBotScreen />
      </SafeAreaView>
    );

    const inputField = getByPlaceholderText('Type your message...');
    fireEvent.changeText(inputField, 'Hello');
    fireEvent(inputField, 'submitEditing');

    await waitFor(() => {
      expect(getByText('Hello, I am Cony!')).toBeTruthy();
    });
  });

  it('should show typing indicator while waiting for the bot response', async () => {
    const { getByText, getByPlaceholderText } = render(
      <SafeAreaView>
        <ChatBotScreen />
      </SafeAreaView>
    );

    const inputField = getByPlaceholderText('Type your message...');
    fireEvent.changeText(inputField, 'Hello');
    fireEvent(inputField, 'submitEditing');

    await waitFor(() => {
      expect(getByText('Cony is typing...')).toBeTruthy();
    });
  });

  it('should show the network error modal when there is a network issue', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const { getByPlaceholderText, getByText } = render(
      <SafeAreaView>
        <ChatBotScreen />
      </SafeAreaView>
    );

    const inputField = getByPlaceholderText('Type your message...');
    fireEvent.changeText(inputField, 'Hello');
    fireEvent(inputField, 'submitEditing'); 

    await waitFor(() => {
      expect(getByText('No Internet Connection')).toBeTruthy();
    });

    fireEvent.press(getByText('Go Back'));
    jest.restoreAllMocks();
  });

  it('should render the bottom navigation', () => {
    const { getByTestId } = render(
      <SafeAreaView>
        <ChatBotScreen />
      </SafeAreaView>
    );
    expect(getByTestId('bottom-navigation')).toBeTruthy();
  });
});
