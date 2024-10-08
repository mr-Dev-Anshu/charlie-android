import { View, Text, ScrollView, useColorScheme } from "react-native";
import React, { useRef } from "react";
import Announcement from "../../components/UI/Announcement";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

const announcement = () => {
  const addAnnounceMentRef = useRef(null);

  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const bgColor = colorScheme === "dark" ? "bg-black" : "bg-white";
  const accentBgColor = colorScheme === "dark" ? "bg-gray-800" : "bg-white";

  return (
    <>
      <View className=" mt-14 h-full w-full">
        <View className=" flex justify-center items-center py-1 ">
          <Text className="text-lg font-semibold text-green-800">
            Announcements
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 10 }}
        >
          <View className="mt-1">
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
          </View>
        </ScrollView>
      </View>
      <View
        className={`bottom-28 pb-2 ${bgColor} w-full flex justify-center items-center px-2`}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => addAnnounceMentRef?.current?.open()}
          containerStyle={{
            width: "100%",
            height: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#06992d",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <View className="flex flex-row justify-center items-center space-x-4">
            <Ionicons name="megaphone-outline" size={20} color={"white"} />
            <Text className="text-white text-lg font-semibold">
              New Announcements
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modalize ref={addAnnounceMentRef} modalHeight={600}>
        <View>
          <Text>Hello</Text>
        </View>
      </Modalize>
    </>
  );
};

export default announcement;
