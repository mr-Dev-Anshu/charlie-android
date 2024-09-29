import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
              <Text className="text-base font-semibold tracking-wider text-red-600">
                {error}
              </Text>
            </View>
          )}
          <View className="w-full py-2">
            <TextInput
              placeholder="Tour Name"
              value={tourName}
              onChangeText={setTourName}
              className="border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 "
            />
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              className="border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3"
            />
            <TextInput
              placeholder="Start Date"
              value={location}
              onChangeText={setLocation}
              className="border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3"
            />
            <TextInput
              placeholder="End Date"
              value={location}
              onChangeText={setLocation}
              className="border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3"
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              className="border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 h-24"
            />
            <TextInput
              placeholder="Persons Allowed"
              value={personsAllowed}
              onChangeText={setPersonsAllowed}
              keyboardType="numeric"
              className="border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3"
            />
            <TextInput
              placeholder="Cost Per Person"
              value={costPerPerson}
              onChangeText={setCostPerPerson}
              keyboardType="numeric"
              className="border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3"
            />
            <TextInput
              placeholder="Tour Type (e.g. Easy, Medium, Hard)"
              value={tourType}
              onChangeText={setTourType}
              className="border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3"
            />
            <TextInput
              placeholder="Distance (optional)"
              keyboardType="numeric"
              className="border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3"
            />
            <View className="flex-row justify-between items-center w-full mb-3 border-2 py-1 rounded-lg px-2 border-green-600">
              <Text className="text-lg font-semibold">
                Admin Can Reject Booking ?
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
              <Text className="text-lg font-semibold">
                Payment Gateway Enabled ?
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
      <View className="bg-white w-full py-2 flex-row justify-between bottom-6 space-x-3 ">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
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
