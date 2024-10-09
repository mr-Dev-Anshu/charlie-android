import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { deviceWidth } from "../utils/dimensions";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { uploadFilesToS3 } from "../utils/uploadFileHelper";

const addHotelImg = () => {
  const [image, setImage] = useState([]);

  const { id } = useLocalSearchParams();

  console.log(id);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  const handleHotelImageUpload = async () => {
    if(!image || image.length === 0) return;
    try {
      const res = await uploadFilesToS3(image, id, "bus");
      Alert("Tour created successfully!");
      router.push(`/(admin)/tour`);
    } catch (error) {
      console.log(error);
    }
  };

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
                  height: 200,
                  borderRadius: 10,
                  marginBottom: 14,
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <Text>Selected Hotel Images</Text>
        )}
      </View>
      <View
        style={{
          width: deviceWidth,
          bottom: 32,
          position: "absolute",
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
          <View className="h-12 flex justify-center items-center border-2 border-dashed rounded-lg mb-3 border-green-600">
            <View className="flex flex-row justify-center items-center space-x-3">
              <Ionicons name="add-circle" size={20} color={"green"} />
              <Text className="text-base font-semibold text-green-600">
                Add Hotel Images
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          containerStyle={{ height: "100%" }}
          onPress={handleHotelImageUpload}
        >
          <View className="h-12 flex justify-center items-center bg-green-600 rounded-lg">
            <Text className="text-base font-semibold text-white">Proceed</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default addHotelImg;
