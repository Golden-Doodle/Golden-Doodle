import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  overlay: { // 🔴 Make sure this is included
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark transparent overlay
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 50,
  },
  timerText: {
    fontSize: 30,
    fontWeight: "400",
    color: "#fff",
    marginTop: 10,
  },
routeButton: {
  backgroundColor: "#990000",
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 12,
  marginTop: 20,  // ⬅️ Increase this value slightly (e.g., 25)
  marginBottom: 15, // ⬅️ Add some bottom spacing
},
  routeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
