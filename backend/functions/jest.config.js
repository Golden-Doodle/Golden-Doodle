// jest.config.mjs
export default {
  transform: {
    "^.+\\.js$": "babel-jest", // Transform ES6+ code using babel-jest
  },
  moduleFileExtensions: ["js", "json", "node"], // Add extensions
  testEnvironment: "node", // Set the test environment to node
};
