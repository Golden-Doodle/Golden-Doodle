import { LocationType } from "@/app/utils/types";

const useLocationDisplay = (location: LocationType): string => {
  const destinationToDisplay = (location: LocationType) => {
    if (!location) return "Select a location";

    if (location.userLocation) return "Current Location";

    if (location.room)
      return `${location.room.room}, ${location.room.building.name}`;

    if (location.building) return location.building.name;

    if (location.campus) return `${location.campus} Campus`;

    if (location.coordinates)
      return `${location.coordinates.latitude}, ${location.coordinates.longitude}`;

    throw new Error("Invalid location type");
  };

  return destinationToDisplay(location);
};

export default useLocationDisplay;
