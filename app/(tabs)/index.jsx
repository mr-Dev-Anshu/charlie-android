import v1 from "@/assets/welcomeTile.svg";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import CarouselComponent from "@/components/CarouselComponent";
import { View } from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTour } from "@/redux/slices/tourSlice";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    getAllTours();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        style="dark"
        backgroundColor="#fff"
        translucent={true}
        animated
      />
      <View className="flex h-full space-y-5 relative">
        <Image source={v1} className="h-96 top-0 w-full" />
        <CarouselComponent />
      </View>
    </SafeAreaView>
  );
}
