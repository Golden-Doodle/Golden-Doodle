import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter, usePathname } from "expo-router"; // ✅ Import `usePathname`
import { FontAwesome5 } from "@expo/vector-icons"; // ✅ Using FontAwesome icons

export default function BottomNavigation() {
  const router = useRouter();
  const currentPath = usePathname(); // ✅ Get the current active path
  const [activeTab, setActiveTab] = useState(currentPath);

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          style={styles.tab}
          onPress={() => {
            // ✅ Prevent navigating to the same page
            if (currentPath !== tab.route) {
              setActiveTab(tab.route);
              router.push(tab.route as "/" | "/report" | "/services" | "/settings");
            }
          }}
        >
          <FontAwesome5 name={tab.icon} size={22} color={currentPath === tab.route ? "#990000" : "#999"} />
          <Text style={[styles.label, currentPath === tab.route && styles.activeLabel]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ✅ Define navigation routes for each tab
const TABS = [
  { label: "Home", icon: "home", route: "/" }, // ✅ Home page
  { label: "Services", icon: "concierge-bell", route: "/services" }, // Placeholder for Services
  { label: "Report", icon: "exclamation-circle", route: "/report" }, // ✅ Report page
  { label: "Settings", icon: "cog", route: "/settings" }, // Placeholder for Settings
];

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  tab: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },
  activeLabel: {
    color: "#990000",
    fontWeight: "bold",
  },
});
