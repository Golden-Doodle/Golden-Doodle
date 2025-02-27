import request from "supertest";
import { api } from "../../index.js"; // import the API from your Express app

// Mock the fetchBusLocations function
jest.mock("../controller/concordiaShuttleService.js", () => ({
  fetchBusLocations: jest.fn(),
}));

describe("Express API Tests", () => {
  it("should return a greeting on the default route", async () => {
    const response = await request(api).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, Express with ES Modules!");
  });

  it("should return bus locations when calling /v1/bus-locations", async () => {
    // Mocking the response from fetchBusLocations function
    const mockBusLocations = [
      { id: 1, location: "Location A" },
      { id: 2, location: "Location B" },
    ];

    const {
      fetchBusLocations,
    } = require("../controller/concordiaShuttleService.js");
    fetchBusLocations.mockResolvedValue(mockBusLocations);

    const response = await request(api).get("/v1/bus-locations");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBusLocations);
  });

  it("should return 500 error if fetchBusLocations fails", async () => {
    // Simulate an error in fetchBusLocations
    const {
      fetchBusLocations,
    } = require("..controller/concordiaShuttleService.js");
    fetchBusLocations.mockRejectedValue(new Error("Something went wrong"));

    const response = await request(api).get("/v1/bus-locations");
    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Something went wrong");
  });
});
