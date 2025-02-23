module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // ✅ Correct preset
    plugins: [] // ✅ Remove "expo-router/babel" completely
  };
};
