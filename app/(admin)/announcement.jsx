import { View, Text, ScrollView } from "react-native";
import React, { useRef } from "react";
import Announcement from "../../components/UI/Announcement";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

const announcement = () => {
  const addAnnounceMentRef = useRef(null);
  return (
    <>
      <View className=" mt-14 h-full w-full px-6">
        <View className=" flex justify-center items-center py-1 ">
          <Text className="text-lg font-semibold text-green-800">
            Announcements
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
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
      <View className="bottom-28 h-16 bg-white w-full justify-start items-center px-6">
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
            paddingHorizontal: 40,
            borderRadius: 10,
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