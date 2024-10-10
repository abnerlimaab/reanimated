import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="introduction"
            options={{
              headerTitle: "01 - Introduction",
              headerBackTitle: "Classes",
            }}
          />
          <Stack.Screen
            name="panGestureHandlerBasics"
            options={{
              headerTitle: "02 - PanGestureHandler Basics",
              headerBackTitle: "Classes",
            }}
          />
          <Stack.Screen
            name="interpolateWithScrollView"
            options={{
              headerTitle: "03 - Interpolate with ScrollView",
              headerBackTitle: "Classes",
            }}
          />
          <Stack.Screen
            name="interpolateColors"
            options={{
              headerTitle: "04 - Interpolate Colors",
              headerBackTitle: "Classes",
            }}
          />
          <Stack.Screen
            name="pinchGestureHandlerBasics"
            options={{
              headerTitle: "05 - PinchGestureHandler Basics",
              headerBackTitle: "Classes",
            }}
          />
          <Stack.Screen
            name="animateDoubleTap"
            options={{
              headerTitle: "06 - Animate Double Tap",
              headerBackTitle: "Classes",
            }}
          />
          <Stack.Screen
            name="colorPickerAnimation"
            options={{
              headerTitle: "07 - Color Picker Animation",
              headerBackTitle: "Classes",
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
