import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AccomodationDetailsElement = ({ details }) => {
  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const bgColor = colorScheme === "dark" ? "black" : "white";
  const accentBgColor = colorScheme === "dark" ? "bg-gray-800" : "white";
  return (
    <View className="mt-4 space-y-2 pl-2">
      <View>
        <Text className={`${textColor}`}>{`Day ${details?.id}`}</Text>
        <Text
          className={`font-semibold ${textColor}`}
        >{`${details?.date}`}</Text>
      </View>
      <View>
        <Text className={`${textColor}`}>{`Place`}</Text>
        <Text
          className={`font-semibold ${textColor}`}
        >{`${details?.place}`}</Text>
      </View>
      <View>
        <Text className={`${textColor}`}>{`Hotel Name`}</Text>
        <Text
          className={`font-semibold ${textColor}`}
        >{`${details?.hotelName}`}</Text>
      </View>
      <View>
        <Text className={`font-bold ${textColor}`}>{`Room`}</Text>
        <Text
          className={`font-bold ${textColor}`}
        >{`${details?.roomNumber}`}</Text>
      </View>
      <View className="flex flex-row space-x-4 pt-2">
        <View className="flex flex-row space-x-2 justify-center items-center">
          <Ionicons
            name="images"
            size={16}
            color={textColor.includes("white") ? "white" : "green"}
          />
          <Text
            className={`font-semibold ${textColor}`}
          >{`View Hotel Images`}</Text>
        </View>
        <View className="flex flex-row space-x-2 justify-center items-center">
          <Ionicons
            name="compass"
            size={16}
            color={textColor.includes("white") ? "white" : "green"}
          />
          <Text
            className={`font-semibold ${textColor}`}
          >{`View Direction`}</Text>
        </View>
      </View>
      <View
        className={`w-full h-[1px] ${
          textColor.includes("white") ? "bg-white" : "bg-green-700"
        }`}
      />
    </View>
  );
};

export default AccomodationDetailsElement;
