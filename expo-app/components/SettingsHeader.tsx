import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SettingHeader() {
    return (
        <ImageBackground
            source={require("../assets/images/header-background.jpg")}
            style={styles.background}
        >
            {/* Dark Overlay to Improve Text Readability */}
            <View style={styles.overlay} />

            <View style={styles.container}>
                {/* 📝 Report Title */}
                <Text style={styles.reportTitle}>Settings</Text>

                {/* 🚨 Anonymous Notice */}
                <View style={styles.noticeContainer}>
                    <FontAwesome5 name="exclamation-circle" size={18} color="#990000" />
                    <Text style={styles.noticeText}>Configurations are Permanent.</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: 160, // ⬆️ Increased height for better balance
        justifyContent: "flex-end", // Moves content lower
        alignItems: "center",
        paddingBottom: 20, // ⬆️ Adds padding to push text down
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.4)", // ✅ Semi-transparent dark overlay
    },
    container: {
        alignItems: "center",
    },
    reportTitle: {
        fontSize: 26, // ⬆️ Slightly larger title
        fontWeight: "bold",
        color: "#fff",
    },
    noticeContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 10, // ⬆️ More padding for emphasis
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    noticeText: {
        fontSize: 15,
        color: "#990000",
        marginLeft: 8,
        fontWeight: "600",
    },
});
