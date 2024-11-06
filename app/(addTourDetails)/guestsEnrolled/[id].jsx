import { View, Text, Pressable, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";

const GuestsEnrolled = () => {
  const { id } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState("interested");
  const translateX = useSharedValue(-200);

  const [interestedMembers, setInterestedMembers] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    translateX.value = tab === "interested" ? -200 : 0;
  };

  const springConfig = {
    damping: 20,
    stiffness: 100,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value, springConfig) }],
  }));

  const handleGetInterestedMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://trakies-backend.onrender.com/api/interested/get?tourId=${id}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to get interested members.");
      }

      const data = await response.json();

      setInterestedMembers(data);
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Something went wrong.", "Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleReserveMembers = () => {};
  const handleEnrollMembers = () => {};
  const handleRejectMembers = () => {};

  useEffect(() => {
    handleGetInterestedMembers();
  }, []);

  return (
    <View className={`px-3 h-full flex items-center`}>
      <View className={`px-5 w-full flex justify-center items-center`}>
        <View className={`flex flex-row justify-between`}>
          <Pressable onPress={() => handleTabPress("interested")}>
            <View className={`w-[200px] py-2`}>
              <Text className={`text-center text-base font-semibold`}>
                Interest Requests
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => handleTabPress("requested")}>
            <View className={`w-[200px] py-2`}>
              <Text className={`text-center text-base font-semibold`}>
                Reserve Requests
              </Text>
            </View>
          </Pressable>
        </View>
        <Animated.View style={[animatedStyles]}>
          <View
            className={`bg-green-600 w-[160px] h-1.5 rounded-t-xl absolute bottom-0 left-5`}
          />
        </Animated.View>
      </View>
      <View className={`w-full mt-2`}>
        {activeTab === "interested" ? (
          <View className={`p-2`}>
            {interestedMembers?.map((i) => (
              <ReqCard
                key={i._id}
                name={i?.profileData?.name}
                age={24}
                gender={"Male"}
                interest={true}
                reserve={false}
              />
            ))}
          </View>
        ) : (
          <View className={`p-2`}>
            <ReqCard
              name="Rahul"
              age={24}
              gender={"Male"}
              interest={false}
              reserve={true}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const ReqCard = ({ name, age, gender, interest, reserve }) => {
  return (
    <View className="flex flex-row justify-between items-center bg-white p-1 rounded-lg px-3 shadow-xl shadow-black/50 mt-2 py-2">
      <Text>{name}</Text>
      <Text>
        {age} Yrs, {gender}
      </Text>
      <>
        {reserve && (
          <View className="flex flex-row items-center justify-center space-x-5">
            <TouchableOpacity activeOpacity={0.5}>
              <Text className="text-green-700">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <Text className="text-red-700">Reject</Text>
            </TouchableOpacity>
          </View>
        )}
        {interest && (
          <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 10 }}>
            <Text className="text-green-700">Enrol</Text>
          </TouchableOpacity>
        )}
      </>
    </View>
  );
};

export default GuestsEnrolled;
