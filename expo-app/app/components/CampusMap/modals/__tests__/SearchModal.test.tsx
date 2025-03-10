import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SearchModal from '../SearchModal'; // Assuming SearchModal is in the same folder
import { Building } from '@/app/utils/types';

const mockOnClose = jest.fn();
const mockOnSelectLocation = jest.fn();
const mockOnPressSelectOnMap = jest.fn();
const mockOnGetDirections = jest.fn();

const buildingData: Building[] = [
  {
    id: '1',
    name: 'Building 1',
    description: 'Description of Building 1',
    coordinates: [{ latitude: 45.495, longitude: -73.578 }],
    fillColor: "#FF0000",
    strokeColor: "#000000",
    campus: "SGW",
  },
  {
    id: '2',
    name: 'Building 2',
    description: 'Description of Building 2',
    coordinates: [{ latitude: 45.495, longitude: -73.578 }],
    fillColor: "#00FF00",
    strokeColor: "#000000",
    campus: "LOY",
  },
];

describe('SearchModal', () => {
  it('renders correctly when visible', async () => {
    const { getByTestId } = render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildingData={buildingData}
        markerData={[]}
        onSelectLocation={mockOnSelectLocation}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={null}
        onGetDirections={mockOnGetDirections}
      />
    );

    // Ensure state updates are wrapped inside act
    await act(async () => {
      // Check if modal is visible
      expect(getByTestId('search-modal')).toBeTruthy();
      expect(getByTestId('modal-title')).toHaveTextContent('Select Destination');
      expect(getByTestId('search-input')).toBeTruthy();
    });
  });

  it('closes modal when close icon is pressed', async () => {
    const { getByTestId } = render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildingData={buildingData}
        markerData={[]}
        onSelectLocation={mockOnSelectLocation}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={null}
        onGetDirections={mockOnGetDirections}
      />
    );

    await act(async () => {
      fireEvent.press(getByTestId('close-icon'));
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('selects building when a result item is pressed', async () => {
    const { getByTestId } = render(
      <SearchModal
        visible={true}
        onClose={mockOnClose}
        buildingData={buildingData}
        markerData={[]}
        onSelectLocation={mockOnSelectLocation}
        onPressSelectOnMap={mockOnPressSelectOnMap}
        destination={null}
        onGetDirections={mockOnGetDirections}
      />
    );

    await act(async () => {
      fireEvent.changeText(getByTestId('search-input'), 'Building 1');
    });

    await waitFor(() => {
      expect(getByTestId('result-item-1')).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByTestId('result-item-1'));
    });

    expect(mockOnSelectLocation).toHaveBeenCalledWith(buildingData[0]);
  });
});
