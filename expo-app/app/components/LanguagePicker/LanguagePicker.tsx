import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import supportedLanguages from "@/app/config/supportedLanguages"; // Import languages

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  // Load saved language from AsyncStorage on mount
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem("language");
      if (storedLang) {
        setSelectedLanguage(storedLang);
        i18n.changeLanguage(storedLang);
      }
    };
    loadLanguage();
  }, []);

  // Handle language change
  const changeLanguage = async (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };

  // Get the full name of the selected language
  const selectedLanguageLabel =
    supportedLanguages.find((lang) => lang.code === selectedLanguage)?.label ||
    "English";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {t("selected_language")}: {selectedLanguageLabel}{" "}
        {/* Display full name */}
      </Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={changeLanguage}
        style={styles.picker}
      >
        {supportedLanguages.map((lang) => (
          <Picker.Item key={lang.code} label={lang.label} value={lang.code} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default LanguageSelector;
