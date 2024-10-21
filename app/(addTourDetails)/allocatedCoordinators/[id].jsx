import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Checkbox } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import qr from "../../../assets/qr.png";
import share from "../../../assets/share.svg";
import download from "../../../assets/downloadIcon.svg";

const AllocatedCoordinators = () => {
  return (
    <View className="h-full w-full flex justify-between px-3">
      <View className="w-full">
        <View className="flex justify-center items-center mt-4">
          <Text className="text-xl font-semibold">Srishailm Trek</Text>
        </View>
        <View className="flex justify-center items-center">
          <View className="py-5">
            <Image source={qr} className="h-52 w-52" />
          </View>
        </View>
        <View className="flex flex-row justify-between items-center w-full px-6 mt-2">
          <View className="flex flex-row justify-center items-center">
            <Image source={share} className="h-5 w-5" />
            <Text className="text-base pl-3">Share QR Code</Text>
          </View>
          <View className="flex flex-row justify-center items-center">
            <Image source={download} className="h-5 w-5" />
            <Text className="text-base pl-3">Download QR Code</Text>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center mt-4 px-3">
          <Text>Total Expense</Text>
          <Text>x 2 seats</Text>
          <Text>4000</Text>
        </View>
        <View className="flex justify-center items-center mt-4 w-full">
          <Text>Please Upload screenshot post payment</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            containerStyle={{ flexGrow: 1, width: "100%" }}
          >
            <View className="border h-32 w-full rounded-xl mt-1 border-green-600 flex justify-center items-center">
              <Text className="text-green-800">Upload your payment proof</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row w-full mt-4 justify-center items-center">
          <View className="w-[10%]">
            <Checkbox />
          </View>
          <Text className="w-[90%] tracking-wide text-base text-justify">
            I hereby agree to sign digital consent and agrees to all Terms and
            Conditions,
          </Text>
        </View>
        <View className="flex flex-row mt-4 justify-start items-center">
          <Image source={download} className="h-5 w-5" />
          <Text className="pl-3 text-base text-green-700">
            View and download consent form.
          </Text>
        </View>
      </View>
      <View className="w-full flex flex-row justify-between items-center h-16 bg-transparent">
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 165,
            backgroundColor: "#414141",
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 165,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "green",
          }}
        >
          <Text style={{ textAlign: "center", color: "green" }}>
            Reserve Seat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllocatedCoordinators;
