import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "@/redux/store.js";
import CustomBackButton from "@/components/UI/CustomBackButton";
import "react-native-get-random-values";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

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
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor="#000" translucent={false} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="temp" options={{ headerShown: false }} />
          <Stack.Screen name="form" options={{ headerShown: false }} />
          <Stack.Screen name="addRoles" options={{ headerShown: false }} />
          <Stack.Screen name="addMember" options={{ headerShown: false }} />
          <Stack.Screen name="addTours" options={getOpt("Add Tour")} />
          <Stack.Screen name="addBusImg" options={getOpt("Add Bus Images")} />
          <Stack.Screen
            name="addHotelImg"
            options={getOpt("Add Hotel Images")}
          />
          <Stack.Screen
            name="addTourImgs"
            options={getOpt("Add Tour Images")}
          />
          <Stack.Screen name="editProfile" options={getOpt("Create Profile")} />
          <Stack.Screen
            name="updateProfile"
            options={getOpt("Update Profile")}
          />
          <Stack.Screen name="profile" options={getOpt("My Profile")} />
          <Stack.Screen name="tourmates" options={getOpt("Tour Mates")} />
          <Stack.Screen name="details/[id]" options={getOpt("Tour Details")} />
          <Stack.Screen name="postdetails/[id]" options={getOpt("Post")} />
          <Stack.Screen name="tour/[id]" options={getOpt("Tour Details")} />
          <Stack.Screen
            name="mytour/[id]"
            options={getOpt("My Tour Details")}
          />
          <Stack.Screen name="payment" options={getOpt("Payment")} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          {/* add tour details screens */}
          <Stack.Screen
            name="(addTourDetails)/accomodation/[id]"
            options={getOpt("Accomodations", "(addTourDetails)/tourDetails")}
          />
          <Stack.Screen
            name="(addTourDetails)/allocatedCoordinators/[id]"
            options={getOpt("Allocated Coordinators", "(addTourDetails)/allocatedCoordinators")}
          />
          <Stack.Screen
            name="(addTourDetails)/checkPoints/[id]"
            options={getOpt("Check Points", "(addTourDetails)/checkPoints")}
          />
          <Stack.Screen
            name="(addTourDetails)/includedNotIncluded/[id]"
            options={getOpt("Included/Not Included", "(addTourDetails)/includedNotIncluded")}
          />
          <Stack.Screen
            name="(addTourDetails)/myNotes/[id]"
            options={getOpt("My Notes", "(addTourDetails)/myNotes")}
          />
          <Stack.Screen
            name="(addTourDetails)/tourDetails/[id]"
            options={getOpt("Tour Details", "(addTourDetails)/tourDetails")}
          />
          <Stack.Screen
            name="(addTourDetails)/transportation/[id]"
            options={getOpt("Transportations", "(addTourDetails)/transportation")}
          />
          <Stack.Screen
            name="(addTourDetails)/guestsEnrolled/[id]"
            options={getOpt("Enrolled Guests")}
          />
          <Stack.Screen
            name="(addTourDetails)/createCheckpoints/[id]"
            options={getOpt("Create Check Points")}
          />
          <Stack.Screen
            name="(addTourDetails)/luggage/[id]"
            options={getOpt("Luggage Items")}
          />
          <Stack.Screen
            name="(addTourDetails)/exportDetails/[id]"
            options={getOpt("Export Details")}
          />
          <Stack.Screen
            name="(addTourDetails)/viewCheckIns/[id]"
            options={getOpt("Checked In")}
          />
          <Stack.Screen
            name="(addTourDetails)/addAccomodationForm/[id]"
            options={getOpt("Add Accomodation Details")}
          />
          <Stack.Screen
            name="(addTourDetails)/showAccomodationDetails/[id]"
            options={getOpt("Accomodation Details")}
          />
          <Stack.Screen
            name="(addTourDetails)/RoomAllocation/[id]"
            options={getOpt("Room Allocation")}
          />
          <Stack.Screen
            name="(addTourDetails)/addTransportDetails/[id]"
            options={getOpt("AddTransport Details")}
          />
          <Stack.Screen
            name="(addTourDetails)/transportDetails/[id]"
            options={getOpt("Transport Details")}
          />
          <Stack.Screen
            name="(addTourDetails)/addBoardingPoint/[id]"
            options={getOpt("Boarding Point Details")}
          />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}

function getOpt(title, backRoute) {
  return {
    headerShown: true,
    title,
    headerBackTitleVisible: false,
    headerLeft: () => (
      <CustomBackButton icon={"chevron-back-outline"} backRoute={backRoute} />
    ),
  };
}
