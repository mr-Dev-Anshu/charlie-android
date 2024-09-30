import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AccomodationDetailsElement = ({ details }) => {
  return (
    <View className="mt-4 space-y-2 pl-2">
      <View>
        <Text>{`Day ${details?.id}`}</Text>
        <Text className="font-semibold">{`${details?.date}`}</Text>
      </View>
      <View>
        <Text>{`Place`}</Text>
        <Text className="font-semibold">{`${details?.place}`}</Text>
      </View>
      <View>
        <Text>{`Hotel Name`}</Text>
        <Text className="font-semibold">{`${details?.hotelName}`}</Text>
      </View>
      <View>
        <Text>{`Room`}</Text>
        <Text className="font-bold">{`${details?.roomNumber}`}</Text>
      </View>
      <View className="flex flex-row space-x-4 pt-2">
        <View className="flex flex-row space-x-2 justify-center items-center">
          <Ionicons name="images" size={16} color="green" />
          <Text className="font-semibold text-green-700">{`View Hotel Images`}</Text>
        </View>
        <View className="flex flex-row space-x-2 justify-center items-center">
          <Ionicons name="compass" size={16} color="green" />
          <Text className="font-semibold text-green-700">{`View Direction`}</Text>
        </View>
      </View>
      <View className="w-full h-[1px] bg-green-700" />
    </View>
  );
};

export default AccomodationDetailsElement;
