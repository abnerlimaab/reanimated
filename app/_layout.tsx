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
import { routes } from "./routes";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const headerBackTitle = "Classes";

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
          <Stack.Screen
            name={routes.index.name}
            options={{
              headerTitle: routes.index.title,
            }}
          />
          <Stack.Screen
            name={routes.introduction.name}
            options={{
              headerTitle: routes.introduction.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.panGestureHandlerBasics.name}
            options={{
              headerTitle: routes.panGestureHandlerBasics.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.interpolateWithScrollView.name}
            options={{
              headerTitle: routes.interpolateWithScrollView.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.interpolateColors.name}
            options={{
              headerTitle: routes.interpolateColors.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.pinchGestureHandlerBasics.name}
            options={{
              headerTitle: routes.pinchGestureHandlerBasics.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.animateDoubleTap.name}
            options={{
              headerTitle: routes.animateDoubleTap.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.colorPickerAnimation.name}
            options={{
              headerTitle: routes.colorPickerAnimation.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.circularProgressBar.name}
            options={{
              headerTitle: routes.circularProgressBar.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.swipeToDelete.name}
            options={{
              headerTitle: routes.swipeToDelete.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.rippleEffect.name}
            options={{
              headerTitle: routes.rippleEffect.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.perspectiveMenu.name}
            options={{
              headerTitle: routes.perspectiveMenu.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.slidingCounter.name}
            options={{
              headerTitle: routes.slidingCounter.title,
              headerBackTitle,
            }}
          />
          <Stack.Screen
            name={routes.clockLoader.name}
            options={{
              headerTitle: routes.clockLoader.title,
              headerBackTitle,
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
