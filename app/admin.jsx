import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import adminicon from "../assets/admin.png";
import { Image } from "expo-image";
import Button from "react-native-button";
import { router } from "expo-router";

const admin = () => {
  const { role } = useSelector((state) => state.user);

  return (
    <View className="px-2 ">
      <View>
        {role === "superadmin" && (
          <View className="flex flex-row justify-between items-center ">
            <View className="bg-green-600 w-[200px] h-12 flex justify-center items-center rounded-lg">
              <Button onPress={() => router.push("/addRoles")}>
                <Text className="text-white font-semibold text-lg"> 
                  Add Roles
                </Text>
              </Button>
            </View>
            <View className="bg-green-600 w-[200px] h-12 flex justify-center items-center rounded-lg">
              <Button onPress={() => router.push("/addTours")}>
                <Text className="text-white font-semibold text-lg">
                  Add Tours
                </Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default admin;
