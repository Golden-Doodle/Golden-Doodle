import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Import icon library

type CustomMarkerProps = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  isFoodLocation?: boolean; // ✅ Add a prop to differentiate food locations
  onPress?: () => void;
};

const CustomMarker: React.FC<CustomMarkerProps> = ({
  coordinate,
  title = "Unknown Location",
  description = "No description available",
  isFoodLocation = false, // Default is false
  onPress,
}) => (
  <Marker coordinate={coordinate} onPress={onPress} tappable={true}>
    <View style={[styles.marker, isFoodLocation && styles.foodMarker]}>
      {isFoodLocation ? (
        <MaterialIcons name="restaurant" size={20} color="white" /> // ✅ Restaurant icon for food places
      ) : (
        <Text style={styles.markerText}>{title[0] || "?"}</Text> // Default marker
      )}
    </View>
    {/* <Callout>
      <View style={styles.callout}>
        <Text style={styles.calloutTitle}>
          {title} {isFoodLocation ? "🍽" : ""}
        </Text>
        <Text>{description}</Text> */}
        {/* Navigate Button */}
        {/* <TouchableOpacity
          style={styles.navigateButton}
          onPress={() => {
            if (onPress) {
              onPress();
            } else {
              Alert.alert("Navigation", "Navigate to this location");
            }
          }}
        >
          <Text style={styles.navigateButtonText}>Navigate Here</Text>
        </TouchableOpacity>
      </View>
    </Callout> */}
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
    backgroundColor: "red", // ✅ Change marker color for food locations
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
  },
  callout: {
    width: 200, // Increase the width
    padding: 10, // Add padding to ensure content doesn't touch the edges
    
  },
  calloutTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  navigateButton: {
    marginTop: 10,
    backgroundColor: "#912338",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  navigateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomMarker;
