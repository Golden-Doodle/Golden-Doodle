export type Campus = "SGW" | "LOY";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Building = {
  id: string;
  name: string;
  coordinates: Coordinates[];
  fillColor: string;
  strokeColor: string;
  description?: string;
  campus: Campus;
};

export type CustomMarkerType = {
  id: string;
  title: string;
  description: string;
  coordinate: Coordinates;
  campus?: Campus;
};

export type RoomLocation = {
  room: string;
  building: string;
  campus: Campus;
}

// Define the Google Calendar event type
export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    responseStatus: string;
  }>;
}

// Define SelectedBuilding type
// This is used for the CampusMap and CampusMapNavTab component 
export type SelectedBuildingType = Building | null | "markerOnMap";

export const concordiaBurgendyColor = "#8C2633";

export type LocationType = {
  coordinates?: Coordinates;
  building?: Building;
  room?: string;
  floor?: number;
  campus?: Campus;
} | null;
