import { concordiaBurgendyColor, LocationType } from "@/app/utils/types";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";

const routes = [
  {
    id: "1",
    time: "13:32 - 14:10",
    duration: "39 min",
    transport: "Bus 105 & 24",
    type: "public", // Added type for public transport
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
    type: "biking", // Added type for biking
  },
];

interface TransitModalProps {
  visible: boolean;
  onClose: () => void;
  origin: LocationType;
  destination: LocationType;
  setOrigin: (location: LocationType) => void;
  setDestination: (location: LocationType) => void;
}

const TransitModal = ({ visible, onClose, origin, destination, setDestination, setOrigin}: TransitModalProps) => {
  const getTransportIcon = (type: string) => {
    switch (type) {
      case "public":
        return <FontAwesome5 name="bus" size={24} color="#007BFF" />;
      case "shuttle":
        return <FontAwesome5 name="shuttle-van" size={24} color="#28A745" />;
      case "walking":
        return <FontAwesome5 name="walking" size={24} color="#6C757D" />;
      case "driving":
        return <FontAwesome5 name="car" size={24} color="#DC3545" />;
      case "biking":
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
  }


  // Need to test
  const destinationToDisplay = (location: LocationType) => {
    if(!location) return "Select a location";

    if(location.userLocation) return "Current Location";

    if(location.room) return `${location.room.room}, ${location.room.building.name}`;

    if(location.building) return location.building.name;

    if(location.campus) return `${location.campus} Campus`;
    
    if(location.coordinates) return `${location.coordinates.latitude}, ${location.coordinates.longitude}`;

    throw new Error("Invalid location type");
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
            <Text style={styles.title}>
              {destinationToDisplay(origin)}
            </Text>
            <View style={styles.seperationLine}></View>
            <Text style={styles.title}>
              {destinationToDisplay(destination)}
            </Text>
          </View>
          <View style={styles.switchContainer}>
            <TouchableOpacity onPress={onSwitchPress}>
              <FontAwesome5
                name="exchange-alt"
                size={16}
                color="#fff"
                style={{ marginLeft: 5, transform: [{ rotate: "90deg" }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  {getTransportIcon(item.type)}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.details}>
                    {item.duration} - {item.transport}
                  </Text>
                  {item.cost && <Text style={styles.details}>{item.cost}</Text>}
                  <Text style={styles.details}>{item.frequency}</Text>
                </View>
              </Card.Content>
            </Card>
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
    height: "30%",
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
    marginLeft: 10,
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
    margin: 8,
    padding: 8,
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
  },
});

export default TransitModal;
