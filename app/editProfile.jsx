import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from "react-native";
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
  const [genders] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]);

  const [idProofOpen, setIdProofOpen] = useState(false);
  const [idProofType, setIdProofType] = useState(null);
  const [idProofTypes] = useState([
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

  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "#fff" : "#000";
  const placeholderColor = "gray";

  return (
    <View
      style={{
        backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom:24 }}>
        <View className="w-full px-8">
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
              placeholder="Enter Name"
              textContentType="name"
              autoCapitalize="words"
              onChangeText={setName}
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={name}
              style={{ color: textColor }}
            />
            <TextInput
              placeholder="Enter Date of Birth (YYYY-MM-DD)"
              keyboardType="default"
              onChangeText={setDob}
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={dob}
              style={{ color: textColor }}
            />
            <TextInput
              placeholder="Enter Age"
              keyboardType="numeric"
              onChangeText={setAge}
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={age}
              style={{ color: textColor }}
            />
            <TextInput
              placeholder="Gender"
              keyboardType="default"
              onChangeText={setGender}
              autoCapitalize="words"
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={gender}
              style={{ color: textColor }}
            />
            <TextInput
              placeholder="Enter Contact Number"
              keyboardType="phone-pad"
              onChangeText={setContact}
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={contact}
              style={{ color: textColor }}
            />
            <TextInput
              placeholder="Enter Emergency Contact Number"
              keyboardType="phone-pad"
              onChangeText={setEmergencyContact}
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={emergencyContact}
              style={{ color: textColor }}
            />
            <TextInput
              placeholder="Enter Address"
              onChangeText={setAddress}
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={address}
              style={{ color: textColor }}
            />
            <TextInput
              placeholder="Enter Id Proof Name"
              onChangeText={setIdProofType}
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={idProofType}
              style={{ color: textColor }}
            />
            <TextInput
              placeholder="Enter Id Proof Number"
              onChangeText={setIdentityProofNumber}
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={identityProofNumber}
              style={{ color: textColor }}
            />
            <TextInput
              placeholder="How do you know about us?"
              onChangeText={setInfo}
              className="text-lg font-semibold w-full mt-3 indent-3 border border-green-600 rounded-[10px] p-2"
              placeholderTextColor={placeholderColor}
              value={info}
              style={{ color: textColor }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Buttons Container */}
      <View className="fixed bottom-0 w-full px-10">
        <TouchableOpacity
          onPress={handleUpdate}
          className="py-3 flex justify-center items-center bg-[#228B22] w-full rounded-[10px]"
        >
          {loading ? (
            <ActivityIndicator size={24} color="#00ff00" />
          ) : (
            <Text
              className="text-center font-bold text-lg"
              style={{ color: textColor }}
            >
              Update Profile
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-full py-2 px-2 rounded-[10px] border-2 border-[#228B22] mt-3"
          activeOpacity={0.8}
        >
          <Text
            className="text-center font-bold text-lg"
            style={{ color: textColor }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
