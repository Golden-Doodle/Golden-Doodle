export const fetchBusLocations = async () => {
  const url = `https://us-central1-soen-390-golden-doodle.cloudfunctions.net/api/v1/bus-locations`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Bus Locations Data:", data.d); // Debugging log
    return data;
  } catch (error) {
    console.error("Error fetching bus locations:", error);
    throw error;
  }
};
