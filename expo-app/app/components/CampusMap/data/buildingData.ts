import { Building } from '../../../utils/types';

export const SGWBuildings : Building[] = [
  {
    id: 'FB',
    name: 'Faubourg Building',
    coordinates: [
      { latitude: 45.49496 , longitude: -73.57784 },
      { latitude: 45.49468, longitude: -73.5772 },
      { latitude: 45.49441, longitude: -73.57754 },
      { latitude: 45.49469, longitude: -73.57806 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)", // Semi-Transparent blue
    strokeColor: "rgba(0, 0, 255, 1)", // Solid blue outline
    campus: "SGW"
  },
  {
    id: 'FG',
    name: 'Faubourg Ste-Catherine Building',
    coordinates: [
      { latitude: 45.49471, longitude: -73.57806 },
      { latitude: 45.49441, longitude: -73.57754  },
      { latitude: 45.4936, longitude: -73.57871 },
      { latitude: 45.49383, longitude: -73.57911 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  },
  {
    id: 'MB',
    name: 'John Molson Building',
    coordinates: [
      { latitude: 45.49559, longitude: -73.57921 },
      { latitude: 45.49523, longitude: -73.5785 },
      { latitude: 45.49496, longitude: -73.57878 },
      { latitude: 45.49535, longitude: -73.57941 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  },
  {
    id: 'GM',
    name: 'Guy-De Maisonneuve Building',
    coordinates: [
      { latitude: 45.49616, longitude: -73.57888 },
      { latitude: 45.49597, longitude: -73.57842 },
      { latitude: 45.49559, longitude: -73.57888 },
      { latitude: 45.49577, longitude: -73.57914 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  },
  {
    id: 'EV',
    name: 'Engineering, Computer Science and Visual Arts integrated Complex',
    coordinates: [
      { latitude: 45.49597, longitude: -73.57842 },
      { latitude: 45.49577, longitude: -73.57801 },
      { latitude: 45.49607, longitude: -73.57767 },
      { latitude: 45.49586, longitude: -73.57722 },
      { latitude: 45.49518, longitude: -73.57788 },
      { latitude: 45.49559, longitude: -73.57880 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  },
  {
    id: 'LS',
    name: 'Learning Square Building',
    coordinates: [
      { latitude: 45.49632, longitude: -73.57978 },
      { latitude: 45.49615, longitude: -73.57941 },
      { latitude: 45.49639, longitude: -73.57922 },
      { latitude: 45.49656, longitude: -73.57959 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  },
  {
    id: 'ER',
    name: 'ER Building',
    coordinates: [
      { latitude: 45.49656, longitude: -73.57964 },
      { latitude: 45.49611, longitude: -73.57997 },
      { latitude: 45.49626, longitude: -73.58047 },
      { latitude: 45.4967, longitude: -73.58012  }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  },
  {
    id: 'H',
    name: 'Hall Building',
    coordinates: [
      { latitude: 45.49777, longitude: -73.57901 },
      { latitude: 45.49741, longitude: -73.57830 },
      { latitude: 45.49682, longitude: -73.57886 },
      { latitude: 45.49720, longitude: -73.57959 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  },
  {
    id: 'LB',
    name: 'J.W. McConnell Building',
    coordinates: [
      { latitude: 45.49730, longitude: -73.57806 },
      { latitude: 45.49695, longitude: -73.57723 },
      { latitude: 45.49659, longitude: -73.57755 },
      { latitude: 45.49651, longitude: -73.57743 },
      { latitude: 45.49624, longitude: -73.57770 },
      { latitude: 45.49669, longitude: -73.57863 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  },
  {
    id: 'VA',
    name: 'Visual Arts Building',
    coordinates: [
      { latitude: 45.49564, longitude: -73.57438 },
      { latitude: 45.49622, longitude: -73.57377 },
      { latitude: 45.49594, longitude: -73.57317 },
      { latitude: 45.49532, longitude: -73.57371 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  },
  {
    id: 'GN',
    name: 'Grey Nuns Building',
    coordinates: [
      { latitude: 45.4945, longitude: -73.57695 },
      { latitude: 45.49387, longitude: -73.57527 },
      { latitude: 45.49243, longitude: -73.57664 },
      { latitude: 45.49333, longitude: -73.57835 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)",
    campus: "SGW"
  }
];

export const LoyolaBuildings: Building[] = [
  {
    id: "CW",
    name: "Central Wing,",
    coordinates: [
      { latitude: 45.45843, longitude: -73.64142 },
      { latitude: 45.45934, longitude: -73.64074 },
      { latitude: 45.45838, longitude: -73.6383 },
      { latitude: 45.45755, longitude: -73.63923 },
    ],
    fillColor: "rgba(255, 165, 0, 0.5)", // Semi-Transparent orange
    strokeColor: "rgba(255, 140, 0, 1)", // Solid orange outline
    campus: "LOY",
  },
  {
    id: "LW",
    name: "Left Wing,",
    coordinates: [
      { latitude: 45.45843, longitude: -73.64142 },
      { latitude: 45.45755, longitude: -73.63923 },
      { latitude: 45.45661, longitude: -73.64028 },
      { latitude: 45.45735, longitude: -73.64224 },
    ],
    fillColor: "rgba(255, 165, 0, 0.5)", // Semi-Transparent orange
    strokeColor: "rgba(255, 140, 0, 1)", // Solid orange outline
    campus: "LOY",
  },
  {
    id: "RW",
    name: "Right Wing,",
    coordinates: [
      { latitude: 45.45934, longitude: -73.64074 },
      { latitude: 45.45838, longitude: -73.6383 },
      { latitude: 45.45922, longitude: -73.63732 },
      { latitude: 45.46035, longitude: -73.64026 },
    ],
    fillColor: "rgba(255, 165, 0, 0.5)", // Semi-Transparent orange
    strokeColor: "rgba(255, 140, 0, 1)", // Solid orange outline
    campus: "LOY",
  },
  {
    id: "NW",
    name: "North Wing,",
    coordinates: [
      { latitude: 45.45959, longitude: -73.64064 },
      { latitude: 45.45799, longitude: -73.64187 },
      { latitude: 45.45823, longitude: -73.64253 },
      { latitude: 45.45799, longitude: -73.64271 },
      { latitude: 45.45828, longitude: -73.6436 },
      { latitude: 45.46006, longitude: -73.64207 },
    ],
    fillColor: "rgba(255, 165, 0, 0.5)", // Semi-Transparent orange
    strokeColor: "rgba(255, 140, 0, 1)", // Solid orange outline
    campus: "LOY",
  },
  {
    id: "SW",
    name: "South Wing,",
    coordinates: [
      { latitude: 45.45718, longitude: -73.63945 },
      { latitude: 45.45668, longitude: -73.63819 },
      { latitude: 45.45602, longitude: -73.63872 },
      { latitude: 45.45582, longitude: -73.63807 },
      { latitude: 45.45777, longitude: -73.63431 },
      { latitude: 45.45912, longitude: -73.63723 },
    ],
    fillColor: "rgba(255, 165, 0, 0.5)", // Semi-Transparent orange
    strokeColor: "rgba(255, 140, 0, 1)", // Solid orange outline
    campus: "LOY",
  },
];