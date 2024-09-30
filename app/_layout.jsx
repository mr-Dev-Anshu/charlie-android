import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "@/redux/store.js";
import CustomBackButton from "@/components/UI/CustomBackButton";

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
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="form" options={{ headerShown: false }} />
            <Stack.Screen name="addRoles" options={{ headerShown: false }} />
            <Stack.Screen name="addMember" options={{ headerShown: false }} />
            <Stack.Screen name="addTours" options={getOpt("Add Tour")} />
            <Stack.Screen
              name="addTourImgs"
              options={getOpt("Add Tour Images")}
            />
            <Stack.Screen name="editProfile" options={getOpt("Edit Profile")} />
            <Stack.Screen name="admin" options={getOpt("Admin Screen")} />
            <Stack.Screen name="profile" options={getOpt("My Profile")} />
            <Stack.Screen name="tourmates" options={getOpt("Tour Mates")} />
            <Stack.Screen
              name="details/[id]"
              options={getOpt("Tour Details")}
            />
            <Stack.Screen name="postdetails/[id]" options={getOpt("Post")} />
            <Stack.Screen
              name="mytour/[id]"
              options={getOpt("My Tour Details")}
            />
            <Stack.Screen name="payment" options={getOpt("Payment")} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </GestureHandlerRootView>
      </Provider>
    </ThemeProvider>
  );
}

function getOpt(title) {
  return {
    headerShown: true,
    title,
    headerBackTitleVisible: false,
    headerLeft: () => <CustomBackButton icon={"chevron-back-outline"} />,
  };
}
