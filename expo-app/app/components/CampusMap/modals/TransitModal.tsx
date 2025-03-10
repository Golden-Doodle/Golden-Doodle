import {
  Building,
  concordiaBurgendyColor,
  Coordinates,
  CustomMarkerType,
  LocationType,
  RouteOption,
  TransportMode,
} from "@/app/utils/types";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Card, TextInput as PaperTextInput} from "react-native-paper";
import { fetchAllRoutes } from "@/app/utils/directions";
import useLocationDisplay from "@/app/hooks/useLocationDisplay";
import useSearch from "@/app/hooks/useSearch";

interface TransitModalProps {
  visible: boolean;
  onClose: () => void;
  origin: LocationType;
  destination: LocationType;
  setOrigin: React.Dispatch<React.SetStateAction<LocationType>>;
  setDestination: React.Dispatch<React.SetStateAction<LocationType>>;
  setRouteCoordinates: React.Dispatch<React.SetStateAction<Coordinates[]>>;
  buildingData: Building[];
  markerData: CustomMarkerType[];
  userLocation: Coordinates | null;
}

const TransitModal = ({
  visible,
  onClose,
  origin,
  destination,
  setDestination,
  setOrigin,
  setRouteCoordinates,
  buildingData,
  markerData,
  userLocation,
}: TransitModalProps) => {
  const [routeOptions, setRouteOptions] = React.useState<RouteOption[]>([]);
  const [isSearching, setIsSearching] = React.useState<"origin" | "destination" | null>(null);
  const { filteredData, searchQuery, setSearchQuery } = useSearch({
    data: buildingData,
    searchKey: "name",
  });

  const originInputRef = useRef<TextInput>(null);
  const destinationInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Fetch all available routes
    if (!origin || !destination) return;
    const fetchRoutes = async () => {
      const routes = await fetchAllRoutes(origin, destination);
      setRouteOptions(routes);
    };
    fetchRoutes();
  }, [origin, destination]);

  const getTransportIcon = (mode: TransportMode) => {
    switch (mode) {
      case "transit":
        return <FontAwesome5 name="bus" size={24} color="#007BFF" testID="transport-icon-bus" />;
      case "shuttle":
        return <FontAwesome5 name="shuttle-van" size={24} color="#28A745" testID="transport-icon-shuttle" />;
      case "walking":
        return <FontAwesome5 name="walking" size={24} color="#6C757D" testID="transport-icon-walking" />;
      case "driving":
        return <FontAwesome5 name="car" size={24} color="#DC3545" testID="transport-icon-driving" />;
      case "bicycling":
        return <FontAwesome5 name="bicycle" size={24} color="#FFC107" testID="transport-icon-bicycling" />;
      default:
        return null;
    }
  };

  const onSwitchPress = () => {
    resetIsSearching();
    
    setOrigin(destination); 
    setDestination(origin);  
  };
  

  const handleOnSelectLocation = (location: Building) => () => {
    if (isSearching === "origin") {
      setOrigin({
        coordinates: location.coordinates[0],
        building: location,
        campus: location.campus,
      });
    } else if (isSearching === "destination") {
      setDestination({
        coordinates: location.coordinates[0],
        building: location,
        campus: location.campus,
        selectedBuilding: true,
      });
    }
    resetIsSearching();
  };

  const handleSetLocationToUserLocation = () => () => {
    // Set the location to the user's current location
    if (isSearching === "origin") {
      setOrigin({
        coordinates: userLocation || { latitude: 0, longitude: 0 },
        userLocation: true,
      });
    } else if (isSearching === "destination") {
      setDestination({
        coordinates: userLocation || { latitude: 0, longitude: 0 },
        userLocation: true,
      });
    } else return;
    resetIsSearching();
  };

  const resetIsSearching = () => {
    setIsSearching(null);
    setSearchQuery("");
    originInputRef.current?.blur();
    destinationInputRef.current?.blur();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} testID="transit-modal">
      <View style={styles.container}>
        <View style={styles.header} testID="modal-header">
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={() => {
                onClose();
                resetIsSearching();
              }} testID="close-button">
              <FontAwesome5 name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.mapPinContainer}>
            <FontAwesome5 name="dot-circle" size={26} color="#fff" />
            <FontAwesome5 name="ellipsis-v" size={16} color="#fff" />
            <FontAwesome5 name="map-marker-alt" size={24} color="#fff" />
          </View>

          <View style={styles.locationContainer}>
            <TextInput
              ref={originInputRef}
              style={styles.titleInput}
              onFocus={() => {
                setIsSearching("origin");
                setSearchQuery(useLocationDisplay(origin));
              }}
              onBlur={resetIsSearching}
              value={isSearching === "origin" ? searchQuery : useLocationDisplay(origin)}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => {
                searchQuery.trim() === "" && resetIsSearching();
              }} 
              testID="origin-input"
            />
            <View style={styles.seperationLine}></View>
            <TextInput
              ref={destinationInputRef}
              style={styles.titleInput}
              onFocus={() => {
                setIsSearching("destination");
                setSearchQuery(useLocationDisplay(destination));
              }}
              onBlur={resetIsSearching}
              value={isSearching === "destination" ? searchQuery : useLocationDisplay(destination)}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => {
                searchQuery.trim() === "" && resetIsSearching();
              }} 
              testID="destination-input"
            />
          </View>
          <View style={styles.switchContainer} testID="switch-container">
            <TouchableOpacity onPress={onSwitchPress} testID="switch-button">
              <FontAwesome5 name="exchange-alt" size={22} color="#fff" style={{ marginLeft: 0, transform: [{ rotate: "90deg" }] }} />
            </TouchableOpacity>
          </View>
        </View>

        {isSearching ? (
          <>
            <TouchableOpacity onPress={handleSetLocationToUserLocation()} testID="use-current-location">
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <FontAwesome5 name="location-arrow" size={24} color="#007BFF" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.time}>Use Current Location</Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={handleOnSelectLocation(item)} testID={`search-result-${item.id}`}>
                  <Card style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                      <View style={styles.iconContainer}>
                        <FontAwesome5 name="map-marker-alt" size={24} color="#007BFF" />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.time}>{item.name}</Text>
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </>
        ) : (
          <FlatList
            data={routeOptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { setRouteCoordinates(item.routeCoordinates); onClose(); }} testID={`route-option-${item.id}`}>
                <Card style={styles.card}>
                  <Card.Content style={styles.cardContent}>
                    <View style={styles.iconContainer} testID={`route-icon-${item.id}`}>
                      {getTransportIcon(item.mode)}
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.time} testID={`route-time-${item.id}`}>
                        {item?.arrival_time && item?.departure_time
                          ? `${item.departure_time.text} - ${item.arrival_time.text}`
                          : `${new Date().toLocaleTimeString("us-EN", { hour: "2-digit", minute: "2-digit" })} - ${new Date(Date.now() + item.durationValue * 1000).toLocaleTimeString("us-EN", { hour: "2-digit", minute: "2-digit" })}`}
                      </Text>
                      {item.distance !== "N/A" && (
                        <Text style={styles.details} testID={`route-distance-${item.id}`}>
                          Distance: {item.distance}
                        </Text>
                      )}
                      {item.duration && (
                        <Text style={styles.details} testID={`route-duration-${item.id}`}>
                          {item.duration} - Mode: {item.mode}
                        </Text>
                      )}
                      {item.transport && (
                        <Text style={styles.details} testID={`route-transport-${item.id}`}>
                          Transport: {item.transport}
                        </Text>
                      )}
                      {item.cost && (
                        <Text style={styles.details} testID={`route-cost-${item.id}`}>
                          Cost: {item.cost}
                        </Text>
                      )}
                      {item.frequency && (
                        <Text style={styles.details} testID={`route-frequency-${item.id}`}>
                          Frequency: {item.frequency}
                        </Text>
                      )}
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "25%",
    padding: 16,
    backgroundColor: concordiaBurgendyColor,
  },
  closeButtonContainer: {
    position: "absolute",
    left: 13,
    top: 13,
  },
  mapPinContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50%",
  },
  locationContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    height: "50%",
    width: "80%",
  },
  seperationLine: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: "100%",
    alignSelf: "center",
    height: 0,
    marginVertical: 10,
  },
  switchContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    padding: 0,
  },
  titleInput: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderWidth: 0,
  },
  card: {
    margin: 4,
    padding: 5,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  details: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  stepsContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  stepText: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
});

export default TransitModal;