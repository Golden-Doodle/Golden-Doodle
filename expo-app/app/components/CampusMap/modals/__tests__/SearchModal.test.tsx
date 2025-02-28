import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import SearchModal from '../SearchModal';
import { Building, CustomMarkerType, LocationType, Coordinates, Campus } from '@/app/utils/types';
import { act } from 'react-test-renderer'; // Make sure to import act

describe('SearchModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSelectBuilding = jest.fn();
  const mockOnPressSelectOnMap = jest.fn();
  const mockOnGetDirections = jest.fn();
  
  const sampleBuildings: Building[] = [
    {
      id: '1',
      name: 'Building A',
      coordinates: [{ latitude: 45.4215, longitude: -75.6992 }],
      fillColor: '#ff0000',
      strokeColor: '#000000',
      campus: 'SGW',
    },
    {
      id: '2',
      name: 'Building B',
      coordinates: [{ latitude: 45.4215, longitude: -75.7000 }],
      fillColor: '#00ff00',
      strokeColor: '#000000',
      campus: 'SGW',
    },
    {
      id: '3',
      name: 'Building C',
      coordinates: [{ latitude: 45.4215, longitude: -75.7005 }],
      fillColor: '#0000ff',
      strokeColor: '#000000',
      campus: 'SGW',
    },
  ];

  const markers: CustomMarkerType[] = [];
  const destination: LocationType | null = null; // Default to null for testing 'Select on Map'

  it('renders modal when visible prop is true', () => {
    render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildings={sampleBuildings}
        onSelectBuilding={mockOnSelectBuilding}
        markers={markers}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={destination}
        onGetDirections={mockOnGetDirections}
      />
    );
    
    expect(screen.getByText('Select Destination')).toBeTruthy();
  });

  it('hides modal when visible prop is false', () => {
    render(
      <SearchModal
        visible={false}
        onClose={mockOnClose}
        buildings={sampleBuildings}
        onSelectBuilding={mockOnSelectBuilding}
        markers={markers}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={destination}
        onGetDirections={mockOnGetDirections}
      />
    );
    
    expect(screen.queryByText('Select Destination')).toBeNull();
  });

  it('shows "Select on Map" button when destination is null or undefined', async () => {
    render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildings={sampleBuildings}
        onSelectBuilding={mockOnSelectBuilding}
        markers={markers}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={null} // Explicitly testing null case
        onGetDirections={mockOnGetDirections}
      />
    );

    expect(screen.getByText('Select on Map')).toBeTruthy();

    await act(async () => {
        fireEvent.press(screen.getByText('Select on Map'));
      });

    expect(mockOnPressSelectOnMap).toHaveBeenCalled();
  });

  it('shows "Get Directions" button when destination has coordinates', async () => {
    const userLocation: LocationType = {
      coordinates: { latitude: 45.4215, longitude: -75.6992 },
    };

    render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildings={sampleBuildings}
        onSelectBuilding={mockOnSelectBuilding}
        markers={markers}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={userLocation} // Testing with coordinates
        onGetDirections={mockOnGetDirections}
      />
    );

    expect(screen.getByText('Get Directions')).toBeTruthy();

    await act(async () => {
        fireEvent.press(screen.getByText('Get Directions'));
    })

    expect(mockOnGetDirections).toHaveBeenCalled();
  });

  it('filters buildings based on search query', async () => {
    render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildings={sampleBuildings}
        onSelectBuilding={mockOnSelectBuilding}
        markers={markers}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={destination}
        onGetDirections={mockOnGetDirections}
      />
    );

    await act(async () => {
        fireEvent.changeText(screen.getByPlaceholderText('Search for destination...'), 'Building A');
      });
    
    await waitFor(() => {
      expect(screen.getByText('Building A')).toBeTruthy();
      expect(screen.queryByText('Building B')).toBeNull();
    });
  });

  it('triggers onPressSelectOnMap when "Select on Map" is clicked', async () => {
    render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildings={sampleBuildings}
        onSelectBuilding={mockOnSelectBuilding}
        markers={markers}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={destination}
        onGetDirections={mockOnGetDirections}
      />
    );

    await act (async () => {
        fireEvent.press(screen.getByText('Select on Map'));
    })

    expect(mockOnPressSelectOnMap).toHaveBeenCalled();
  });

  it('triggers onGetDirections when "Get Directions" is clicked', async () => {
    const userLocation: LocationType = {
      coordinates: { latitude: 45.4215, longitude: -75.6992 },
    };

    render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildings={sampleBuildings}
        onSelectBuilding={mockOnSelectBuilding}
        markers={markers}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={userLocation} 
        onGetDirections={mockOnGetDirections}
      />
    );

    await act(async () => {
        fireEvent.press(screen.getByText('Get Directions'));
    })
    expect(mockOnGetDirections).toHaveBeenCalled();
  });

  it('closes modal when close icon is pressed', async () => {
    render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildings={sampleBuildings}
        onSelectBuilding={mockOnSelectBuilding}
        markers={markers}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={destination}
        onGetDirections={mockOnGetDirections}
      />
    );

    await act (async () => {
        fireEvent.press(screen.getByTestId('close-icon'));
    })
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('shows "No results found" when search query matches no buildings', async () => {
    render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildings={sampleBuildings}
        onSelectBuilding={mockOnSelectBuilding}
        markers={markers}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={destination}
        onGetDirections={mockOnGetDirections}
      />
    );

    await act (async () =>{
        fireEvent.changeText(screen.getByPlaceholderText('Search for destination...'), 'Building X');
    })

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeTruthy();
    });
  });
});
