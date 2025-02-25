import { fetchBusLocations } from "../concordiaShuttleService";
import axios from "axios";

// Mocking the axios module
jest.mock("axios");

describe("fetchBusLocations", () => {
  it("should fetch bus locations successfully", async () => {
    // Mocking the axios GET request for session cookies
    axios.get.mockResolvedValue({
      headers: { "set-cookie": ["cookie1=value1", "cookie2=value2"] },
    });

    // Mocking the axios POST request for fetching bus data
    axios.post.mockResolvedValue({
      data: [
        { id: 1, location: "Location A" },
        { id: 2, location: "Location B" },
      ],
    });

    const req = { headers: { cookie: "cookie1=value1; cookie2=value2" } }; // Add mock cookies if needed
    const res = { json: jest.fn() }; // Mocking the response object

    // Call the fetchBusLocations function
    await fetchBusLocations(req, res);

    // Check that the response was sent with the bus data
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, location: "Location A" },
      { id: 2, location: "Location B" },
    ]);
  });

  it("should handle missing session cookies gracefully", async () => {
    // Mocking the axios GET request to simulate missing cookies
    axios.get.mockResolvedValue({
      headers: {}, // No session cookies
    });

    const req = { headers: {} }; // Mocking the request object with no cookies
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; // Mocking the response object

    // Call the fetchBusLocations function
    await fetchBusLocations(req, res);

    // Check that the response status was set to 500 and the error message was sent
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch bus locations",
    });
  });

  it("should handle axios request errors gracefully", async () => {
    // Mocking the axios GET request to simulate a failure
    axios.get.mockRejectedValue(new Error("Request failed"));

    const req = {}; // Mocking the request object
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; // Mocking the response object

    // Call the fetchBusLocations function
    await fetchBusLocations(req, res);

    // Check that the response status was set to 500 and the error message was sent
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch bus locations",
    });
  });
});
