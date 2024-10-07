import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "galio-framework";
import { router } from "expo-router";

const addTours = () => {
  const [error, setError] = useState("");
  const [tourName, setTourName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [personsAllowed, setPersonsAllowed] = useState("");
  const [costPerPerson, setCostPerPerson] = useState("");
  const [adminCanReject, setAdminCanReject] = useState(false);
  const [paymentGatewayEnabled, setPaymentGatewayEnabled] = useState(false);
  const [tourType, setTourType] = useState("");

  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const inputTextColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "bg-black" : "bg-white";

  return (
    <View className="h-full w-full px-6">
      <ScrollView
        className="h-full w-full py-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 44 }}
      >
        <View className="flex justify-center items-center ">
          {error && (
            <View className="flex flex-row justify-center items-center space-x-3 h-6">
              <Ionicons name="warning" size={24} color={"red"} />
              <Text
                className={`text-base font-semibold tracking-wider text-red-600`}
              >
                {error}
              </Text>
            </View>
          )}
          <View className="w-full py-2">
            <TextInput
              placeholder="Tour Name"
              value={tourName}
              placeholderTextColor={"gray"}
              onChangeText={setTourName}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 ${textColor}`}
              style={{ color: inputTextColor }}
            />
            <TextInput
              placeholder="Location"
              value={location}
              placeholderTextColor={"gray"}
              onChangeText={setLocation}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 ${textColor}`}
              style={{ color: inputTextColor }}
            />
            <TextInput
              placeholder="Start Date"
              value={location}
              placeholderTextColor={"gray"}
              onChangeText={setLocation}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 ${textColor}`}
              style={{ color: inputTextColor }}
            />
            <TextInput
              placeholder="End Date"
              value={location}
              placeholderTextColor={"gray"}
              onChangeText={setLocation}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 ${textColor}`}
              style={{ color: inputTextColor }}
            />
            <TextInput
              placeholder="Description"
              value={description}
              placeholderTextColor={"gray"}
              onChangeText={setDescription}
              multiline
              className={`border-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 flex justify-start items-start h-24 ${textColor}`}
              style={{ color: inputTextColor }}
            />
            <TextInput
              placeholder="Persons Allowed"
              value={personsAllowed}
              placeholderTextColor={"gray"}
              onChangeText={setPersonsAllowed}
              keyboardType="numeric"
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 ${textColor}`}
              style={{ color: inputTextColor }}
            />
            <TextInput
              placeholder="Cost Per Person"
              value={costPerPerson}
              placeholderTextColor={"gray"}
              onChangeText={setCostPerPerson}
              keyboardType="numeric"
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 ${textColor}`}
              style={{ color: inputTextColor }}
            />
            <TextInput
              placeholder="Tour Type (e.g. Easy, Medium, Hard)"
              value={tourType}
              placeholderTextColor={"gray"}
              onChangeText={setTourType}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 ${textColor}`}
              style={{ color: inputTextColor }}
            />
            <TextInput
              placeholder="Distance (optional)"
              keyboardType="numeric"
              placeholderTextColor={"gray"}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 ${textColor}`}
              style={{ color: inputTextColor }}
            />
            <View className="flex-row justify-between items-center w-full mb-3 border-2 py-1 rounded-lg px-2 border-green-600">
              <Text className={`text-lg font-semibold ${textColor}`}>
                Admin Can Reject Booking?
              </Text>
              <View style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}>
                <Switch
                  trackColor={"green"}
                  value={adminCanReject}
                  onChange={() => setAdminCanReject(!adminCanReject)}
                  ios_backgroundColor={"gray"}
                />
              </View>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3 border-2 py-1 rounded-lg px-2 border-green-600">
              <Text className={`text-lg font-semibold ${textColor}`}>
                Payment Gateway Enabled?
              </Text>
              <View style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}>
                <Switch
                  trackColor={"green"}
                  value={paymentGatewayEnabled}
                  onChange={() =>
                    setPaymentGatewayEnabled(!paymentGatewayEnabled)
                  }
                  ios_backgroundColor={"gray"}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        className={`${bgColor} w-full py-2 flex-row justify-between bottom-6 space-x-3 `}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          className="flex-1"
        >
          <View className="bg-gray-500 py-2 rounded-lg">
            <Text className="text-center text-white font-bold text-lg">
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/addTourImgs")}
          className="flex-1"
        >
          <View className="bg-green-600 py-2 rounded-lg">
            <Text className="text-center text-white font-bold text-lg">
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default addTours;
