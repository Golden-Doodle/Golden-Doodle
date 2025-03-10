import { Stack } from "expo-router";
import { AuthProvider } from "@/app/contexts/AuthContext";
import Smartlook from 'react-native-smartlook-analytics';
import { useEffect } from "react";



export default function RootLayout() {

  useEffect(() => {
    Smartlook.instance.preferences.setProjectKey(
      "6cd84bb9390b30f9e14aaf82343928485690efe9"
    );
    Smartlook.instance.start();
  }, []);
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
