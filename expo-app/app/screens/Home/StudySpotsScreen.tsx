import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// 1) Import and configure react-i18next with the "StudySpotsScreen" namespace
import { useTranslation } from "react-i18next";

export default function StudySpotsScreen() {
  const router = useRouter();

  // 2) Hook into the "StudySpotsScreen" namespace
  const { t } = useTranslation("StudySpotsScreen");

  return (
    <View style={styles.container}>
      {/* Screen Title */}
      <Text style={styles.title}>{t("study_spots_title")}</Text>

      {/* Information Text */}
      <Text style={styles.infoText}>{t("nearby_study_spots_msg")}</Text>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{t("back_button")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#912338",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  backButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#912338",
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
});
