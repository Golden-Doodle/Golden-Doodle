import React, { useState, useCallback, useEffect } from "react";
import MapView, { Polygon, Polyline, Marker } from "react-native-maps";
import { View, Alert, Text, TouchableOpacity } from "react-native";
import CustomMarker from "./CustomMarker";
import { SGWBuildings, LoyolaBuildings } from "./data/buildingData";
import { getDirections } from "../../utils/directions";
import {
  initialRegion,
  SGWMarkers,
  LoyolaMarkers,
} from "./data/customMarkerData";
import NavTab from "./CampusMapNavTab";
import * as Location from "expo-location";
import {
  Building,
  Campus,
  Coordinates,
  CustomMarkerType,
  LocationType,
} from "../../utils/types";
import BuildingInfoModal from "./modals/BuildingInfoModal";
import { getFillColorWithOpacity } from "../../utils/helperFunctions";
import { eatingOnCampusData } from "./data/eatingOnCampusData";
import NextClassModal from "./modals/NextClassModal";
import HamburgerWidget from "./HamburgerWidget";
import { StyleSheet } from "react-native";
import TransitModal from "./modals/TransitModal";
import SearchModal from "./modals/SearchModal";

interface CampusMapProps {
  pressedOptimizeRoute: boolean;
}

const CampusMap = ({ pressedOptimizeRoute = false }: CampusMapProps) => {
  const [campus, setCampus] = useState<Campus>("SGW");
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinates[]>([]);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [destination, setDestination] = useState<LocationType>(null);
  const [origin, setOrigin] = useState<LocationType>(null);
  const [viewCampusMap, setViewCampusMap] = useState<boolean>(true);
  const [isBuildingInfoModalVisible, setIsBuildingInfoModalVisible] = useState<boolean>(false);
  const [isNextClassModalVisible, setIsNextClassModalVisible] = useState<boolean>(false);
  const [viewEatingOnCampus, setViewEatingOnCampus] = useState<boolean>(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState<boolean>(false);
  const [isTransitModalVisible, setIsTransitModalVisible] = useState<boolean>(false);

  const markers = campus === "SGW" ? SGWMarkers : LoyolaMarkers;
  const buildings = campus === "SGW" ? SGWBuildings : LoyolaBuildings;

  // Get user’s current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to navigate.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      setOrigin({
        userLocation: true,
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    })();
  }, []);

  // Open the modal if the user pressed the optimize route button
  // Need to see if i can just set default value to pressOptimizeRoute
  useEffect(() => {
    if (pressedOptimizeRoute) {
      setIsNextClassModalVisible(true);
    }
  }, []);

  // Reset destination and route
  const resetDirections = () => {
    setRouteCoordinates([]);
    setDestination(null);
  };

  // MAY DEPRICATE THIS FUNCTION
  // Fetch route from user's location to destination
  const fetchRoute = useCallback(async () => {
    if (!origin) {
      Alert.alert("Cannot fetch route without a starting location");
      return;
    }

    if (!destination) {
      Alert.alert("Select a destination point");
      return;
    }

    const route = await getDirections(
      origin.coordinates,
      destination.coordinates
    );

    if (route) {
      setRouteCoordinates(route);
    }
  }, [origin, destination]);

  // HandleSetDestination
  // TODO: Implement this to handle new structure
  // Potentially use a factory builder to create the destination
  const HandleSetDestination = () => {};

  // Handle marker press to set destination
  const handleMarkerPress = useCallback((marker: CustomMarkerType) => {
    const markerToBuilding: Building = {
      id: marker.id,
      name: marker.title,
      description: marker.description,
      coordinates: [marker.coordinate],
      strokeColor: "blue",
      fillColor: "rgba(0, 0, 255, 0.5)",
      campus: "SGW",
    };

    setDestination({
      building: markerToBuilding,
      coordinates: marker.coordinate,
      selectedBuilding: true,
    });
    setIsBuildingInfoModalVisible(true);
  }, []);

  // Toggle between SGW and Loyola campuses
  const toggleCampus = useCallback(() => {
    setCampus((prevCampus) => (prevCampus === "SGW" ? "LOY" : "SGW"));
    resetDirections();
  }, []);

  // Handle building press to show building info
  const handleBuildingPressed = (building: Building) => () => {
    if (destination !== null && destination.building?.id === building.id) {
      setDestination(null);
      setIsBuildingInfoModalVisible(false);
      return;
    }

    setDestination({building, coordinates: building.coordinates[0], selectedBuilding: true});
    setIsBuildingInfoModalVisible(true);
  };

  // Handle directions press
  // TODO:
  // Add logic to open transit modal
  const onDirectionsPress = useCallback(() => {
    // Set Origin to user location
    setIsTransitModalVisible(true);
  }, []);

  // Handle closing search modal
  const onCloseSearchModal = useCallback(() => {
    setIsSearchModalVisible(false);
  }, []);

  // Handle map press
  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const coordinates: Coordinates = { latitude, longitude };

    setDestination({ coordinates } as LocationType);
  };

  const onTravelPress = () => {
    const coordinates: Coordinates = initialRegion[campus];
    setDestination({ coordinates, campus } as LocationType);
    setIsTransitModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Movable Hamburger Widget */}
      <HamburgerWidget
        toggleCampus={toggleCampus}
        viewCampusMap={viewCampusMap}
        setViewCampusMap={setViewCampusMap}
        campus={campus}
      />

      <MapView
        key={viewCampusMap ? "map-visible" : "map-hidden"} // Re-render map when viewCampusMap changes
        style={styles.map}
        region={initialRegion[campus]}
        showsUserLocation={true}
        loadingEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        onLongPress={(event: any) => handleMapPress(event)}
      >
        {viewCampusMap && (
          <>
            {/* Render Markers */}
            {markers.map((marker) => (
              <CustomMarker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                onPress={() => handleMarkerPress(marker)}
              />
            ))}

            {/* Render Polygons */}
            {buildings.map((building) => (
              <Polygon
                key={building.id}
                coordinates={building.coordinates}
                fillColor={getFillColorWithOpacity(building, destination)}
                strokeColor={building.strokeColor}
                strokeWidth={2}
                tappable={true}
                onPress={handleBuildingPressed(building)}
              />
            ))}
          </>
        )}

        {/* Render Eating on Campus Markers */}
        {viewEatingOnCampus &&
          eatingOnCampusData
            .filter((marker) => marker.campus === campus)
            .map((marker) => (
              <CustomMarker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                isFoodLocation={true} // ✅ Mark as a food location
                onPress={() => handleMarkerPress(marker)}
              />
            ))}

        {/* Render Polyline for Route */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="rgba(145, 35, 56, 1)"
          />
        )}
        {/* Render Destination Marker */}
        {destination && !(destination.selectedBuilding) && (
          <Marker
            coordinate={destination.coordinates}
            pinColor="red"
            title="Destination"
          />
        )}
      </MapView>

      {/* Modal for Building Info */}
      <BuildingInfoModal
        visible={isBuildingInfoModalVisible}
        onClose={() => setIsBuildingInfoModalVisible(false)}
        selectedBuilding={destination?.building}
        onNavigate={onDirectionsPress}
      />

      {/* Search Modal -- Shows up when Search is pressed */}
      <SearchModal
        visible={isSearchModalVisible}
        onClose={onCloseSearchModal}
        onSelectBuilding={(building) => {
          setDestination({
            coordinates: building.coordinates[0],
            building,
            campus: building.campus,
          }); // Set destination
          setIsSearchModalVisible(false);
        }}
        buildings={buildings}
        markers={markers}
        onPressSelectOnMap={onCloseSearchModal}
        destination={destination}
        onGetDirections={() => {
          fetchRoute();
          onCloseSearchModal();
        }}
      />

      {/* Transit Modal -- Screen to select starting and final destination with mode of transportation */}
      <TransitModal
        onClose={() => {
          setIsTransitModalVisible(false);
        }}
        visible={isTransitModalVisible}
        origin={origin}
        destination={destination}
        setOrigin={setOrigin}
        setDestination={setDestination}
      />

      <NextClassModal
        visible={isNextClassModalVisible}
        onClose={() => setIsNextClassModalVisible(false)}
        destination={destination}
        setDestination={setDestination}
      />

      <NavTab
        campus={campus}
        destination={destination}
        // onNavigatePress={fetchRoute}
        onSearchPress={() => setIsSearchModalVisible(true)}
        onTravelPress={onTravelPress}
        onEatPress={() => setViewEatingOnCampus((prevValue) => !prevValue)}
        onNextClassPress={() => setIsNextClassModalVisible(true)}
        onMoreOptionsPress={() => Alert.alert("More Options pressed")}
        onInfoPress={() => setIsBuildingInfoModalVisible(true)}
        onBackPress={() => resetDirections()}
        onDirectionsPress={onDirectionsPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  map: { flex: 1 },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: "#555",
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navigateButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  navigateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CampusMap;
