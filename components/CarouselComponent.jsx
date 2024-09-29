import { View, Text, Dimensions } from "react-native";
import React from "react";
import CarouselCard from "./UI/CarouselCard";
import { ScrollView } from "react-native-gesture-handler";
import { tours } from "@/constants/tours.js";

const { width } = Dimensions.get("window");

const CarouselComponent = () => {
  return (
    <View className="absolute top-[280px] flex justify-center items-center z-50 h-[500px]">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        <View className="flex flex-row px-10 pt-2">
          {tours.map((tour, index) => (
            <CarouselCard key={index} tour={tour} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CarouselComponent;
