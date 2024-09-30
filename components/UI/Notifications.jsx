import { View, Text, useColorScheme } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { shorten } from "./PostComponent";
import { TouchableOpacity } from "react-native-gesture-handler";

const Notifications = () => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const bgColor = colorScheme === "dark" ? "bg-gray-800" : "bg-white";
  const borderColor = colorScheme === "dark" ? "border-green-600/50" : "border-green-600/20";
  const notificationTextColor = colorScheme === "dark" ? "text-gray-300" : "text-black";

  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos fuga nesciunt, minima perferendis aut quia rem, eos id quo quod, libero deserunt alias enim corrupti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fugit placeat atque ut at porro est eligendi sed possimus excepturi qui sequi omnis debitis, adipisci alias, nulla hic doloremque? Corrupti labore beatae dolor. Ipsum accusamus voluptatum exercitationem fuga, nisi doloremque, totam rerum explicabo provident consequatur corporis deserunt corrupti nostrum cupiditate.";

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View className={`border-2 h-32 rounded-lg p-2 mt-3 ${bgColor} ${borderColor}`}>
        <View className="flex flex-row justify-start items-center space-x-3">
          <FontAwesome6 name="bell" size={20} color={"green"} />
          <Text className={`text-base font-semibold ${textColor}`}>ShriShailm Trek</Text>
        </View>
        <View className="mt-2">
          <Text className={`tracking-wide text-justify ${notificationTextColor}`}>
            {shorten(text, 160)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notifications;