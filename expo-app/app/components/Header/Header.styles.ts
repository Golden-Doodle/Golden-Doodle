import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 350, // Adjusted to make it take up less space
    // backgroundColor: "#912338", // Solid background color for the header
    // backgroundImage: require("@/assets/images/header-background.jpg"), // Background image
    position: "relative",
    justifyContent: "flex-end", // Align header content to the bottom
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  },
  headerTopRow: {
    position: "absolute",
    top: 40, // Adjusted top positioning
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    zIndex: 2,
  },
  logoutButton: {
    backgroundColor: "#912338",
    padding: 10,
    borderRadius: 30,
  },
  refreshButton: {
    padding: 10,
    marginLeft: 10,
  },
  menuButton: {
    padding: 10,
  },
  headerContent: {
    position: "absolute",
    bottom: 50, // Aligning the content to the bottom
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    zIndex: 2,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  studySpotText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  routeButton: {
    backgroundColor: "#912338",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  disabledRouteButton: {
    backgroundColor: "#888888",
    opacity: 0.6,
  },
  routeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
