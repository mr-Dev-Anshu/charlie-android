import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/slices/userSlice";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditProfile = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
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

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setDob(currentDate);
  };

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
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/users/createProfile`,
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
      Alert.alert("Success", `Profile Created!`);
      router.push("/profile");
    } catch (error) {
      console.log(error?.message);
      setError("An error occurred. Please try again.");
    } finally {
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
              placeholder="Enter Name"
              textContentType="name"
              autoCapitalize="words"
              onChangeText={setName}
              className="text-lg  w-full mt-3 indent-3 border border-slate-500/50 rounded-[10px] p-2"
              value={name}
            />
            <View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                editable={false}
                className={`border py-3 mt-3 w-full border-slate-500/50 rounded-lg text-black placeholder:text-base  px-3 `}
                value={dob && format(dob, "yyyy-MM-dd")}
                placeholder={"Enter Date of Birth"}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={onChangeStart}
              />
            )}
          </View>
            <TextInput
              placeholder="Enter Age"
              keyboardType="numeric"
              onChangeText={setAge}
              className="text-lg  w-full mt-3 indent-3 border border-slate-500/50 rounded-[10px] p-2"
              value={age}
            />
            <TextInput
              placeholder="Gender"
              keyboardType="default"
              onChangeText={setGender}
              autoCapitalize="words"
              className="text-lg  w-full mt-3 indent-3 border border-slate-500/50 rounded-[10px] p-2"
              value={gender}
            />
            <TextInput
              placeholder="Enter Contact Number"
              keyboardType="phone-pad"
              onChangeText={setContact}
              className="text-lg  w-full mt-3 indent-3 border border-slate-500/50 rounded-[10px] p-2"
              value={contact}
            />
            <TextInput
              placeholder="Enter Emergency Contact Number"
              keyboardType="phone-pad"
              onChangeText={setEmergencyContact}
              className="text-lg  w-full mt-3 indent-3 border border-slate-500/50 rounded-[10px] p-2"
              value={emergencyContact}
            />
            <TextInput
              placeholder="Enter Address"
              onChangeText={setAddress}
              className="text-lg  w-full mt-3 indent-3 border border-slate-500/50 rounded-[10px] p-2"
              value={address}
            />
            <TextInput
              placeholder="Enter Id Proof Name"
              onChangeText={setIdProofType}
              className="text-lg  w-full mt-3 indent-3 border border-slate-500/50 rounded-[10px] p-2"
              value={idProofType}
            />
            <TextInput
              placeholder="Enter Id Proof Number"
              onChangeText={setIdentityProofNumber}
              className="text-lg  w-full mt-3 indent-3 border border-slate-500/50 rounded-[10px] p-2"
              value={identityProofNumber}
            />
            <TextInput
              placeholder="How do you know about us?"
              onChangeText={setInfo}
              className="text-lg  w-full mt-3 indent-3 border border-slate-500/50 rounded-[10px] p-2"
              value={info}
            />
          </View>
        </View>
      </ScrollView>
      <View className="fixed bottom-4 w-full px-10">
        <TouchableOpacity
          onPress={handleUpdate}
          className="py-2 flex justify-center items-center bg-[#228B22] w-full rounded-[10px]"
        >
          {loading ? (
            <ActivityIndicator size={24} color="#00ff00" />
          ) : (
            <Text className="text-center text-lg">Create Profile</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          className="w-full py-2 px-2 rounded-[10px] border border-[#228B22] mt-3"
          activeOpacity={0.8}
        >
          <Text className="text-center font-bold text-lg">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
