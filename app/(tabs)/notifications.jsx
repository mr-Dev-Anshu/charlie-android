import { View, Text, ScrollView } from "react-native";
import React from "react";
import Notifications from "../../components/UI/Notifications";

const notifications = () => {
  return (
    <View className="pt-28 h-full w-full px-6">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 44 }}
        className="h-full w-full"
      >
        <View className="mt-1">
          <Notifications />
          <Notifications />
          <Notifications />
          <Notifications />
          <Notifications />
          <Notifications />
          <Notifications />
          <Notifications />
          <Notifications />
          <Notifications />
          <Notifications />
        </View>
      </ScrollView>
    </View>
  );
};

export default notifications;
