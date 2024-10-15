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
import { formatDate } from "../utils/helpers";

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
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 16 }}>
          {error && (
            <View style={{ paddingVertical: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 10,
                }}
              >
                <Ionicons name="warning-outline" size={20} color="red" />
                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {error}
                </Text>
              </View>
            </View>
          )}
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              paddingVertical: 5,
            }}
          >
            Enter New Values
          </Text>
          <TextInput
            placeholder={user.name}
            textContentType="name"
            autoCapitalize="words"
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder={formatDate(profile.dob)}
            keyboardType="default"
            onChangeText={setDob}
            style={styles.input}
          />
          <TextInput
            placeholder={profile.age}
            keyboardType="numeric"
            onChangeText={setAge}
            style={styles.input}
          />
          <TextInput
            placeholder={profile.gender}
            keyboardType="default"
            onChangeText={setGender}
            autoCapitalize="words"
            style={styles.input}
          />
          <TextInput
            placeholder={profile.contact}
            keyboardType="phone-pad"
            onChangeText={setContact}
            style={styles.input}
          />
          <TextInput
            placeholder={profile.emergency_contact}
            keyboardType="phone-pad"
            onChangeText={setEmergencyContact}
            style={styles.input}
          />
          <TextInput
            placeholder={profile.address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <TextInput
            placeholder={profile.id_type}
            onChangeText={setIdProofType}
            style={styles.input}
          />
          <TextInput
            placeholder={profile.id_number}
            onChangeText={setIdentityProofNumber}
            style={styles.input}
          />
          <TextInput
            placeholder="How do you know about us?"
            onChangeText={setInfo}
            style={styles.input}
          />
        </View>
      </ScrollView>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 24,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={handleUpdate}
          style={{
            backgroundColor: "#228B22",
            padding: 12,
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Update Profile
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 10,
            padding: 8,
            borderRadius: 10,
            borderColor: "#228B22",
            borderWidth: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#228B22" }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  input: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
  },
};

export default UpdateProfile;
