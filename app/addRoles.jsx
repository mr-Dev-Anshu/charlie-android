import { View, Text, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

const addRoles = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [roles, setRoles] = useState([
    { label: "Admin", value: "admin" },
    { label: "Coordinator", value: "coordinator" },
  ]);

  const handleLogin = async () => {
    setError("");
    if (!value || !email) {
      setError("Please select a role and enter email");
      return;
    }
    setLoading(true);
    try {
      const data = await fetch(
        "https://trakies-backend.onrender.com/api/users/signup",
        { email, role: value }
      );
      setLoading(false);
      setEmail("");
      setValue(null);
      Alert.alert("Success", "Role added successfully");
    } catch (error) {
      console.log(error?.message);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <View className="h-full w-full">
      <View className="absolute top-0 left-0 h-full w-full">
        <Image
          className="h-full w-full"
          source="https://images.pexels.com/photos/27377328/pexels-photo-27377328/free-photo-of-people-walking-down-a-steep-hill-in-the-jungle.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
      </View>
      <View className="w-full h-full bg-black/60 flex justify-center items-center space-y-10">
        <View>
          <Text className="text-white text-5xl font-bold text-center mt-10">
            Trekies.
          </Text>
        </View>
        <View className="z-50 w-full px-12">
          <View className="h-12">
            {error && (
              <View className="flex justify-center items-center space-x-5">
                <Ionicons name="warning-outline" size={24} color="red" />
                <Text className="text-lg font-bold text-red-700 text-center">
                  {error}
                </Text>
              </View>
            )}
          </View>
          <View className="mt-5">
            <DropDownPicker
              open={open}
              value={value}
              items={roles}
              textStyle={{ color: "white", fontWeight: "bold" }}
              dropDownContainerStyle={{ backgroundColor: "green" }}
              badgeStyle={{ backgroundColor: "green" }}
              tickIconStyle={{ color: "white" }}
              arrowIconStyle={{ color: "white" }}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setRoles}
              className="bg-[#228B22]"
            />
            <TextInput
              placeholder="Enter Email"
              textContentType="emailAddress"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(newText) => setEmail(newText)}
              className="text-white text-base font-semibold lowercase w-full mt-5 outline outline-2 outline-green-700 indent-3 border border-green-700 rounded-[10px] p-2"
              placeholderTextColor={"white"}
              defaultValue={email}
            />
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            className="py-3 flex justify-center items-center mt-10 bg-[#228B22] w-full rounded-[10px]"
          >
            {loading ? (
              <ActivityIndicator size={24} color="#00ff00" />
            ) : (
              <Text className="text-white text-center font-bold text-lg">
                Proceed
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-full py-2 px-2 rounded-[10px] border-2 border-[#228B22] mt-5 text-white"
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-bold text-lg">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default addRoles;
