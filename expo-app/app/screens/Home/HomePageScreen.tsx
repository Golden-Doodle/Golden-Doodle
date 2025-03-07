import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Switch
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header/Header";
import ButtonSection from "../../components/ButtonSection/ButtonSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import QuickShortcuts from "../../components/QuickShortcuts/QuickShortcuts";
import HottestSpots from "../../components/HottestSpots/HottestSpots";
import ShuttleSchedule from "../../components/ShuttleSchedule/ShuttleSchedule";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import { AuthContext } from "@/app/contexts/AuthContext";
import { fetchGoogleCalendarEvents } from "@/app/services/GoogleCalendar/fetchingUserCalendarData";
import { GoogleCalendarEvent } from "@/app/utils/types";

// 1) IMPORT useTranslation AND SPECIFY THE NAMESPACE
import { useTranslation } from "react-i18next";

export default function HomePageScreen() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  
  // 2) HOOK INTO THE "HomePageScreen" NAMESPACE
  const { t } = useTranslation("HomePageScreen");

  const [isLoading, setIsLoading] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>([]);
  const [campus, setCampus] = useState<"LOY" | "SGW">("LOY");

  // Load stored campus selection
  useEffect(() => {
    const loadCampus = async () => {
      const storedCampus = await AsyncStorage.getItem("selectedCampus");
      if (storedCampus === "LOY" || storedCampus === "SGW") {
        setCampus(storedCampus);
      }
    };
    loadCampus();
  }, []);

  const refreshCalendarEvents = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      // Use t("refreshing") for logs or UI text
      console.log(t("refreshing"));

      const selectedCalendarId = await AsyncStorage.getItem("selectedScheduleID");
      if (!selectedCalendarId) {
        console.warn(t("no_calendar_selected"));
        setIsLoading(false);
        return;
      }

      const events = await fetchGoogleCalendarEvents(selectedCalendarId, 7);
      setCalendarEvents(events);
    } catch (error) {
      console.error(t("failed_refresh"), error);
    } finally {
      setIsLoading(false);
    }
  }, [user, t]);

  useEffect(() => {
    refreshCalendarEvents();
    return () => {};
  }, [refreshCalendarEvents]);

  const toggleCampus = async () => {
    const newCampus = campus === "LOY" ? "SGW" : "LOY";
    setCampus(newCampus);
    await AsyncStorage.setItem("selectedCampus", newCampus);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshCalendarEvents}
          />
        }
      >
        <Header
          refreshCalendarEvents={refreshCalendarEvents}
          isLoading={isLoading}
          calendarEvents={calendarEvents}
        />
        <ButtonSection />
        <SearchBar />
        <QuickShortcuts />
        <HottestSpots />

        {/* Shuttle Schedule Toggle */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>{t("campus_sgw")}</Text>
          <Switch
            value={campus === "LOY"}
            onValueChange={toggleCampus}
            trackColor={{ false: "#912338", true: "#D3D3D3" }}
            thumbColor={campus === "LOY" ? "#912338" : "#D3D3D3"}
          />
          <Text style={styles.switchLabel}>{t("campus_loy")}</Text>
        </View>

        {/* Shuttle Schedule Component */}
        <ShuttleSchedule route={campus} />
      </ScrollView>

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
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  switchLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#333",
  },
});
