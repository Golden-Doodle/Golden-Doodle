import React, { useState, useCallback, useEffect } from "react";
import MapView, { Polygon, Polyline, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Alert,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";
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
import { Building, Coordinates } from "../../utils/types";
import BuildingInfoModal from "./modals/BuildingInfoModal";
import { getFillColorWithOpacity } from "../../utils/helperFunctions";
import { eatingOnCampusData } from "./data/eatingOnCampusData";
import NextClassModal from "./modals/NextClassModal";
import HamburgerWidget from "./HamburgerWidget";

interface CampusMapProps {
  pressedOptimizeRoute: boolean;
}

const CampusMap = ({ pressedOptimizeRoute = false }: CampusMapProps) => {
  const [campus, setCampus] = useState<"SGW" | "LOY">("SGW");
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinates[]>([]);
  const [destination, setDestination] = useState<Coordinates | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [viewCampusMap, setViewCampusMap] = useState<boolean>(true);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isNextClassModalVisible, setIsNextClassModalVisible] =
    useState<boolean>(false);
  const [viewEatingOnCampus, setViewEatingOnCampus] = useState<boolean>(false);

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
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Open the modal if the user pressed the optimize route button
  useEffect(() => {
    if (pressedOptimizeRoute) {
      setIsNextClassModalVisible(true);
    }
  },[]);

  // Reset destination and route
  const resetDirections = () => {
    setRouteCoordinates([]);
    setDestination(null);
    setSelectedBuilding(null);
  };

  // Fetch route from user's location to destination
  const fetchRoute = useCallback(async () => {
    if (!userLocation) {
      Alert.alert("Cannot fetch route without user location");
      return;
    }

    let targetDestination = destination;

    if (!targetDestination && selectedBuilding) {
      targetDestination = selectedBuilding.coordinates[0];
    }

    if (!targetDestination) {
      Alert.alert("Select a destination point");
      return;
    }

    const route = await getDirections(userLocation, targetDestination);

    if (route) {
      setRouteCoordinates(route);
    }
  }, [userLocation, destination, selectedBuilding]);

  const fetchRouteWithDestination = useCallback(
    async (destination: Coordinates) => {
      if (!userLocation) {
        Alert.alert("Cannot fetch route without user location");
        return;
      }

      const route = await getDirections(userLocation, destination);

      if (route) {
        setRouteCoordinates(route);
      }
    },
    [userLocation, destination]
  );

  // Handle marker press to set destination
  const handleMarkerPress = useCallback((coordinate: Coordinates) => {
    setDestination(coordinate);
  }, []);

  // Toggle between SGW and Loyola campuses
  const toggleCampus = useCallback(() => {
    setCampus((prevCampus) => (prevCampus === "SGW" ? "LOY" : "SGW"));
    resetDirections();
  }, []);

  // Handle building press to show building info
  const handleBuildingPressed = (building: Building) => () => {
    if (selectedBuilding?.id === building.id) {
      setSelectedBuilding(null);
      setIsModalVisible(false);
      return;
    }
    setSelectedBuilding(building);
    setIsModalVisible(true);
  };

  // Handle directions press
  const onDirectionsPress = useCallback(() => {
    if (selectedBuilding) {
      fetchRouteWithDestination(selectedBuilding.coordinates[0]);
    }
  }, [selectedBuilding, fetchRouteWithDestination]);

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
                onPress={() => handleMarkerPress(marker.coordinate)}
              />
            ))}

            {/* Render Polygons */}
            {buildings.map((building) => (
              <Polygon
                key={building.id}
                coordinates={building.coordinates}
                fillColor={getFillColorWithOpacity(building, selectedBuilding)}
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
                onPress={() => handleMarkerPress(marker.coordinate)}
              />
            ))}

        {/* Render Polyline for Route */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
        {/* Render Destination Marker */}
        {destination && (
          <Marker coordinate={destination} pinColor="red" title="Destination" />
        )}
      </MapView>

      {/* Modal for Building Info */}
      <BuildingInfoModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={selectedBuilding?.name || "Building Information"}
        description={
          selectedBuilding?.description || "No description available"
        }
        footerContent={
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => {
              if (selectedBuilding) {
                setDestination({
                  latitude: selectedBuilding.coordinates[0].latitude,
                  longitude: selectedBuilding.coordinates[0].longitude,
                });
                setIsModalVisible(false);
              }
            }}
          >
            <Text style={styles.navigateButtonText}>
              Navigate to this Building
            </Text>
          </TouchableOpacity>
        }
      />

      <NextClassModal
        visible={isNextClassModalVisible}
        onClose={() => setIsNextClassModalVisible(false)}
        fetchRouteWithDestination={fetchRouteWithDestination}
        buildingData={buildings}
      />

      <NavTab
        campus={campus}
        selectedBuilding={selectedBuilding}
        onNavigatePress={fetchRoute}
        onTravelPress={() => fetchRouteWithDestination(initialRegion[campus])}
        onEatPress={() => setViewEatingOnCampus((prevValue) => !prevValue)}
        onNextClassPress={() => setIsNextClassModalVisible(true)}
        onMoreOptionsPress={() => Alert.alert("More Options pressed")}
        onInfoPress={() => setIsModalVisible(true)}
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
