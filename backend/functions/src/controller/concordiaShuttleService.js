import axios from "axios";

// Function to fetch bus locations
export const fetchBusLocations = async (req, res) => {
  try {
    // console.log("🚀 Fetching session cookies...");

    // Step 1: Get session cookies
    const response = await axios.get(
      "https://shuttle.concordia.ca/concordiabusmap/Map.aspx",
      {
        headers: { "User-Agent": "Mozilla/5.0" },
      }
    );

    const sessionCookies = response.headers["set-cookie"];
    if (!sessionCookies) throw new Error("❌ No session cookies found");

    // console.log("✅ Session cookies received:", sessionCookies);

    // console.log("🚀 Fetching Concordia bus locations...");

    // Step 2: Fetch the bus locations using the session cookies
    const busResponse = await axios.post(
      "https://shuttle.concordia.ca/concordiabusmap/WebService/GService.asmx/GetGoogleObject",
      {},
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Content-Type": "application/json; charset=UTF-8",
          Cookie: sessionCookies.join("; "), // Pass session cookies
        },
      }
    );

    // console.log("✅ Bus data received:", busResponse.data);
    res.json(busResponse.data);
  } catch (error) {
    console.error("⚠️ Error fetching bus data:", error);
    res.status(500).json({ error: "Failed to fetch bus locations" });
  }
};
