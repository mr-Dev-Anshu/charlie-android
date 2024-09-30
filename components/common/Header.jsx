import { View, Text, Touchable, useColorScheme } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { Image } from "expo-image";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

const Header = () => {
  const colorScheme = useColorScheme();
  const themeColor = colorScheme === "dark" ? "bg-gray-800" : "bg-white";
  const data = useSelector((state) => state.user);
  const { user } = data;

  const picture =
    user?.picture ||
    "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

  const handleProfilePress = () => {
    if (user == null) {
      router.push("/(admin)/tours");
      return;
    }
    router.push("/profile");
  };

  return (
    <View className="absolute mt-[50px] w-full px-2 h-[60px] shadow-xl shadow-black ">
      <View
        className={`${themeColor} h-full py-3 flex justify-between items-center flex-row rounded-xl px-4 `}
      >
        <TouchableOpacity
          onPress={() => router.push("/")}
          activeOpacity={0.6}
          className="flex flex-row space-x-2 justify-center items-start"
        >
          <FontAwesome6 name="person-hiking" size={32} color="green" />
          <Text className="text-3xl tracking-widest font-semibold text-green-700">
            Trekies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress} activeOpacity={0.7}>
          <View className="h-12 w-12 rounded-full border-2 border-green-700 p-0.5 ">
            <Image
              source={{ uri: picture }}
              className="h-full w-full rounded-full"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
