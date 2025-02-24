import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth"; 
import SettingsHeader from "../../components/Settings/SettingsHeader"; 
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation"; 

export default function SettingsScreen() {
    const router = useRouter();

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {
        const loadSettings = async () => {
            const savedNotifications = await AsyncStorage.getItem("notifications");
            const savedDarkMode = await AsyncStorage.getItem("darkMode");

            if (savedNotifications !== null) setNotificationsEnabled(JSON.parse(savedNotifications));
            if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
        };
        loadSettings();
    }, []);

    const saveSetting = async (key: string, value: any) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    };

    return (
        <View style={styles.container}>
            {/* Settings Header */}
            <SettingsHeader />

            {/* Scrollable Settings List */}
            <ScrollView contentContainerStyle={styles.settingsList}>

                {/* Schedule */}
                <TouchableOpacity style={styles.settingOption} onPress={() => router.push("/screens/Shuttle/ShuttleScreen")}>
                    <FontAwesome5 name="clock" size={18} color="#912338" />
                    <Text style={styles.settingText}>Schedule</Text>
                    <FontAwesome5 name="chevron-right" size={16} color="#912338" />
                </TouchableOpacity>

                {/* Notifications */}
                <View style={styles.settingOption}>
                    <FontAwesome5 name="bell" size={18} color="#912338" />
                    <Text style={styles.settingText}>Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={(value) => {
                            setNotificationsEnabled(value);
                            saveSetting("notifications", value);
                        }}
                    />
                </View>

                {/* Account Details */}
                <TouchableOpacity style={styles.settingOption} onPress={() => router.push("/screens/Settings/AccountSettingsScreen")}>
                    <FontAwesome5 name="user" size={18} color="#912338" />
                    <Text style={styles.settingText}>Account details</Text>
                    <FontAwesome5 name="chevron-right" size={16} color="#912338" />
                </TouchableOpacity>

                {/* Support */}
                <TouchableOpacity style={styles.settingOption} onPress={() => router.push("/screens/Settings/SupportScreen")}>
                    <FontAwesome5 name="question-circle" size={18} color="#912338" />
                    <Text style={styles.settingText}>Support</Text>
                    <FontAwesome5 name="chevron-right" size={16} color="#912338" />
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity 
                    style={[styles.settingOption, styles.logout]} 
                    onPress={async () => {
                        try {
                            await auth().signOut(); 
                            await AsyncStorage.clear(); 
                            router.replace("/"); 
                        } catch (error) {
                            console.error("Logout Error:", error);
                        }
                    }}
                >
                    <FontAwesome5 name="sign-out-alt" size={18} color="#912338" />
                    <Text style={styles.settingText}>Logout</Text>
                    <FontAwesome5 name="chevron-right" size={16} color="#912338" />
                </TouchableOpacity>

                {/* Delete Account */}
                <TouchableOpacity style={[styles.settingOption, styles.deleteAccount]} onPress={() => console.log("Delete Account")}>
                    <FontAwesome5 name="trash-alt" size={18} color="red" />
                    <Text style={[styles.settingText, { color: "red" }]}>Delete Account</Text>
                    <FontAwesome5 name="chevron-right" size={16} color="red" />
                </TouchableOpacity>

            </ScrollView>

            {/* Bottom Navigation */}
            <BottomNavigation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    settingsList: {
        paddingVertical: 15,
    },
    settingOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    settingText: {
        fontSize: 16,
        fontWeight: "500",
        flex: 1,
        marginLeft: 10,
        color: "#912338",
    },
    logout: {
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        marginTop: 10,
    },
    deleteAccount: {
        marginTop: 5,
    },
});