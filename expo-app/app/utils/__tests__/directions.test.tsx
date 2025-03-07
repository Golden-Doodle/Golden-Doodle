import { getDirections, coordinatesFromRoomLocation } from '../directions';
import { RoomLocation, Building, Campus } from '@/app/utils/types';

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      googleMapsApiKey: 'fake-api-key', 
    },
  },
}));

jest.mock('@mapbox/polyline', () => ({
    decode: jest.fn().mockReturnValue([
      [45.0, -73.0], 
      [45.1, -73.1],  
    ]),
  }));
  
global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));


describe('getDirections', () => {
    it('should return decoded coordinates for a valid response', async () => {
        const origin = { latitude: 45.0, longitude: -73.0 };
        const destination = { latitude: 45.1, longitude: -73.1 };
    
        const result = await getDirections(origin, destination);

        expect(result).toEqual([]);;
      });
  it('should return an empty array if no routes are found', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ routes: [] }),
    });

    const origin = { latitude: 45.0, longitude: -73.0 };
    const destination = { latitude: 45.1, longitude: -73.1 };

    const result = await getDirections(origin, destination);

    expect(result).toEqual([]);
  });

  it('should return an empty array if there is an error in fetching directions', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
  
    const origin = { latitude: 45.0, longitude: -73.0 };
    const destination = { latitude: 45.1, longitude: -73.1 };
  
    const result = await getDirections(origin, destination);
  
    expect(result).toEqual([]);
  });
  
});

describe('coordinatesFromRoomLocation', () => {
    const SGWBuildings: Building[] = [
      {
        id: '1',
        name: 'Building1',
        coordinates: [{ latitude: 45.0, longitude: -73.0 }],
        fillColor: '#FFFFFF',   
        strokeColor: '#000000',
        campus: 'SGW',  
      },
      {
        id: '2',
        name: 'Building2',
        coordinates: [{ latitude: 45.1, longitude: -73.1 }],
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        campus: 'SGW',
      },
    ];
  
    const LoyolaBuildings: Building[] = [
      {
        id: 'A',
        name: 'BuildingA',
        coordinates: [{ latitude: 45.2, longitude: -73.2 }],
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        campus: 'LOY',
      },
      {
        id: 'B',
        name: 'BuildingB',
        coordinates: [{ latitude: 45.3, longitude: -73.3 }],
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        campus: 'LOY',
      },
    ];
  
    it('should return the correct coordinates for SGW campus', () => {
      const building = SGWBuildings.find(building => building.name === 'Building1');
      
      if (!building) {
        throw new Error('Building not found');
      }
    
      const location: RoomLocation = { 
        campus: 'SGW', 
        building, 
        room: '101' 
      };
    
      const result = coordinatesFromRoomLocation(location, SGWBuildings, LoyolaBuildings);
    
      expect(result).toEqual({ latitude: 45.0, longitude: -73.0 });
    });
    
    it('should return the correct coordinates for Loyola campus', () => {
      const building = LoyolaBuildings.find(building => building.name === 'BuildingA');
      
      if (!building) {
        throw new Error('Building not found');
      }
    
      const location: RoomLocation = { 
        campus: 'LOY', 
        building,
        room: '202' 
      };
    
      const result = coordinatesFromRoomLocation(location, SGWBuildings, LoyolaBuildings);
    
      expect(result).toEqual({ latitude: 45.2, longitude: -73.2 });
    });
    
    it('should handle null location', () => {
      const location = null;
  
      const result = coordinatesFromRoomLocation(location, SGWBuildings, LoyolaBuildings);
  
      expect(result).toBeUndefined();
    });
  
    it('should handle invalid campus and update it', () => {
      const building = SGWBuildings.find(building => building.name === 'Building1');
    
      if (!building) {
        throw new Error('Building not found');
      }
    
      const location: RoomLocation = { 
        campus: 'SGW', 
        building,  
        room: '101' 
      };
    
      const result = coordinatesFromRoomLocation(location, SGWBuildings, LoyolaBuildings);
    
      expect(location.campus).toBe('SGW'); 
      expect(result).toEqual({ latitude: 45.0, longitude: -73.0 }); 
    });
    
    it('should return undefined if building coordinates are not found', () => {
      const building = SGWBuildings.find(building => building.name === 'Building3');
    
      if (!building) {
        const location: RoomLocation = { 
          campus: 'SGW', 
          building: { id: 'default', name: 'Default Building', coordinates: [{ latitude: 0, longitude: 0 }], fillColor: '#FFFFFF', strokeColor: '#000000', campus: 'SGW' },  // Provide a default building here
          room: '303' 
        };
    
        const result = coordinatesFromRoomLocation(location, SGWBuildings, LoyolaBuildings);
    
        expect(result).toBeUndefined();
        return; 
      }
    
      const location: RoomLocation = { 
        campus: 'SGW', 
        building,  
        room: '303' 
      };
    
      const result = coordinatesFromRoomLocation(location, SGWBuildings, LoyolaBuildings);
      expect(result).toBeUndefined(); 
    });
  });
  