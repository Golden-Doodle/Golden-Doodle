import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../../components/Header/Header";
import ButtonSection from "../../components/ButtonSection/ButtonSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import QuickShortcuts from "../../components/QuickShortcuts/QuickShortcuts";
import HottestSpots from "../../components/HottestSpots/HottestSpots";
import ShuttleSchedule from "../../components/ShuttleSchedule/ShuttleSchedule";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import { AuthContext } from "@/app/contexts/AuthContext";
import { fetchSameDayCalendarEvents } from "@/app/services/GoogleCalendar/fetchingUserCalendarData"; 
import { GoogleCalendarEvent } from "@/app/utils/types";

export default function HomePageScreen() {
  const auth = React.useContext(AuthContext);
  const user = auth?.user;

  const [isLoading, setIsLoading] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEvent[]>([]);

  const refreshCalendarEvents = useCallback(async () => {
    if (!user) return;
  
    setIsLoading(true);
    try {
      console.log("Refreshing calendar events...");
      const events = await fetchSameDayCalendarEvents();
      setCalendarEvents(events);
    } catch (error) {
      console.error("Failed to refresh calendar:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]); 
  
  useEffect(() => {
    refreshCalendarEvents();
    const interval = setInterval(refreshCalendarEvents, 30000);
    
    return () => clearInterval(interval);
  }, [refreshCalendarEvents]); 
  

  return (
    <View style={styles.container}>
      {/* Pass calendarEvents to Header */}
      <View style={styles.headerContainer}>
        <Header refreshCalendarEvents={refreshCalendarEvents} isLoading={isLoading} calendarEvents={calendarEvents} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <ButtonSection />
        <SearchBar />
        <QuickShortcuts />
        <HottestSpots />
        <ShuttleSchedule />
      </View>

      {/* Bottom Navigation */}
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
  headerContainer: {},
  content: {
    marginTop: 250,
    alignItems: "center",
  },
});
