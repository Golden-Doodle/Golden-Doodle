import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { styles } from "./Header.styles";
import { AuthContext } from "@/app/contexts/AuthContext";
import NextClassComponent from "./NextClassComponent";
import { GoogleCalendarEvent } from "@/app/utils/types";
import { ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  refreshCalendarEvents: () => void;
  isLoading: boolean;
  calendarEvents: GoogleCalendarEvent[];
}

export default function Header({
  refreshCalendarEvents,
  isLoading,
  calendarEvents,
}: HeaderProps) {

  const { t } = useTranslation('HomePageScreen'); // Used for tranlation

  const router = useRouter();
  const auth = React.useContext(AuthContext);
  const user = auth?.user || null;
  const signOut = auth?.signOut;

  const [nextClass, setNextClass] = useState<GoogleCalendarEvent | null>(null);

  const onOptimizeRoutePress = () => {
    router.push({
      pathname: "/screens/Home/CampusMapScreen",
      params: {
        pressedOptimizeRoute: "true",
      },
    });
  };

  return (
    <ImageBackground
      source={require("@/assets/images/header-background.jpg")}
      style={styles.headerContainer}
    >
      <View style={styles.headerContainer}>
        {/* Overlay */}
        <View style={styles.overlay} />

        {/* Header Top Row for Icons */}
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={!user ? () => router.push("/") : signOut}
          >
            <Feather
              name={!user ? "log-in" : "log-out"}
              size={22}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => router.push("/screens/Home/HomeMenuScreen")}
          >
            <Feather name="menu" size={26} color="white" />
          </TouchableOpacity>
        </View>

        {/* Header Content */}
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>
            {user?.displayName
              ? `${t("welcome_back")}, ${user.displayName}`
              : `${t("welcome")}!`}
          </Text>
          <NextClassComponent
            calendarEvents={calendarEvents}
            style={styles.timerText}
            nextClass={nextClass}
            setNextClass={setNextClass}
          />

          {/* Optimize Routes Button - Disabled if no classes */}
          {user && (
            <TouchableOpacity
              style={[
                styles.routeButton,
                !nextClass && styles.disabledRouteButton, // Apply disabled style
              ]}
              onPress={onOptimizeRoutePress}
              disabled={!nextClass} // Disable if no class today
            >
              <Text style={styles.routeButtonText}>{t("optimize_route")}</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.studySpotText}>
            {t("find_your_next_study_spot_or_coffee_stop")}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
