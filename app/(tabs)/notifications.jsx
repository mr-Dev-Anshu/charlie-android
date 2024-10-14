import { View, ScrollView } from "react-native";
import React from "react";
import Notifications from "../../components/UI/Notifications";
import { StatusBar } from "expo-status-bar";

const notifications = () => {
  return (
    <View className="pt-28 h-full w-full px-3">
      <StatusBar
        style="dark"
        backgroundColor="#fff"
        translucent={true}
        animated
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 44 }}
        className="h-full w-full"
      >
        <View className="mt-1 px-4">
          <Notifications />
        </View>
      </ScrollView>
    </View>
  );
};

export default notifications;
