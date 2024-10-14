import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import CarouselImageRender from "./CarouselImageRender";
import Carousel from "react-native-reanimated-carousel";

const MyTourCard = ({ tour }) => {
  const confirmed = 0;
  const pending = 1;

  return (
    <Link href={`/mytour/${tour.id}`} className="mt-4">
      <View
        className={`w-[360px] h-[470px] mt-5 rounded-xl overflow-hidden bg-white shadow-xl shadow-black/70 `}
      >
        <View className="h-[256px] w-full">
          <Carousel
            loop
            width={390}
            height={256}
            autoPlay={true}
            data={tour.images}
            autoPlayInterval={2000}
            scrollAnimationDuration={1000}
            renderItem={CarouselImageRender}
          />
        </View>

        <View className="flex flex-row justify-between px-3 mt-2">
          <View>
            <Text className={`text-xl font-bold`}>{tour.name}</Text>
            <Text>{tour.duration}</Text>
          </View>

          <View
            className={`w-28 ${
              confirmed
                ? "bg-green-600"
                : pending
                ? "bg-orange-500"
                : "bg-red-500"
            } flex flex-row justify-center items-center space-x-2 mt-2 rounded-lg h-6`}
          >
            <Ionicons
              name={`${
                confirmed
                  ? "checkmark-circle-outline"
                  : pending
                  ? "time-outline"
                  : "close-circle-outline"
              }`}
              size={16}
              color={"white"}
            />
            <Text className="text-center font-bold text-white capitalize">{`${
              confirmed ? "confirmed" : pending ? "pending" : "rejected"
            }`}</Text>
          </View>
        </View>

        <View className="p-3 space-y-4 mt-2">
          <View className="flex flex-row space-x-3">
            <Ionicons name="calendar-outline" size={16} color="green" />
            <Text>{tour.date}</Text>
          </View>

          <View className="flex flex-row space-x-4">
            <FontAwesome6 name="person-hiking" size={16} color="green" />
            <Text>{tour.difficulty}</Text>
          </View>

          <View className="flex flex-row space-x-3">
            <FontAwesome6 name="route" size={16} color="green" />
            <Text>{tour.distance}</Text>
          </View>

          <View className="flex flex-row space-x-3">
            <Ionicons name="person-outline" size={16} color="green" />
            <Text>{`${tour.seats} seats`}</Text>
          </View>
        </View>
      </View>
    </Link>
  );
};

export default MyTourCard;
