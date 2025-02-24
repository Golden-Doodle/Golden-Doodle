import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AccountScreen() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const loadAccountData = async () => {
            const savedUser = await AsyncStorage.getItem("user");
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                if (parsedUser.email) setEmail(parsedUser.email);
                if (parsedUser.photoURL) setProfilePicture(parsedUser.photoURL);
                console.log()
            }
        };
        loadAccountData();
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome5 name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Account Settings</Text>
            </View>

            <View style={styles.formContainer}>
                {/* Profile Picture */}
                <View style={styles.profileContainer}>
                    {profilePicture ? (
                        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
                    ) : (
                        <FontAwesome5 name="user-circle" size={80} color="#888" />
                    )}
                </View>

                {/* Email Field */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: "#EAEAEA", color: "#333", fontWeight: "bold" }]} 
                    value={email} 
                    placeholderTextColor="#777"
                    keyboardType="email-address"
                    editable={false} 
                    autoCapitalize="none"
                />

                {/* Divider */}
                <View style={styles.divider} />

                {/* Password Field */}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: "#EAEAEA", color: "#777" }]} 
                    placeholder="Google Sign-In does not use a password"
                    placeholderTextColor="#777"
                    editable={false} 
                    secureTextEntry
                />

                {/* Save Changes Button */}
                <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FB",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        position: "relative",
    },
    backButton: {
        position: "absolute",
        left: 0,
        padding: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    formContainer: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        alignItems: "center",
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#555",
        marginBottom: 8,
        alignSelf: "flex-start",
    },
    input: {
        backgroundColor: "#F2F3F5",
        padding: 14,
        borderRadius: 10,
        fontSize: 16,
        color: "#333",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        width: "100%",
    },
    divider: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 20,
        width: "100%",
    },
    saveButton: {
        backgroundColor: "#912338",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        width: "100%",
    },
    saveButtonText: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
});
