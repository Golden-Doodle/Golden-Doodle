import { Building, LocationType } from "./types";

// Get fill color with opacity
export const getFillColorWithOpacity = (
  building: Building,
  destination: LocationType,
) => {

  if (destination === null || destination.building === null) {
    return building.fillColor;
  }
  const fillColor = building.fillColor;
  let rgbaColor = fillColor;
  if (fillColor.startsWith("#")) {
    const hexToRgb = (hex: any) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, 1)`;
    };
    rgbaColor = hexToRgb(fillColor);
  }
  const opacity = building.id === destination.building?.id ? 1 : 0.4;
  return rgbaColor.replace(/[\d\.]+\)$/, `${opacity})`);
};
