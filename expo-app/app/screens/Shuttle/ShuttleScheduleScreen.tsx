import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ShuttleScheduleScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shuttle Schedule</Text>
      <Text style={styles.infoText}>Upcoming shuttle times will be displayed here.</Text>
      
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#912338",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  backButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#912338",
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
});
