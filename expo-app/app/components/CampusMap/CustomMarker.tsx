import React from "react";
import { Marker } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type CustomMarkerProps = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  isFoodLocation?: boolean;
  onPress?: () => void;
};

const CustomMarker: React.FC<CustomMarkerProps> = ({
  coordinate,
  title = "Unknown Location",
  description = "No description available",
  isFoodLocation = false,
  onPress,
}) => (
  <Marker coordinate={coordinate} onPress={onPress} tappable={true}>
    <View
      style={[styles.marker, isFoodLocation && styles.foodMarker]}
      testID="marker-view"
    >
      {isFoodLocation ? (
        <MaterialIcons name="restaurant" size={20} color="white" />
      ) : (
        <Text style={styles.markerText}>{title[0] || "?"}</Text>
      )}
    </View>
  </Marker>
);

const styles = StyleSheet.create({
  marker: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  foodMarker: {
    backgroundColor: "red",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomMarker;
