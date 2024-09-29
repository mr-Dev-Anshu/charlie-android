import { View, Text } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";

const CheckPointElement = ({ points }) => {
  const [check, setCheck] = useState(false);
  return (
    <View className="h-[150px] flex flex-row pr-2  justify-between w-full items-center mt-2 rounded-xl border-b-[1px] border-gray-400/50">
      <View className="w-[330px]">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={points.checked ? ["rgba(22, 150, 11, 1)", "rgba(255, 255, 255, 0.2)"] : ["rgba(207, 105, 10, 1)", "rgba(255, 255, 255, 0.2)"]}
          className="rounded-l-md"
        >
          <Text className="pl-2 py-1 font-bold">{`Check Point ${points?.id}`}</Text>
        </LinearGradient>
        <Text className="mt-2 font-semibold text-lg">{points?.title}</Text>
        <Text className="mt-2 tracking-wider">{points?.description}</Text>
      </View>
      <View>
        <Ionicons
          name={
            points.qr
              ? "qr-code-outline"
              : points.checked
              ? "checkmark-circle-outline"
              : "ellipse-outline"
          }
          size={32}
          color="green"
        />
      </View>
    </View>
  );
};

export default CheckPointElement;
