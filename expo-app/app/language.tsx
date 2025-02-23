import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function LanguageScreen() {
    const router = useRouter();

    // Available language options
    const languages = ["English", "French", "Spanish"];

    // State for selected language
    const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

    // Load stored language preference
    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLang = await AsyncStorage.getItem("language");
                if (savedLang !== null) {
                    setSelectedLanguage(savedLang);
                }
            } catch (error) {
                console.error("Failed to load language setting", error);
            }
        };
        loadLanguage();
    }, []);

    // Save language selection
    const saveLanguage = async (language: string) => {
        try {
            await AsyncStorage.setItem("language", language);
            setSelectedLanguage(language);
        } catch (error) {
            console.error("Failed to save language setting", error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome5 name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Select Language</Text>
            </View>

            {/* Language Selection List */}
            <FlatList
                data={languages}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.languageOption,
                            selectedLanguage === item && styles.selectedLanguage,
                        ]}
                        onPress={() => saveLanguage(item)}
                    >
                        <Text
                            style={[
                                styles.languageText,
                                selectedLanguage === item && styles.selectedText,
                            ]}
                        >
                            {item}
                        </Text>
                        {selectedLanguage === item && (
                            <FontAwesome5 name="check-circle" size={20} color="#990000" />
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

/** 📌 Styles */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
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
    languageOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    selectedLanguage: {
        borderColor: "#990000",
        borderWidth: 2,
    },
    languageText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    selectedText: {
        color: "#990000",
        fontWeight: "bold",
    },
});
