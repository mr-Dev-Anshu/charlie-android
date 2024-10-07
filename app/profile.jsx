import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import LabelValue from "../components/UI/LabelValue";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import MemberCard from "../components/UI/MemberCard";
import { Image } from "expo-image";
import LinearGradient from "react-native-linear-gradient";

const profile = () => {
  const data = useSelector((state) => state.user);
  const { user, role, profile } = data;

  console.log(role);
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
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch members.");
        }
    
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

  useEffect(() => {
    handleGetMembers();
  }, [members]);

  return (
    <View className="h-full w-full px-4 relative">
      <ScrollView
        className="h-full w-full py-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 56 }}
      >
        <View className="mt-3 space-y-5">
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(10, 92, 18, 1)", "rgba(255, 255, 255, 1)"]}
            className="rounded-l-full w-full overflow-hidden"
          >
            <View className="flex flex-row py-2 px-2 justify-between items-center">
              <View className=" flex-row flex justify-center items-center">
                <Image
                  source={{ uri: picture }}
                  className="h-12 w-12 rounded-full"
                />
                <View className="ml-3">
                  <Text className="font-bold text-sm text-white/70">Name</Text>
                  <Text className="text-lg text-white font-bold capitalize">
                    {user?.given_name}
                  </Text>
                </View>
              </View>
              {profile && (
                <TouchableOpacity onPress={() => router.push("/editProfile")}>
                  <FontAwesome6
                    name="pen-to-square"
                    color={"green"}
                    size={28}
                  />
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
          {profile ? (
            <View>
              <LabelValue label={"Date Of Birth"} value={profile.dob} />
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
                value={"John Doe"}
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
          <View className="px-2">
            <View className="flex justify-center items-center">
              <View className="flex flex-row justify-between items-center px-4 w-full">
                <View className="flex flex-row justify-center items-center space-x-2">
                  <FontAwesome6
                    name="person-circle-plus"
                    size={20}
                    color={"green"}
                  />
                  <Text className="text-xl font-bold text-green-600 ml-2">
                    Members
                  </Text>
                </View>
                <View className="bg-green-600 h-6 w-6 flex justify-center items-center rounded-full">
                  <Text className="text-base font-bold text-white">
                    {members.length}
                  </Text>
                </View>
              </View>
              <View className="w-full border rounded-full border-green-900/30" />
            </View>
            {members.length > 0 &&
              members.map((mem, index) => (
                <MemberCard data={mem} key={index} />
              ))}
          </View>
          <View className="flex justify-center items-center w-full px-6">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/addMember")}
            >
              <View className="flex justify-center items-center border h-12 rounded-lg flex-row w-full">
                <Ionicons name="add-circle" size={28} color={"green"} />
                <Text className="text-green-600 text-xl font-bold ml-3">
                  Add Member
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {role && (
        <View className="h-12 w-full">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(admin)/tours")}
            className="flex justify-center items-center h-full"
          >
            <View className="fixed bottom-7 w-full h-full px-6 flex justify-between items-center bg-green-800 py-3 rounded-xl flex-row">
              <Ionicons name="lock-closed" color={"white"} size={24} />
              <Text className="text-white text-xl font-bold capitalize">
                {role} Screen
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={"white"}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default profile;
