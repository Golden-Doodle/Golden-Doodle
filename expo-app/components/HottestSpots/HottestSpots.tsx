import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Flame icon

const HottestSpots = () => {
  return (
    <View style={styles.container}>
      {/* Flame Icon */}
      <FontAwesome5 name="fire" size={24} color="#990000" />

      {/* Title */}
      <Text style={styles.text}>
        Concordia's hottest spots of the week will show up here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginTop: 5,
    textAlign: "center",
  },
});

export default HottestSpots;
