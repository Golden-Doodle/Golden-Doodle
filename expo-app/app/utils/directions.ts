import Constants from "expo-constants";
import { decode } from "@mapbox/polyline";
import { Coordinates, RoomLocation, Building, Campus } from "@/app/utils/types";

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;

export const getDirections = async (
  origin: Coordinates,
  destination: Coordinates
): Promise<Coordinates[]> => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const points = data.routes[0].overview_polyline.points;
      const decodedPoints = decode(points).map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));
      return decodedPoints;
    } else {
      console.error("No routes found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching directions:", error);
    return [];
  }
};

export const coordinatesFromRoomLocation = (
  location: RoomLocation | null,
  SGWBuildings: Building[],
  LoyolaBuildings: Building[]
): Coordinates | undefined => {
  if (!location) {
    return;
  }

  if (!location.campus) return;

  const validateCampus = () => {
    if (location.campus !== "SGW" && location.campus !== "LOY") {
      
      const newCampus = ( location.campus as string).toUpperCase();

      if(newCampus=== "SGW" || newCampus === "LOY") {

        location.campus = newCampus as Campus;
      }

    }
  }

  validateCampus(); 

  const coordinates: Coordinates | undefined =
    location.campus === "SGW"
      ? SGWBuildings.find((building : Building) => building.name === location.building.name)
          ?.coordinates[0]
      : LoyolaBuildings.find((building) => building.name === location.building.name)
          ?.coordinates[0];

  if (!coordinates) {
    console.error("Building coordinates not found");
    return;
  }

  return coordinates;
};
