import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header/Header";
import ButtonSection from "../components/ButtonSection/ButtonSection";
import SearchBar from "../components/SearchBar/SearchBar"; // 🔍 Import SearchBar
import QuickShortcuts from "../components/QuickShortcuts/QuickShortcuts";
import HottestSpots from "../components/HottestSpots/HottestSpots";
import ShuttleSchedule from "../components/ShuttleSchedule/ShuttleSchedule"; // 🚌 Import Shuttle Schedule
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";

export default function Index() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.infoText}>
          Find your next study spot or coffee stop.
        </Text>
        <ButtonSection />
        <SearchBar /> {/* 🔍 Add Search Bar Below Buttons */}
        <QuickShortcuts />
        <HottestSpots />
        <ShuttleSchedule /> {/* 🚌 Add Shuttle Schedule Here */}
      </View>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
  },
  content: {
    marginTop: 220,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
});
