import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Switch,
    Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/AuthContext";
import { fetchAllCalendars } from "@/app/services/GoogleCalendar/fetchingUserCalendarData";

export default function AccountScreen() {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider.");
    }

    const { user } = authContext;
    const [selectedCalendarId, setSelectedCalendarId] = useState<string | null>(null);
    const [availableSchedules, setAvailableSchedules] = useState<any[]>([]);
    const [initialCalendarId, setInitialCalendarId] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            const allCalendars = await fetchAllCalendars();
            const storedSelectedCalendarId = await AsyncStorage.getItem("selectedScheduleID");
            
            setAvailableSchedules(allCalendars);
            setSelectedCalendarId(storedSelectedCalendarId);
            setInitialCalendarId(storedSelectedCalendarId);
        };

        loadUserData();
    }, []);

    const selectCalendar = (calendarId: string) => {
        setSelectedCalendarId(calendarId);
        setHasChanges(calendarId !== initialCalendarId);
    };

    const saveChanges = async () => {
        if (!selectedCalendarId) return;

        await AsyncStorage.setItem("selectedScheduleID", selectedCalendarId);
        const selectedCalendar = availableSchedules.find((cal) => cal.id === selectedCalendarId);
        if (selectedCalendar) {
            await AsyncStorage.setItem("selectedScheduleName", selectedCalendar.summary);
        }
        
        setInitialCalendarId(selectedCalendarId);
        setHasChanges(false);
        Alert.alert("Success", "Calendar selection updated successfully!");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome5 name="arrow-left" size={30} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Account Settings</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.profileContainer}>
                    {user?.photoURL ? (
                        <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
                    ) : (
                        <FontAwesome5 name="user-circle" size={80} color="#888" />
                    )}
                </View>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: "#EAEAEA", color: "#333", fontWeight: "bold" }]}
                    value={user?.email || ""}
                    editable={false}
                />

                <View style={styles.divider} />

                <Text style={styles.label}>Select Schedule</Text>
                {availableSchedules.length > 0 ? (
                    availableSchedules.map((calendar) => (
                        <View key={calendar.id} style={styles.scheduleOption}>
                            <Text style={styles.scheduleText}>{calendar.summary}</Text>
                            <Switch
                                value={selectedCalendarId === calendar.id}
                                onValueChange={() => selectCalendar(calendar.id)}
                            />
                        </View>
                    ))
                ) : (
                    <Text style={styles.noCalendarText}>No schedules found</Text>
                )}

                <TouchableOpacity
                    style={[styles.saveButton, { opacity: hasChanges ? 1 : 0.5 }]}
                    activeOpacity={0.8}
                    disabled={!hasChanges}
                    onPress={saveChanges}
                >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    scheduleOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "#F2F2F2",
        width: "100%",
    },
    scheduleText: {
        fontSize: 16,
    },
    noCalendarText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 10,
    },
});
