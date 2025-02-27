import {
  concordiaBurgendyColor,
  Coordinates,
  LocationType,
  RouteOption,
  TransportMode,
} from "@/app/utils/types";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { fetchAllRoutes } from "@/app/utils/directions";
import useLocationDisplay from "@/app/hooks/useLocationDisplay";

interface TransitModalProps {
  visible: boolean;
  onClose: () => void;
  origin: LocationType;
  destination: LocationType;
  setOrigin: (location: LocationType) => void;
  setDestination: (location: LocationType) => void;
  setRouteCoordinates: React.Dispatch<React.SetStateAction<Coordinates[]>>;
}

const TransitModal = ({
  visible,
  onClose,
  origin,
  destination,
  setDestination,
  setOrigin,
  setRouteCoordinates,
}: TransitModalProps) => {
  const [routeOptions, setRouteOptions] = React.useState<RouteOption[]>([]);

  useEffect(() => {
    // Fetch all available routes
    if (!origin || !destination) return;
    const fetchRoutes = async () => {
      const routes = await fetchAllRoutes(origin, destination);
      setRouteOptions(routes);
    }
    fetchRoutes();
  }, [origin, destination]);

  const getTransportIcon = (mode: TransportMode) => {
    switch (mode) {
      case "transit":
        return <FontAwesome5 name="bus" size={24} color="#007BFF" />;
      case "shuttle":
        return <FontAwesome5 name="shuttle-van" size={24} color="#28A745" />;
      case "walking":
        return <FontAwesome5 name="walking" size={24} color="#6C757D" />;
      case "driving":
        return <FontAwesome5 name="car" size={24} color="#DC3545" />;
      case "bicycling":
        return <FontAwesome5 name="bicycle" size={24} color="#FFC107" />;
      default:
        return null;
    }
  };

  const onSwitchPress = () => {
    // Switch the location
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome5 name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.mapPinContainer}>
            <FontAwesome5 name="map-marker-alt" size={24} color="#fff" />
            <FontAwesome5 name="map-marker-alt" size={24} color="#fff" />
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.title}>{useLocationDisplay(origin)}</Text>
            <View style={styles.seperationLine}></View>
            <Text style={styles.title}>
              {useLocationDisplay(destination)}
            </Text>
          </View>
          <View style={styles.switchContainer}>
            <TouchableOpacity onPress={onSwitchPress}>
              <FontAwesome5
                name="exchange-alt"
                size={22}
                color="#fff"
                style={{ marginLeft: 5, transform: [{ rotate: "90deg" }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={routeOptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setRouteCoordinates(item.routeCoordinates);
                onClose();
              }}
            >
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    {getTransportIcon(item.mode)}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.time}>
                      {item?.arrival_time && item?.departure_time
                        ? `${item.departure_time.text} - ${item.arrival_time.text}`
                        : `${new Date().toLocaleTimeString("us-EN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} - ${new Date(
                            Date.now() + item.durationValue * 1000
                          ).toLocaleTimeString("us-EN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`}{" "}
                    </Text>
                    {item.distance !== "N/A" && (
                      <Text style={styles.details}>
                        Distance: {item.distance}
                      </Text>
                    )}
                    {item.duration && (
                      <Text style={styles.details}>
                        {item.duration} - Mode: {item.mode}
                      </Text>
                    )}
                    {item.transport && (
                      <Text style={styles.details}>
                        Transport: {item.transport}
                      </Text>
                    )}

                    {/* {item.steps && (
                      <View style={styles.stepsContainer}>
                        {item.steps.map((step, index) => (
                          <Text key={index} style={styles.stepText}>
                            {step}
                          </Text>
                        ))}
                      </View>
                    )} */}

                    {item.cost && (
                      <Text style={styles.details}>Cost: {item.cost}</Text>
                    )}
                    {item.frequency && (
                      <Text style={styles.details}>
                        Frequency: {item.frequency}
                      </Text>
                    )}
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
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
    width: "95%",
    alignSelf: "center",
    height: 0,
  },
  switchContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
  title: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#ddd",
    fontSize: 14,
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
