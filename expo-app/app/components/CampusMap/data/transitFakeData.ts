import { TransportMode } from "@/app/utils/types";

type routesType = {
  id: string;
  time: string;
  duration: string;
  type: TransportMode;
  transport: string;
  cost?: string;
  frequency?: string;
};

export const routes: routesType[] = [
  {
    id: "1",
    time: "13:32 - 14:10",
    duration: "39 min",
    transport: "Bus 105 & 24",
    type: "transit", // Added type for public transport
    cost: "CA$3.25",
    frequency: "Every 8 min",
  },
  {
    id: "2",
    time: "13:32 - 14:12",
    duration: "41 min",
    transport: "Shuttle",
    type: "shuttle", // Added type for school shuttle
    frequency: "Every 15 min",
  },
  {
    id: "3",
    time: "13:35 - 14:12",
    duration: "37 min",
    transport: "Bus 162 & Walk",
    type: "walking", // Added type for walking
  },
  {
    id: "4",
    time: "13:40 - 14:20",
    duration: "40 min",
    transport: "Drive",
    type: "driving", // Added type for driving
  },
  {
    id: "5",
    time: "13:45 - 14:15",
    duration: "30 min",
    transport: "Bike",
    type: "bicycling", // Added type for biking
  },
];
