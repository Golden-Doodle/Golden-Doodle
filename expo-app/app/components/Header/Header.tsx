import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import styles from "./Header.styles";
import { AuthContext } from "@/app/contexts/AuthContext";
import NextClassComponent from "./NextClassComponent";
import { GoogleCalendarEvent } from "@/app/utils/types"; // Import event type

interface HeaderProps {
  refreshCalendarEvents: () => void;
  isLoading: boolean;
  calendarEvents: GoogleCalendarEvent[];
}

export default function Header({ refreshCalendarEvents, isLoading, calendarEvents }: HeaderProps) {
  const router = useRouter();
  const auth = React.useContext(AuthContext);
  const user = auth?.user || null;
  const signOut = auth?.signOut;

  return (
    <ImageBackground
      source={require("../../../assets/images/header-background.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay} />

      {/* Header Row for Icons */}
      <View style={styles.headerTopRow}>
        <TouchableOpacity style={styles.logoutButton} onPress={!user ? () => router.push("/") : signOut}>
          <Feather name={!user ? "log-in" : "log-out"} size={22} color="white" />
        </TouchableOpacity>

        {/* Refresh Button */}
        <TouchableOpacity style={styles.refreshButton} onPress={refreshCalendarEvents}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Feather name="refresh-ccw" size={22} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/screens/Home/HomeMenuScreen")}>
          <Feather name="menu" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Header Content */}
      <View style={styles.headerContent}>
        <Text style={styles.welcomeText}>
          {user?.displayName ? `Welcome Back, ${user.displayName}` : "Welcome!"}
        </Text>
        <NextClassComponent calendarEvents={calendarEvents} style={styles.timerText} />

        <TouchableOpacity style={styles.routeButton}>
          <Text style={styles.routeButtonText}>Optimize Route</Text>
        </TouchableOpacity>

        <Text style={styles.studySpotText}>Find your next study spot or coffee stop.</Text>
      </View>
    </ImageBackground>
  );
}
