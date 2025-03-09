import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import JSON files (following your naming convention)
import enHomePageScreen from "@/app/locales/en/HomePageScreen.json";
import frHomePageScreen from "@/app/locales/fr/HomePageScreen.json";
import esHomePageScreen from "@/app/locales/es/HomePageScreen.json";
import itHomePageScreen from "@/app/locales/it/HomePageScreen.json";
import heHomePageScreen from "@/app/locales/he/HomePageScreen.json";
import arHomePageScreen from "@/app/locales/ar/HomePageScreen.json";

import enHomeMenuScreen from "@/app/locales/en/HomeMenuScreen.json";
import frHomeMenuScreen from "@/app/locales/fr/HomeMenuScreen.json";
import esHomeMenuScreen from "@/app/locales/es/HomeMenuScreen.json";
import itHomeMenuScreen from "@/app/locales/it/HomeMenuScreen.json";
import heHomeMenuScreen from "@/app/locales/he/HomeMenuScreen.json";
import arHomeMenuScreen from "@/app/locales/ar/HomeMenuScreen.json";

// Define translations using namespaces
const resources = {
  en: { HomePageScreen: enHomePageScreen, HomeMenuScreen: enHomeMenuScreen },
  fr: { HomePageScreen: frHomePageScreen, HomeMenuScreen: frHomeMenuScreen },
  es: { HomePageScreen: esHomePageScreen, HomeMenuScreen: esHomeMenuScreen },
  it: { HomePageScreen: itHomePageScreen, HomeMenuScreen: itHomeMenuScreen },
  he: { HomePageScreen: heHomePageScreen, HomeMenuScreen: heHomeMenuScreen },
  ar: { HomePageScreen: arHomePageScreen, HomeMenuScreen: arHomeMenuScreen },
};

// Function to load the saved language or default to device language
const getLanguage = async () => {
  try {
    const savedLang = await AsyncStorage.getItem("language");
    if (savedLang) return savedLang;

    const locales = Localization.getLocales();
    return locales[0]?.languageCode || "en"; // Use device language if no saved language || default to English
  } catch (error) {
    console.error("Error loading language:", error);
    return "en";
  }
};

// Initialize i18n after getting the language
(async () => {
  // const lng = await getLanguage();
  const lng = "en"; // For testing purposes - you may set the language here
  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "en",
    ns: ["HomePageScreen", "HomeMenuScreen"], // Define namespaces based on screen names
    defaultNS: "HomePageScreen",
    interpolation: { escapeValue: false },
  });
})();

// Save selected language when changed
i18n.on("languageChanged", (lng) => {
  AsyncStorage.setItem("language", lng);
});

export default i18n;
