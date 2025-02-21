import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CampusMapping from "../../components/CampusMap/CampusMap";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function CampusMapScreen() {
  const router = useRouter();
  // Get the next class from the URL params
  const { pressedOptimizeRoute } = useLocalSearchParams();

  console.log("sds", pressedOptimizeRoute)

  return (
    <View style={styles.container}>
      {/* Title & Back Button Overlay */}
      <SafeAreaView style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome5 name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Placeholder View for Symmetry */}
        <View style={{ width: 40 }} />
      </SafeAreaView>

      {/* Map should take full remaining space */}
      <View style={styles.mapContainer}>
        <CampusMapping pressedOptimizeRoute={!!pressedOptimizeRoute} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#912338",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#731b2b",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  mapContainer: {
    flex: 1,
  },
});
