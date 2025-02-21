import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { fetchBusLocations } from "@/app/services/ConcordiaShuttle/ConcordiaApiShuttle";
import { AuthContext } from "@/app/contexts/AuthContext";

export default function ShuttleSchedule() {
  const auth = React.useContext(AuthContext);
  if(!auth) return;

  const user = auth.user;
  const [shuttleData, setShuttleData] = useState(null);



  useEffect(() => {
    // Fetch shuttle schedule data from API
    const data = fetchBusLocations();
    console.log(new Date(), " - fetchBusLocation", data);
  }, []);


  return (
    <View style={styles.container}>
      {/* Bus Icon (Left-Aligned) */}
      <FontAwesome5 name="bus" size={30} color="#912338" style={styles.busIcon} />

      {/* Shuttle Timings & Route */}
      <View style={styles.scheduleWrapper}>
        <View style={styles.scheduleContainer}>
          <TouchableOpacity style={styles.timeButton}>
            <Text style={styles.timeText}>12:08</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeButton}>
            <Text style={styles.timeText}>12:25</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeButton}>
            <Text style={styles.timeText}>12:50</Text>
          </TouchableOpacity>

          {/* Ribbon-Style Route Label */}
          <View style={styles.routeLabel}>
            <Text style={styles.routeText}>SGW to LOY</Text>
            <View style={styles.ribbonTail} />
          </View>
        </View>

        {/* "See all >" Link (Right-Aligned) */}
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all &gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
  },
  busIcon: {
    marginRight: 10,
  },
  scheduleWrapper: {
    flex: 1,
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#912338",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 5,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#912338",
  },
  routeLabel: {
    backgroundColor: "#912338",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    position: "relative",
  },
  routeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  ribbonTail: {
    position: "absolute",
    right: -6,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderLeftColor: "#912338",
    borderTopWidth: 6,
    borderTopColor: "transparent",
    borderBottomWidth: 6,
    borderBottomColor: "transparent",
  },
  seeAll: {
    fontSize: 14,
    color: "#777",
    textDecorationLine: "underline",
    alignSelf: "flex-end",
  },
});
