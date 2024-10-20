import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import LabelValue from "../components/UI/LabelValue";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import MemberCard from "../components/UI/MemberCard";
import { formatDate } from "../utils/helpers";

const profile = () => {
  const data = useSelector((state) => state.user);
  const { user, role, profile } = data;

  const router = useRouter();

  const [members, setMembers] = useState([]);

  const picture =
    user?.picture ||
    "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

    const handleGetMembers = async () => {
      if (!user?.email) {
        console.error("User email is not available.");
        return;
      }
    
      try {
        const response = await fetch(
          `https://trakies-backend.onrender.com/api/member/get-member?email=${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        const responseText = await response.text();
    
        if (!response.ok) {
          console.error("Error response:", responseText); 
          throw new Error("Failed to fetch members.");
        }
    
        const data = JSON.parse(responseText);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

  useEffect(() => {
    handleGetMembers();
  }, [members]);

  return (
    <View className="h-full w-full px-4 flex justify-center items-center relative">
      <ScrollView
        className="h-full w-full py-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 56, paddingHorizontal: 8 }}
      >
        <View>
          <Text>Personal Details</Text>
        </View>
        <LabelValue label={"Name"} value={user?.given_name} />
        <View className="mt-3 space-y-5">
          {profile ? (
            <View>
              <LabelValue
                label={"Date Of Birth"}
                value={formatDate(profile.dob)}
              />
              <LabelValue label={"Age"} value={profile.age} />
              <LabelValue label={"Gender"} value={profile.gender} />
              <LabelValue label={"Contact No"} value={profile.contact} />
              <LabelValue
                label={"Identity Proof Type"}
                value={profile.id_type}
              />
              <LabelValue
                label={"Identity Proof Number"}
                value={profile.id_number}
              />
              <LabelValue label={"Address"} value={profile.address} />
              <LabelValue
                label={"How You Know About Us ?"}
                value={profile.Ganesh}
              />
              <LabelValue
                label={"Emergency Contact No ?"}
                value={profile.emergency_contact}
              />
            </View>
          ) : (
            <View className="w-full h-[100px] flex justify-center items-center space-y-5">
              <Text className="text-base font-semibold text-green-700 ">
                You haven't created your profile yet !
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/editProfile")}
                style={{
                  backgroundColor: "red",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-base font-bold">
                  Create Profile
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View>
            {members.length !== 0 ? (
              <>
                {members.map((mem, index) => (
                  <MemberCard data={mem} key={index} />
                ))}
              </>
            ) : (
              <View className="w-full flex justify-center items-center border border-slate-500/50 rounded-lg p-2">
                <Text>No Members</Text>
              </View>
            )}
          </View>
          <View className="flex justify-center items-center w-full px-6">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/addMember")}
            >
              <View className="flex justify-center items-center flex-row w-[165px] border py-2 rounded-xl">
                <Ionicons name="add-outline" size={16} color={"green"} />
                <Text className="text-green-600 text-base ml-3">
                  Add Member
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/updateProfile")}
            >
              <View className="flex justify-center items-center flex-row w-[165px] mt-2 border py-2 rounded-xl">
                <Text className="text-green-600 text-base ml-3">
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
            {role && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/(admin)/tours")}
              >
                <View className="flex justify-center items-center flex-row w-[165px] mt-2 border py-2 rounded-xl">
                  <Text className="text-green-600 text-base ml-3">
                    Admin Screen
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default profile;
