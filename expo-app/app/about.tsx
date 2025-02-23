import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AboutScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome5 name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>About & Help</Text>
            </View>

            {/* App Version */}
            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>App Version</Text>
                <Text style={styles.infoText}>1.0.0</Text>
            </View>

            {/* Support Information */}
            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Support</Text>
                <Text style={styles.infoText}>For assistance, please contact:</Text>
                <Text style={styles.infoText}>support@example.com</Text>
            </View>

            {/* Report Issue */}
            <TouchableOpacity style={styles.supportButton} onPress={() => console.log("Report Issue")}>
                <FontAwesome5 name="bug" size={18} color="#fff" />
                <Text style={styles.supportButtonText}>Report a Problem</Text>
            </TouchableOpacity>
        </View>
    );
}

/** 📌 Styles */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#990000",
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 15,
    },
    infoCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#990000",
    },
    infoText: {
        fontSize: 14,
        color: "#444",
    },
    supportButton: {
        backgroundColor: "#990000",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    supportButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
});
