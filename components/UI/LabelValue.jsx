import { View, Text } from "react-native";
import React from "react";

const LabelValue = ({ label, value }) => {
  return (
    <View className="shadow-sm shadow-black/20 w-full mt-3 bg-white rounded-md py-2 px-2 space-y-1 ">
      <Text className=" text-xs text-gray-600  ">{label}</Text>
      <Text className="text-lg">{value}</Text>
    </View>
  );
};

export default LabelValue;
