import { View, Text, useColorScheme } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { deviceWidth } from "../utils/dimensions";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { router } from "expo-router";

const addBusImg = () => {
  const colorScheme = useColorScheme();

  const [image, setImage] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  console.log("image--------->", image);

  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const inputTextColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "black" : "white";

  return (
    <View className="px-6 pt-6 relative h-full">
      <View className="flex justify-center items-center h-[80%] w-full border-2 border-green-600 rounded-xl">
        {image.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ padding: 5, width: "100%" }}
          >
            {image.map((img, idx) => (
              <Image
                key={idx}
                source={{ uri: img.uri }}
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 10,
                  marginBottom: 14,
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <Text className={`${textColor}`}>
            Selected Images Will be Shown here
          </Text>
        )}
      </View>
      <View
        style={{
          width: deviceWidth,
          bottom: 32,
          position: "absolute",
          paddingHorizontal: 24,
          backgroundColor: bgColor,
        }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
          <View className="h-12 flex justify-center items-center border-2 border-dashed rounded-lg mb-3 border-green-600">
            <View className="flex flex-row justify-center items-center space-x-3">
              <Ionicons name="add-circle" size={20} color={"green"} />
              <Text className="text-base font-semibold text-green-600">
                Add Bus Images
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          containerStyle={{ height: "100%" }}
          onPress={() => router.push("/addHotelImg")}
        >
          <View className="h-12 flex justify-center items-center bg-green-600 rounded-lg">
            <Text className="text-base font-semibold text-white">Proceed</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default addBusImg;
