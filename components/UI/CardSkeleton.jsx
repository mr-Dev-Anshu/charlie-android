import { View, Text } from "react-native";
import React from "react";

const CardSkeleton = () => {
  return (
    <View
      className={`h-[430px] w-72 rounded-xl relative ml-8  space-y-2 bg-white shadow-xl shadow-black/70`}
    >
      <View className="h-44 bg-slate-300 rounded-t-xl " />
      <View className="h-16 rounded-xl bg-slate-300 mx-2" />
      <View className="h-8 rounded-xl bg-slate-300 mx-2" />
      <View className="h-6 rounded-xl bg-slate-300 mx-2" />
      <View className="h-5 rounded-xl bg-slate-300 mx-2" />
      <View className="h-5 rounded-xl bg-slate-300 mx-2" />
      <View className="h-12 bg-slate-300 mx-10 rounded-2xl absolute -bottom-6 z-50 left-0 right-0 " />
    </View>
  );
};

export default CardSkeleton;
