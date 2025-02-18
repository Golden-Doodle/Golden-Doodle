import { StyleSheet } from "react-native";
export default StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: 350, 
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  headerTopRow: {
    position: "absolute",
    top: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  /* Logout Button */
  logoutButton: {
    backgroundColor: "#912338",
    padding: 10,
    borderRadius: 30, 
  },
  refreshButton: {
    padding: 10,
    marginLeft: 10,  
  },
  /* Menu Button */
  menuButton: {
    padding: 10,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,  
    paddingHorizontal: 60, 
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
    marginTop: 50,
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
    marginTop: 40
  },
  routeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
