import { View, Text, ActivityIndicator, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/slices/userSlice";

const EditProfile = () => {
  const router = useRouter();
  const { user, profile } = useSelector((state) => state.user);
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

  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [genders, setGenders] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]);

  const [idProofOpen, setIdProofOpen] = useState(false);
  const [idProofType, setIdProofType] = useState(null);
  const [idProofTypes, setIdProofTypes] = useState([
    { label: "Aadhar", value: "aadhar" },
    { label: "PAN", value: "pan" },
    { label: "Licence", value: "licence" },
  ]);

  const url = profile
    ? "https://trakies-backend.onrender.com/api/users/updateProfile"
    : "https://trakies-backend.onrender.com/api/users/createProfile";

  const handleUpdate = async () => {
    setError("");
    if (
      !name ||
      !user.email ||
      !dob ||
      !age ||
      !gender ||
      !contact ||
      !emergencyContact ||
      !address ||
      !idProofType ||
      !identityProofNumber
    ) {
      setError("Please fill in all the fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(url, {
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
      });
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
    <View className="w-full h-full flex justify-start items-center relative">
      <View className="w-full px-8">
        {error && (
          <View className="h-6">
            <View className="flex flex-row justify-center items-center space-x-2">
              <Ionicons name="warning-outline" size={24} color="red" />
              <Text className="text-lg font-bold text-red-600 text-center">
                {error}
              </Text>
            </View>
          </View>
        )}
        <View>
          <TextInput
            placeholder="Enter Name"
            textContentType="name"
            autoCapitalize="words"
            onChangeText={setName}
            className=" text-lg font-semibold w-full mt-3   indent-3 border border-green-600 rounded-[10px] p-2"
            placeholderTextColor={"#8a8a8a"}
            value={name}
          />
          <TextInput
            placeholder="Enter Date of Birth (YYYY-MM-DD)"
            keyboardType="default"
            onChangeText={setDob}
            className=" text-lg font-semibold w-full mt-3   indent-3 border border-green-600 rounded-[10px] p-2"
            placeholderTextColor={"#8a8a8a"}
            value={dob}
          />
          <TextInput
            placeholder="Enter Age"
            keyboardType="numeric"
            onChangeText={setAge}
            className=" text-lg font-semibold w-full mt-3   indent-3 border border-green-600 rounded-[10px] p-2"
            placeholderTextColor={"#8a8a8a"}
            value={age}
          />
          <DropDownPicker
            open={genderOpen}
            value={gender}
            items={genders}
            placeholder="Select Gender"
            textStyle={{ color: "white", fontWeight: "bold" }}
            dropDownContainerStyle={{
              backgroundColor: "green",
              borderColor: "green",
            }}
            setOpen={setGenderOpen}
            setValue={setGender}
            setItems={setGenders}
            className="bg-[#228B22] mt-3 border-0"
          />
          <TextInput
            placeholder="Enter Contact Number"
            keyboardType="phone-pad"
            onChangeText={setContact}
            className=" text-lg font-semibold w-full mt-3   indent-3 border border-green-600 rounded-[10px] p-2"
            placeholderTextColor={"#8a8a8a"}
            value={contact}
          />
          <TextInput
            placeholder="Enter Emergency Contact Number"
            keyboardType="phone-pad"
            onChangeText={setEmergencyContact}
            className=" text-lg font-semibold w-full mt-3   indent-3 border border-green-600 rounded-[10px] p-2"
            placeholderTextColor={"#8a8a8a"}
            value={emergencyContact}
          />
          <TextInput
            placeholder="Enter Address"
            onChangeText={setAddress}
            className=" text-lg font-semibold w-full mt-3   indent-3 border border-green-600 rounded-[10px] p-2"
            placeholderTextColor={"#8a8a8a"}
            value={address}
          />
          <DropDownPicker
            open={idProofOpen}
            value={idProofType}
            items={idProofTypes}
            placeholder="Select Identity Proof Type"
            textStyle={{ color: "white", fontWeight: "bold" }}
            dropDownContainerStyle={{
              backgroundColor: "green",
              borderColor: "green",
            }}
            setOpen={setIdProofOpen}
            setValue={setIdProofType}
            setItems={setIdProofTypes}
            className="bg-[#228B22] mt-3 border-0"
          />
          <TextInput
            placeholder="Enter Identity Proof Number"
            onChangeText={setIdentityProofNumber}
            className=" text-lg font-semibold w-full mt-3   indent-3 border border-green-600 rounded-[10px] p-2"
            placeholderTextColor={"#8a8a8a"}
            value={identityProofNumber}
          />
          <TextInput
            placeholder="How do you know about us ?"
            onChangeText={setInfo}
            className=" text-lg font-semibold w-full mt-3   indent-3 border border-green-600 rounded-[10px] p-2"
            placeholderTextColor={"#8a8a8a"}
            value={info}
          />
        </View>
      </View>
      <View className="absolute bottom-10 w-full px-10">
        <TouchableOpacity
          onPress={handleUpdate}
          className="py-3 flex justify-center items-center  bg-[#228B22] w-full rounded-[10px]"
        >
          {loading ? (
            <ActivityIndicator size={24} color="#00ff00" />
          ) : (
            <Text className=" text-center font-bold text-lg text-white">
              Update Profile
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-full py-2 px-2 rounded-[10px] border-2 border-[#228B22] mt-3 "
          activeOpacity={0.8}
        >
          <Text className=" text-center font-bold text-lg">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
