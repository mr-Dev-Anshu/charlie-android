import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import CarouselImageRender from "./CarouselImageRender";

const CarouselCard = ({ tour }) => {
  const colorScheme = useColorScheme();

  // Determine text color based on the color scheme
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";

  return (
    <Link push href={`/details/${tour.id}`} className="ml-5">
      <View
        className={`h-[430px] w-80 rounded-xl relative shadow-xl shadow-black/20 ${
          colorScheme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <View className="h-full w-full rounded-xl overflow-hidden">
          <View className="h-[200px] w-full">
            <Carousel
              loop
              width={320}
              height={200}
              autoPlay={true}
              data={tour.images}
              autoPlayInterval={2000}
              scrollAnimationDuration={1000}
              renderItem={CarouselImageRender}
            />
          </View>
          <View className="flex flex-row justify-between px-2 mt-1">
            <View className="space-y-0.5">
              {/* Change text color based on color scheme */}
              <Text className={`text-lg font-bold ${textColor}`}>
                {tour.name}
              </Text>
              <Text className={`text-md font-normal ${textColor}`}>
                {tour.duration}
              </Text>
            </View>
            <View>
              <Text className="text-lg font-bold text-green-600 text-right">{`₹${tour.cost}`}</Text>
              <Text className={`text-xs ${textColor} text-right`}>per seat</Text>
            </View>
          </View>
          <View className="p-3 space-y-3 mt-2">
            <View className="flex flex-row space-x-3">
              <Ionicons name="calendar-outline" size={16} color="green" />
              <Text className={textColor}>{tour.date}</Text>
            </View>
            <View className="flex flex-row space-x-4">
              <FontAwesome6 name="person-hiking" size={16} color="green" />
              <Text className={textColor}>{tour.difficulty}</Text>
            </View>
            <View className="flex flex-row space-x-3">
              <FontAwesome6 name="route" size={16} color="green" />
              <Text className={textColor}>{tour.distance}</Text>
            </View>
            <View className="flex flex-row space-x-3">
              <Ionicons name="person-outline" size={16} color="green" />
              <Text className={textColor}>{`${tour.seats} seats`}</Text>
            </View>
          </View>
        </View>
        <View className="absolute -bottom-8 w-full z-50">
          <View className="bg-green-700 shadow-md shadow-green-800/40 mx-12 flex justify-center items-center py-4 rounded-lg">
            <Text className="text-white">Explore more</Text>
          </View>
        </View>
      </View>
    </Link>
  );
};

export default CarouselCard;