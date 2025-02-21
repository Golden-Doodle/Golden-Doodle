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
  Coordinates,
  CustomMarkerType,
  SelectedBuildingType,
} from "../../utils/types";
import BuildingInfoModal from "./modals/BuildingInfoModal";
import { getFillColorWithOpacity } from "../../utils/helperFunctions";
import { eatingOnCampusData } from "./data/eatingOnCampusData";
import NextClassModal from "./modals/NextClassModal";
import HamburgerWidget from "./HamburgerWidget";
import NavigateModal from "./modals/NavigateModal";
import { styles } from "./CampusMap.styles";

const CampusMap = () => {
  const [campus, setCampus] = useState<"SGW" | "Loyola">("SGW");
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinates[]>([]);
  const [destination, setDestination] = useState<Coordinates | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [viewCampusMap, setViewCampusMap] = useState<boolean>(true);
  const [selectedBuilding, setSelectedBuilding] =
    useState<SelectedBuildingType>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isNextClassModalVisible, setIsNextClassModalVisible] =
    useState<boolean>(false);
  const [viewEatingOnCampus, setViewEatingOnCampus] = useState<boolean>(false);
  const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false);
  const [isSelectingDestination, setIsSelectingDestination] =
    useState<boolean>(false); // Used for allowing user to select any destination on map

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

  // Reset destination and route
  const resetDirections = () => {
    setRouteCoordinates([]);
    setDestination(null);
    setSelectedBuilding(null);
  };

  // Fetch route from user's location to destination
  const fetchRoute = useCallback(async () => {
    // Check if user location is available
    if (!userLocation) {
      Alert.alert("Cannot fetch route without user location");
      return;
    }

    let targetDestination = destination;

    // If no destination is set, use selected building
    if (!targetDestination && selectedBuilding) {
      if (selectedBuilding === "markerOnMap") {
        targetDestination = userLocation;
      } else {
        targetDestination = selectedBuilding.coordinates[0];
      }
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
  const handleMarkerPress = useCallback((marker: CustomMarkerType) => {
    const makerToBuilding: Building = {
      id: marker.id,
      name: marker.title,
      description: marker.description,
      coordinates: [marker.coordinate],
      strokeColor: "blue",
      fillColor: "rgba(0, 0, 255, 0.5)",
      campus: "SGW",
    };

    setSelectedBuilding(makerToBuilding);
    setIsModalVisible(true);
  }, []);

  // Toggle between SGW and Loyola campuses
  const toggleCampus = useCallback(() => {
    setCampus((prevCampus) => (prevCampus === "SGW" ? "Loyola" : "SGW"));
    resetDirections();
  }, []);

  // Handle building press to show building info
  const handleBuildingPressed = (building: Building) => () => {
    if (selectedBuilding === "markerOnMap" || selectedBuilding === null) {
      return;
    }

    if (selectedBuilding.id === building.id) {
      setSelectedBuilding(null);
      setIsModalVisible(false);
      return;
    }
    
    // console.log("Building pressed:", building);
    setDestination(null);
    setSelectedBuilding(building);
    setIsModalVisible(true);
  };

  // Handle directions press
  const onDirectionsPress = useCallback(() => {
    if (selectedBuilding === "markerOnMap") {
      fetchRoute();
    } else if (selectedBuilding) {
      fetchRouteWithDestination(selectedBuilding.coordinates[0]);
    }
  }, [selectedBuilding, fetchRouteWithDestination]);

  // Handle closing search modal
  const onCloseNavigateModal = useCallback(() => {
    setSearchBarVisible(false);
  }, []);

  // Handle map press
  const handleMapPress = (event: any) => {
    if (isSelectingDestination) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setDestination({ latitude, longitude });
      setIsSelectingDestination(false); // Exit selection mode
      setSelectedBuilding("markerOnMap");
    }
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
        {destination && (
          <Marker coordinate={destination} pinColor="red" title="Destination" />
        )}
      </MapView>

      {/* Modal for Building Info */}
      <BuildingInfoModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        selectedBuilding={selectedBuilding}
        onNavigate={(latitude, longitude) => {
          setDestination({ latitude, longitude });
        }}
      />

      {/* Search Modal -- Shows up when Navigate is pressed */}
      <NavigateModal
        visible={searchBarVisible}
        onClose={onCloseNavigateModal}
        onSelectBuilding={(building) => {
          setSelectedBuilding(building);
          setSearchBarVisible(false);
        }}
        buildings={buildings}
        markers={markers}
        onPressSelectOnMap={() => {
          setIsSelectingDestination(true);
          onCloseNavigateModal();
        }}
        destination={destination}
        onGetDirections={() => {
          fetchRoute();
          onCloseNavigateModal();
        }}
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
        // onNavigatePress={fetchRoute}
        onNavigatePress={() => setSearchBarVisible(true)}
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

export default CampusMap;
