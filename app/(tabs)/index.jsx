import v1 from "@/assets/welcomeTile.svg";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import CarouselComponent from "@/components/CarouselComponent";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="flex h-full space-y-5 relative">
        <Image source={v1} className="h-96 top-0 w-full" />
        <CarouselComponent />
      </View>
    </SafeAreaView>
  );
}
