import { View, Text } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const MemberCard = ({ data }) => {
  return (
    <View className="h-48 w-full mt-4 bg-white shadow-sm shadow-black/20 rounded-lg p-2 space-y-3 justify-center items-end ">
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["rgba(10, 92, 18, 1)", "rgba(255, 255, 255, 1)"]}
        className="rounded-l-full w-full overflow-hidden"
      >
        <View className="flex flex-row justify-between items-center rounded-l-full px-1 py-1 w-full">
          <View className="flex flex-row">
            <View className="border-2 border-white h-12 w-12 rounded-full overflow-hidden">
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/3217911/pexels-photo-3217911.jpeg?auto=compress&cs=tinysrgb&w=500",
                }}
                className="w-full h-full rounded-full"
              />
            </View>
            <View className="w-[50%] ml-4">
              <Text className="font-semibold text-xs text-white/70">Name</Text>
              <Text className="font-bold text-lg text-white">{data.name}</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <Ionicons name="trash-outline" color={"red"} size={24} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View className="w-[300px]">
        <View className="flex flex-row justify-between items-center">
          <View className="w-[50%] ">
            <Text className="font-semibold text-sm text-slate-500/70">
              Age(Yr)
            </Text>
            <Text className="font-semibold text-base">{data.age}</Text>
          </View>
          <View className=" w-[50%]">
            <Text className="font-semibold text-sm text-slate-500/70">
              Gender
            </Text>
            <Text className="font-semibold text-base">{data.gender}</Text>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center mt-2">
          <View className="w-[50%] ">
            <Text className="font-semibold text-sm text-slate-500/70">
              Relation
            </Text>
            <Text className="font-semibold text-base">{data.relation}</Text>
          </View>
          <View className="w-[50%] ">
            <Text className="font-semibold text-sm text-slate-500/70">
              Contact No.
            </Text>
            <Text className="font-semibold text-base">{data.contact}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MemberCard;
