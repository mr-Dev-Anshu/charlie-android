import { View, Text } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const CheckPointElement = ({ points }) => {
  const [check, setCheck] = useState(false);

  return (
    <View
      className={`h-[150px] p-2 flex justify-start w-full items-center mt-2 rounded-xl bg-white shadow-xl shadow-black/50`}
    >
      <View className="flex flex-row">
        <View className="w-[80%]">
          <Text className={`py-1 text-xs`}>{`Check Point ${points?.id}`}</Text>
          <Text className={`font-semibold text-lg `}>{points?.title}</Text>
        </View>
        <View className="w-[20%] flex justify-center items-center">
          <Ionicons
            name={
              points.qr
                ? "qr-code-outline"
                : points.checked
                ? "checkmark-circle-outline"
                : "ellipse-outline"
            }
            size={32}
            color={"green"}
          />
        </View>
      </View>
      <View className="w-full mt-1">
        <Text className={`mt-2 tracking-wider text-justify `}>
          {points?.description}
        </Text>
      </View>
    </View>
  );
};

export default CheckPointElement;
