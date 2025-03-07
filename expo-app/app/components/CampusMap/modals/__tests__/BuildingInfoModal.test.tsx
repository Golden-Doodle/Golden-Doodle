import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BuildingInfoModal from '../BuildingInfoModal';  // Adjust the import based on the file location
import { Building } from '@/app/utils/types'; // Assuming correct import path

describe('BuildingInfoModal', () => {
  const mockOnNavigate = jest.fn();
  const mockOnClose = jest.fn();

  const selectedBuilding: Building = {
    id: "1",
    name: "Library",
    coordinates: [{ latitude: 123.45, longitude: 678.90 }],
    fillColor: "#FF0000",
    strokeColor: "#0000FF",
    campus: "SGW",
    description: "This is the library building.",
  };

  it('renders correctly when selectedBuilding is provided', () => {
    const { getByText, getByTestId } = render(
      <BuildingInfoModal
        visible={true}
        onClose={mockOnClose}
        selectedBuilding={selectedBuilding}
        onNavigate={mockOnNavigate}
      />
    );

    // Check that modal header and body render correctly
    expect(getByText('Library')).toBeTruthy();  // Building name
    expect(getByText('This is the library building.')).toBeTruthy();  // Building description
  });

  it('does not render when selectedBuilding is null or undefined', () => {
    const { queryByText } = render(
      <BuildingInfoModal
        visible={true}
        onClose={mockOnClose}
        selectedBuilding={null}
        onNavigate={mockOnNavigate}
      />
    );

    // Ensure modal content is not rendered when selectedBuilding is null
    expect(queryByText('Library')).toBeNull();
  });

  it('calls the onNavigate function with the correct coordinates when the "Navigate to this Building" button is pressed', () => {
    const { getByText } = render(
      <BuildingInfoModal
        visible={true}
        onClose={mockOnClose}
        selectedBuilding={selectedBuilding}
        onNavigate={mockOnNavigate}
      />
    );

    const navigateButton = getByText('Navigate to this Building');
    fireEvent.press(navigateButton);

    // Check that onNavigate is called with correct coordinates
    expect(mockOnNavigate).toHaveBeenCalledWith(123.45, 678.90);
  });

  it('closes the modal when the close button is pressed', () => {
    const { getByTestId } = render(
      <BuildingInfoModal
        visible={true}
        onClose={mockOnClose}
        selectedBuilding={selectedBuilding}
        onNavigate={mockOnNavigate}
      />
    );

    const closeButton = getByTestId('close-button');  // assuming you add a testID to the close button
    fireEvent.press(closeButton);

    // Ensure the onClose handler was called when the close button is pressed
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes the modal when the overlay is pressed', () => {
    const { getByTestId } = render(
      <BuildingInfoModal
        visible={true}
        onClose={mockOnClose}
        selectedBuilding={selectedBuilding}
        onNavigate={mockOnNavigate}
      />
    );

    const overlay = getByTestId('modal-overlay');  // assuming you add a testID to the overlay
    fireEvent.press(overlay);

    // Ensure the onClose handler was called when the overlay is pressed
    expect(mockOnClose).toHaveBeenCalled();
  });
});
