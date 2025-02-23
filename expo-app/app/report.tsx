import { View, StyleSheet, ScrollView } from "react-native";
import ReportHeader from "../components/ReportHeader/ReportHeader"; // ✅ Header with Anonymous Notice
import ReportForm from "../components/ReportForm/ReportForm";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";

export default function ReportPage() {
  return (
    <View style={styles.container}>
      <ReportHeader /> {/* ✅ Header at the top */}

      {/* ✅ Scrollable content for the form */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ReportForm />
      </ScrollView>

      {/* ✅ Bottom Navigation stays fixed */}
      <View style={styles.navContainer}>
        <BottomNavigation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  navContainer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
});
