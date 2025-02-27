import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { fetchBusLocations } from "./src/controller/concordiaShuttleService.js";

const app = express();
app.use(cors()); // Allows requests from expo-app
app.use(express.json()); // Middleware to parse JSON

// Default route
app.get("/", (req, res) => {
  res.send("Hello, Express with ES Modules!");
});

// API Route for fetching bus locations
app.get("/v1/bus-locations", fetchBusLocations);

// Export the app
export const api = functions.https.onRequest(app);
