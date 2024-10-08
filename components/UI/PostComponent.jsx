import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

const PostComponent = ({ post }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push("/postdetails/2")}
    >
      <View
        className={`h-44 mb-4 px-2 py-2 shadow-sm shadow-black/30 rounded-lg `}
      >
        <Text className={`h-10 `}>{shorten(post?.description, 100)}</Text>
        <View className="flex flex-row w-full justify-around mt-2">
          {post?.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              className="h-[80px] w-[80px] rounded-xl"
            />
          ))}
        </View>
        <View className="mt-2 flex flex-row justify-start items-center space-x-2">
          <Text className={`text-xs font-semibold tracking-wider `}>
            Kumar Harsh
          </Text>
          <View className="h-1.5 w-1.5 bg-gray-400 rounded-full" />
          <Text className={`text-xs font-semibold tracking-wider `}>
            Jan 23, 2024
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const shorten = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

export default PostComponent;
