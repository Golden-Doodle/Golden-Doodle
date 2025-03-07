import { getFillColorWithOpacity } from '../helperFunctions'; 
import { Building, Coordinates, LocationType } from '../types';

describe('getFillColorWithOpacity', () => {
  it('should return RGBA color with opacity 0.8 for selected building', () => {
    const selectedCoordinates: Coordinates = {
      latitude: 45,
      longitude: -73,
    };

    const selectedBuilding: Building = { 
      id: '1', 
      name: 'Building1', 
      fillColor: '#FF5733', 
      coordinates: [selectedCoordinates],
      strokeColor: '#000000', 
      campus: 'SGW'  
    };

    const destination: LocationType = { 
      building: selectedBuilding, 
      coordinates: selectedCoordinates 
    };

    const building: Building = { 
      id: '1', 
      name: 'Building1', 
      fillColor: '#FF5733',
      coordinates: [{ latitude: 45.0, longitude: -73.0 }],
      strokeColor: '#000000',  
      campus: 'SGW' 
    };

    const result = getFillColorWithOpacity(building, destination);

    expect(result).toBe('rgba(255, 87, 51, 1)');  
  });

  it('should return RGBA color with opacity 0.4 for unselected building', () => {
    const selectedBuilding: Building | undefined = undefined; 
    const building: Building = { 
      id: '1', 
      name: 'Building1', 
      fillColor: '#FF5733', 
      coordinates: [{ latitude: 45.0, longitude: -73.0 }],
      strokeColor: '#000000',  
      campus: 'SGW' 
    };

    const result = getFillColorWithOpacity(building, { building: selectedBuilding, coordinates: { latitude: 0, longitude: 0 } });

    expect(result).toBe('rgba(255, 87, 51, 0.4)');
  });

  it('should handle different hex color and return correct RGBA with opacity 0.4 for unselected building', () => {
    const selectedBuilding: Building | undefined = undefined; 
    const building: Building = { 
      id: '2', 
      name: 'Building2', 
      fillColor: '#0000FF',
      coordinates: [{ latitude: 45.1, longitude: -73.1 }],
      strokeColor: '#000000', 
      campus: 'SGW' 
    };

    const result = getFillColorWithOpacity(building, { building: selectedBuilding, coordinates: { latitude: 0, longitude: 0 } });

    expect(result).toBe('rgba(0, 0, 255, 0.4)'); 
  });

  it('should handle selected building with a different hex color and return opacity 0.8', () => {
    const selectedBuilding: Building = { 
      id: '2', 
      name: 'Building2', 
      fillColor: '#0000FF', 
      coordinates: [{ latitude: 45.1, longitude: -73.1 }],
      strokeColor: '#000000',  
      campus: 'SGW' 
    };
    const building: Building = { 
      id: '2', 
      name: 'Building2', 
      fillColor: '#0000FF', 
      coordinates: [{ latitude: 45.1, longitude: -73.1 }],
      strokeColor: '#000000',  
      campus: 'SGW' 
    };

    const result = getFillColorWithOpacity(building, { building: selectedBuilding, coordinates: { latitude: 0, longitude: 0 } });

    expect(result).toBe('rgba(0, 0, 255, 1)'); 
  });

  it('should return the same color format if the fill color is already in rgba', () => {
    const selectedBuilding: Building = { 
      id: '3', 
      name: 'Building3', 
      fillColor: 'rgba(255, 0, 0, 1)', 
      coordinates: [{ latitude: 45.2, longitude: -73.2 }],
      strokeColor: '#000000', 
      campus: 'SGW'  
    };
    const building: Building = { 
      id: '3', 
      name: 'Building3', 
      fillColor: 'rgba(255, 0, 0, 1)', 
      coordinates: [{ latitude: 45.2, longitude: -73.2 }],
      strokeColor: '#000000',  
      campus: 'SGW'  
    };

    const result = getFillColorWithOpacity(building, { building: selectedBuilding, coordinates: { latitude: 0, longitude: 0 } });

    expect(result).toBe('rgba(255, 0, 0, 1)');  
  });

  it('should return undefined or handle invalid hex values gracefully', () => {
    const selectedBuilding: Building | undefined = undefined; 
    const building: Building = { 
      id: '4', 
      name: 'Building4', 
      fillColor: '#XYZ123', 
      coordinates: [{ latitude: 45.3, longitude: -73.3 }],
      strokeColor: '#000000',  
      campus: 'SGW'
    };

    const result = getFillColorWithOpacity(building, { building: selectedBuilding, coordinates: { latitude: 0, longitude: 0 } });

    expect(result).toBe('rgba(NaN, NaN, 35, 0.4)');  
  });
});
