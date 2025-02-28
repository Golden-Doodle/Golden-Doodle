import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavTab from '../CampusMapNavTab'; // Adjust the import based on the file location
import { FontAwesome5 } from '@expo/vector-icons';
import { Building, LocationType, Coordinates, Campus } from '../../../utils/types'; // Import types

// Mock the FontAwesome5 component to avoid issues with icon rendering
jest.mock('@expo/vector-icons', () => ({
  FontAwesome5: jest.fn(() => <></>),
}));

describe('NavTab', () => {
  it('renders the correct navigation items when there is no destination', () => {
    const onSearchPress = jest.fn();
    const onTravelPress = jest.fn();
    const onEatPress = jest.fn();
    const onNextClassPress = jest.fn();
    const onMoreOptionsPress = jest.fn();

    const campus = "SGW"; // Now campus is a string

    const { getByText } = render(
      <NavTab
        campus={campus}
        destination={null}  // No destination
        onSearchPress={onSearchPress}
        onTravelPress={onTravelPress}
        onEatPress={onEatPress}
        onNextClassPress={onNextClassPress}
        onMoreOptionsPress={onMoreOptionsPress}
      />
    );

    // Test if the correct labels are rendered
    expect(getByText('Search')).toBeTruthy();
    expect(getByText('SGW')).toBeTruthy();  // Verify that "SGW" is rendered
    expect(getByText('Eat')).toBeTruthy();
    expect(getByText('Class')).toBeTruthy();
    expect(getByText('More')).toBeTruthy();
  });

  it('renders the correct navigation items when a building is selected as destination', () => {
    const onBackPress = jest.fn();
    const onInfoPress = jest.fn();
    const onDirectionsPress = jest.fn();

    // Adjusted to match the Building type structure
    const destination: LocationType = { 
      building: {
        id: "1",
        name: "Library",
        coordinates: [{ latitude: 123, longitude: 456 }],
        fillColor: "#FF0000",
        strokeColor: "#0000FF",
        campus: "SGW", // Ensure the campus is set correctly
      } as Building, // Cast it to Building type
      coordinates: { latitude: 123, longitude: 456 }, // Coordinates for fallback
    };

    const campus = "SGW"; // Now campus is a string

    const { getByText } = render(
      <NavTab
        campus={campus}
        destination={destination}  // Pass the destination with building as a Building object
        onBackPress={onBackPress}
        onInfoPress={onInfoPress}
        onDirectionsPress={onDirectionsPress}
      />
    );

    // Test if the correct labels are rendered
    expect(getByText('Back')).toBeTruthy();
    expect(getByText('Info')).toBeTruthy();
    expect(getByText('Directions')).toBeTruthy();
  });

  it('renders the correct navigation items when coordinates are selected as destination', () => {
    const onBackPress = jest.fn();
    const onDirectionsPress = jest.fn();

    const destination: LocationType = { 
      coordinates: { latitude: 123, longitude: 456 }  // Only coordinates provided
    };

    const campus = "SGW"; // Now campus is a string

    const { getByText } = render(
      <NavTab
        campus={campus}
        destination={destination}
        onBackPress={onBackPress}
        onDirectionsPress={onDirectionsPress}
      />
    );

    // Test if the correct labels are rendered
    expect(getByText('Back')).toBeTruthy();
    expect(getByText('Directions')).toBeTruthy();
  });

  it('calls the correct action when a navigation item is pressed', () => {
    const onSearchPress = jest.fn();

    const campus = "SGW"; // Now campus is a string

    const { getByText } = render(
      <NavTab
        campus={campus}
        destination={null}  // No destination
        onSearchPress={onSearchPress}
      />
    );

    const searchButton = getByText('Search');
    fireEvent.press(searchButton);

    expect(onSearchPress).toHaveBeenCalledTimes(1);
  });

  it('highlights the active tab when a navigation item is selected', () => {
    const campus = "SGW"; // Now campus is a string

    const { getByText } = render(
      <NavTab
        campus={campus}
        destination={null}  // No destination
      />
    );

    const searchButton = getByText('Search');
    fireEvent.press(searchButton);

    // Check if the active text style is applied
    expect(searchButton.props.style[1]).toEqual(expect.objectContaining({ color: "#fff" }));
  });
});
