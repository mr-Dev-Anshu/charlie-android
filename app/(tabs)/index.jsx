import v1 from "@/assets/welcomeTile.svg";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import CarouselComponent from "@/components/CarouselComponent";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTour } from "@/redux/slices/tourSlice";
import { StatusBar } from "expo-status-bar";
import * as Network from "expo-network";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(null);

  const getAllTours = async () => {
    try {
      const response = await fetch(
        "https://trakies-backend.onrender.com/api/tour/get-alltours"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tours");
      }
      const tour = await response.json();
      dispatch(setTour(tour));
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const checkNetworkConnection = async () => {
    const networkState = await Network.getNetworkStateAsync();
    setIsConnected(networkState.isConnected);
  };

  useEffect(() => {
    checkNetworkConnection();
    if (isConnected) {
      getAllTours();
    }
  }, [isConnected]);

  return (
    <SafeAreaView>
      <StatusBar
        style="dark"
        backgroundColor="#fff"
        translucent={true}
        animated
      />
      <View className="flex h-full space-y-5 relative">
        {isConnected === false ? (
          <View className="flex-1 justify-center items-center">
            <Text style={{ fontSize: 20, color: "red" }}>Mobile data off</Text>
          </View>
        ) : (
          <>
            <Image source={v1} className="h-96 top-0 w-full" />
            <CarouselComponent />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
