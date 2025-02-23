import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30, // ⬆️ Increase spacing from "Optimize Route"
        gap: 20, // ⬆️ Improve spacing between buttons
    },
    button: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#990000",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 4 }, // 🔹 Make shadows more visible
        shadowOpacity: 0.3, // 🔹 Slightly increase shadow depth
        shadowRadius: 4,
        elevation: 5, // 🔹 Improve shadow effect on Android
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#990000",
    },
    // 🔹 Fix for the faint text under "Optimize Route"
    helperText: {
        fontSize: 14,
        color: "#000",
        backgroundColor: "rgba(255,255,255,0.7)", // 🆕 Light background to enhance readability
        padding: 5,
        textAlign: "center",
        borderRadius: 5,
        marginTop: 10,
    }
});
