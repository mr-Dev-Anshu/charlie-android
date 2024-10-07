import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { deviceWidth } from "../utils/dimensions";


const addTourImgs = () => {
  const colorScheme = useColorScheme();

  const [image, setImage] = useState(null);


  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const inputTextColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "black" : "white";

  return (
    <View className="px-6 pt-6 relative h-full">
      <TouchableOpacity activeOpacity={0.8}>
        <View className="h-12 flex justify-center items-center border-2 border-dashed rounded-lg mb-3 border-green-600">
          <View className="flex flex-row justify-center items-center space-x-3">
            <Ionicons name="add-circle" size={20} color={"green"} />
            <Text className="text-base font-semibold text-green-600">
              Add Tour Images
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <View className="h-12 flex justify-center items-center border-2 border-dashed rounded-lg mb-3 border-green-600">
          <View className="flex flex-row justify-center items-center space-x-3">
            <Ionicons name="add-circle" size={20} color={"green"} />
            <Text className="text-base font-semibold text-green-600">
              Add Bus Images
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <View className="h-12 flex justify-center items-center border-2 border-dashed rounded-lg mb-3 border-green-600">
          <View className="flex flex-row justify-center items-center space-x-3">
            <Ionicons name="add-circle" size={20} color={"green"} />
            <Text className="text-base font-semibold text-green-600">
              Add Hotel Images
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: deviceWidth,
          bottom: 48,
          position: "absolute",
          paddingHorizontal: 24,
          backgroundColor: bgColor,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          containerStyle={{ height: "100%" }}
        >
          <View className="h-12 flex justify-center items-center bg-green-600 rounded-lg">
            <Text className="text-base font-semibold text-white">Proceed</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default addTourImgs;
