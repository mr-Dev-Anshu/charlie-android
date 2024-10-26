import v1 from "@/assets/welcomeTile.svg";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import CarouselComponent from "@/components/CarouselComponent";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTour } from "@/redux/slices/tourSlice";
import { StatusBar } from "expo-status-bar";
import * as Network from "expo-network";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(null);
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

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
    setIsMounted(true);

    checkNetworkConnection();
    if (isMounted && !user) {
      router.push("/login");
    }

    if (isConnected && user) {
      getAllTours();
    }
    return () => {
      setIsMounted(false);
    };
  }, [isConnected, user, isMounted]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        style="dark"
        backgroundColor="#fff"
        translucent={true}
        animated
      />
      <View style={styles.container}>
        <Image source={v1} style={styles.image} />
        {isConnected === false ? (
          <View style={styles.centeredContainer}>
            <Text style={styles.offlineText}>Mobile data off</Text>
          </View>
        ) : (
          <View style={styles.carouselContainer}>
            <CarouselComponent />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: height * 0.45,
    contentFit: "cover",
    position:"absolute"
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  offlineText: {
    fontSize: width * 0.05,
    color: "red",
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});