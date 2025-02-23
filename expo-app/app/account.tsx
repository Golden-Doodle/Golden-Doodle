import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AccountScreen() {
    const router = useRouter();

    // State for profile fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Load saved email on screen load
    useEffect(() => {
        const loadAccountData = async () => {
            const savedEmail = await AsyncStorage.getItem("userEmail");
            if (savedEmail) setEmail(savedEmail);
        };
        loadAccountData();
    }, []);

    // Save email
    const saveEmail = async () => {
        if (!email.includes("@")) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }
        await AsyncStorage.setItem("userEmail", email);
        Alert.alert("Success", "Email updated successfully!");
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome5 name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Account Settings</Text>
            </View>

            {/* Email Field */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* Password Field (For Example - Doesn't Actually Save) */}
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Save Changes Button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveEmail}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
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
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#990000",
        marginBottom: 5,
        marginTop: 20,
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 16,
        color: "#333",
    },
    saveButton: {
        backgroundColor: "#990000",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});
