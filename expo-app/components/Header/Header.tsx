import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons"; // For the hamburger menu icon
import styles from "./Header.styles";

export default function Header() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/header-background.jpg")} // Background image
      style={styles.background}
    >
      {/* Dark Overlay to Improve Text Readability */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Hamburger Menu */}
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/menu")}>
          <Feather name="menu" size={28} color="white" />
        </TouchableOpacity>

        {/* Welcome Message */}
        <Text style={styles.welcomeText}>Welcome Back, Steven</Text>
        <Text style={styles.timerText}>You have 13 minutes until your next class</Text>

        {/* Optimize Route Button */}
        <TouchableOpacity style={styles.routeButton}>
          <Text style={styles.routeButtonText}>Optimize Route</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
