import { View, Text, Dimensions } from "react-native";
import React from "react";
import CarouselCard from "./UI/CarouselCard";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import CardSkeleton from "./UI/CardSkeleton";

const CarouselComponent = () => {
  const { tour } = useSelector((state) => state.tour);

  return (
    <View className="absolute top-[260px] flex justify-center items-center z-50 h-[500px]">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tour && tour.length !== 0 ? (
          <View className="flex flex-row px-8 pt-2 justify-center items-center">
            {tour.map((tour, index) => (
              <CarouselCard key={index} tour={tour} />
            ))}
          </View>
        ) : (
          <View className="flex flex-row px-8 pt-2 justify-center items-center">
            <CardSkeleton />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CarouselComponent;
