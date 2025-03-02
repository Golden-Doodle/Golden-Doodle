import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

interface BottomNavigationProps {
    testID: string; 
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ testID }) => {
  const router = useRouter(); 

  const TABS = [
    { label: "Home", icon: "home", path: "/screens/Home/HomePageScreen" },
    { label: "Services", icon: "concierge-bell" },
    { label: "Report", icon: "exclamation-circle", path: "/screens/Report/ReportScreen" },
    { label: "Settings", icon: "cog", path: "/screens/Settings/SettingsScreen"},
  ];

  return (
    <View style={styles.container} testID={testID}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          style={styles.tab}
          onPress={() => router.push(tab.path as any)} 
          testID={`${testID}-${tab.label.toLowerCase()}-tab`} 
        >
          <FontAwesome5 name={tab.icon} size={22} color="#999" />
          <Text style={styles.label}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 25,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  tab: {
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    color: "#999",
    marginTop: 3,
  },
});

export default BottomNavigation;