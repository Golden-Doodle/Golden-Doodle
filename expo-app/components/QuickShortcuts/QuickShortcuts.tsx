import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const QuickShortcuts = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.shortcut}>
        <FontAwesome5 name="utensils" size={24} color="#990000" />
        <Text style={styles.text}>Food</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shortcut}>
        <FontAwesome5 name="toilet" size={24} color="#990000" />
        <Text style={styles.text}>Bathroom</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shortcut}>
        <FontAwesome5 name="cocktail" size={24} color="#990000" />
        <Text style={styles.text}>Bar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 30, // Centers it properly
    marginTop: 15, // Space from search bar
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  shortcut: {
    alignItems: "center",
    flex: 1, // Even spacing for all buttons
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#990000",
    marginTop: 5,
  },
});

export default QuickShortcuts;
