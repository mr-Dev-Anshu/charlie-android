import { View, Text, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/slices/userSlice";

const UpdateProfile = () => {
  const router = useRouter();

  const data = useSelector((state) => state.user);
  const { user, profile } = data;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [address, setAddress] = useState("");
  const [identityProofNumber, setIdentityProofNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState(null);
  const [idProofType, setIdProofType] = useState(null);

  const handleUpdate = async () => {
    setError("");
    if (
      !name &&
      !dob &&
      !age &&
      !gender &&
      !contact &&
      !emergencyContact &&
      !address &&
      !idProofType &&
      !identityProofNumber
    ) {
      setError("You haven't changed any field !");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "https://trakies-backend.onrender.com/api/users/updateProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user?.email,
            name,
            dob,
            age,
            gender,
            contact,
            emergency_contact: emergencyContact,
            address,
            id_type: idProofType,
            id_number: identityProofNumber,
            Ganesh: info,
          }),
        }
      );
      const profileData = await res.json();
      dispatch(setProfile(profileData));
      setLoading(false);
      Alert.alert(
        "Success",
        `Profile ${profile ? "updated" : "created"} successfully`
      );
      router.push("/profile");
    } catch (error) {
      console.log(error?.message);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}>
        <View className="w-full px-4">
          {error && (
            <View className="h-6">
              <View className="flex flex-row justify-center items-center space-x-2">
                <Ionicons name="warning-outline" size={24} color="red" />
                <Text
                  style={{ color: "red" }}
                  className="text-lg font-bold text-center"
                >
                  {error}
                </Text>
              </View>
            </View>
          )}
          <View>
            <TextInput
              placeholder={user.name}
              textContentType="name"
              autoCapitalize="words"
              onChangeText={setName}
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
            />
            <TextInput
              placeholder={profile.dob}
              keyboardType="default"
              onChangeText={setDob}
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
            />
            <TextInput
              placeholder={profile.age}
              keyboardType="numeric"
              onChangeText={setAge}
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
            />
            <TextInput
              placeholder={profile.gender}
              keyboardType="default"
              onChangeText={setGender}
              autoCapitalize="words"
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
            />
            <TextInput
              placeholder={profile.contact}
              keyboardType="phone-pad"
              onChangeText={setContact}
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
            />
            <TextInput
              placeholder={profile.emergency_contact}
              keyboardType="phone-pad"
              onChangeText={setEmergencyContact}
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
              value={emergencyContact}
            />
            <TextInput
              placeholder={profile.address}
              onChangeText={setAddress}
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
              value={address}
            />
            <TextInput
              placeholder={profile.id_type}
              onChangeText={setIdProofType}
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
            />
            <TextInput
              placeholder={profile.id_number}
              onChangeText={setIdentityProofNumber}
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
            />
            <TextInput
              placeholder="How do you know about us?"
              onChangeText={setInfo}
              className="text-lg font-semibold w-full mt-3 indent-3 border-2 border-green-600 rounded-[10px] p-2"
            />
          </View>
        </View>
      </ScrollView>
      <View className="fixed bottom-4 w-full px-10">
        <TouchableOpacity
          onPress={handleUpdate}
          className="py-3 flex justify-center items-center bg-[#228B22] w-full rounded-[10px]"
        >
          {loading ? (
            <ActivityIndicator size={24} color="#00ff00" />
          ) : (
            <Text className="text-center font-bold text-lg">
              Update Profile
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-full py-2 px-2 rounded-[10px] border-2 border-[#228B22] mt-3"
          activeOpacity={0.8}
        >
          <Text className="text-center font-bold text-lg">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateProfile;
