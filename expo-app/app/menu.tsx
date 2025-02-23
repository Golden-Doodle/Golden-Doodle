import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Menu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      {/* Navigation Options */}
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/campus-map")}>
        <Text style={styles.menuText}>Campus Map</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/shuttle-schedule")}>
        <Text style={styles.menuText}>Shuttle Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/study-spots")}>
        <Text style={styles.menuText}>Study Spots</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#990000", // Matches app theme
    paddingVertical: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  menuItem: {
    width: "80%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#990000",
  },
  backButton: {
    marginTop: 40,
    padding: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: "white",
    textDecorationLine: "underline",
  },
});
