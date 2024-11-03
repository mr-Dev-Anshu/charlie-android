import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { Modalize } from "react-native-modalize";
import { MaterialIcons } from "@expo/vector-icons";

const ViewCheckIns = () => {
  const { id } = useLocalSearchParams();

  const { checkPoints } = useSelector((state) => state.tour);

  const checkPointData = checkPoints?.find((i) => i._id === id);

  const manualCheckInRef = useRef(null);
  const resetAllRef = useRef(null);

  const [checkedInMembers, setCheckedInMembers] = useState([]);
  const [checkedInMembersLoading, setCheckedInMembersLoading] = useState([]);

  const handleGetCheckedInMembers = async () => {
    setCheckedInMembersLoading(true);
    try {
      const response = await fetch(
        `https://trakies-backend.onrender.com/api/checked/getUserById?id=${id}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch checkedIn members");
      }

      const data = await response.json();
      setCheckedInMembers(data);
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Something went wrong", "Please try again.");
    } finally {
      setCheckedInMembersLoading(false);
    }
  };

  useEffect(() => {
    // handleGetCheckedInMembers();
  }, []);

  //   if (checkedInMembersLoading) {
  //     return (
  //       <View className="h-full w-full flex justify-center items-center">
  //         <ActivityIndicator color="green" size={"large"} />
  //       </View>
  //     );
  //   }

  return (
    <>
      <View className="p-2 mt-2 h-full relative flex justify-center items-center">
        <View className="mb-3 w-full">
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(240, 101, 2, 0.2)", "rgba(0, 174, 255, 0.2)"]}
            className="rounded-lg"
          >
            <View
              className={`flex flex-row justify-between py-3 px-4 rounded-xl`}
            >
              <View className="space-y-2">
                <Text>Check Point</Text>
                <Text
                  className={`text-base font-medium `}
                >{`${checkPointData.name}`}</Text>
              </View>
              <View className="space-y-2">
                <Text>Checked In Members</Text>
                <Text
                  className={`text-xl text-green-700 font-medium text-right`}
                >
                  {`${23}`}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
            flexGrow: 1,
          }}
          style={{ width: "100%" }}
        >
          <View className="flex flex-row flex-wrap justify-around w-full">
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={true}
              manualCheckInRef={manualCheckInRef}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
            <CheckedInUserCard
              name={"Rahul"}
              age={"32"}
              gender={"Male"}
              checkInTime={"10:35"}
              checkedIn={false}
            />
          </View>
        </ScrollView>
        <View className="absolute bottom-6 h-16 flex justify-center items-center w-full ">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => resetAllRef.current?.open()}
            className="w-[300px] py-4 flex justify-center items-center rounded-lg border border-red-700"
          >
            <Text>Reset All Check-Ins</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modalize ref={resetAllRef} adjustToContentHeight>
        <View style={{ padding: 20, alignItems: "center", paddingBottom: 50 }}>
          <MaterialIcons name="warning" size={48} color="red" />
          <Text
            style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}
          >
            Are you sure?
          </Text>
          <Text style={{ textAlign: "center", color: "#555" }}>
            Once you reset this, all your current data will be lost and cannot
            be recovered.
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "red",
                padding: 12,
                width: 160,
                borderRadius: 5,
                alignItems: "center",
                marginRight: 5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Confirm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => resetAllRef.current?.close()}
              style={{
                flex: 1,
                backgroundColor: "#ccc",
                padding: 12,
                width: 160,
                borderRadius: 5,
                alignItems: "center",
                marginLeft: 5,
              }}
            >
              <Text style={{ color: "black", fontWeight: "bold" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
      <Modalize ref={manualCheckInRef} adjustToContentHeight>
        <View className="w-full justify-center items-center py-4">
          <Text className="text-lg">Guest Check-in</Text>
        </View>
        <View className="h-48 w-full justify-start items-center px-2">
          <View className="flex flex-row w-full justify-between items-center pr-3 ">
            <View className="shadow-sm rounded-md py-2 px-2 space-y-1 ">
              <Text className=" text-xs text-gray-600  ">Name</Text>
              <Text className="text-lg">{"Rahul"}</Text>
            </View>
          </View>
          <View className="w-full px-2 mt-2">
            <View className="flex flex-row justify-between items-center">
              <View className="w-[50%] ">
                <Text className=" text-sm text-slate-500/70">Age(Yr)</Text>
                <Text className="text-base">{"32 Yrs"}</Text>
              </View>
              <View className=" w-[50%]">
                <Text className="text-sm text-slate-500/70">Gender</Text>
                <Text className=" text-base">{"Male"}</Text>
              </View>
            </View>
            <View className="flex flex-row justify-between items-center mt-2">
              <View className="w-[50%] ">
                <Text className=" text-sm text-slate-500/70">Contact No.</Text>
                <Text className=" text-base">{"8090900602"}</Text>
              </View>
              <View className="w-[50%] ">
                <Text className=" text-sm text-slate-500/70">
                  Emergency Contact
                </Text>
                <Text className="text-base">{"8090900602"}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            width: "100%",
            paddingHorizontal: 10,
            paddingBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => resetAllRef.current?.close()}
            style={{
              flex: 1,
              backgroundColor: "#ccc",
              padding: 12,
              width: 160,
              borderRadius: 5,
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <Text style={{ color: "black", fontWeight: "500" }}>
              Mark as absent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "red",
              padding: 12,
              width: 160,
              borderRadius: 5,
              alignItems: "center",
              marginRight: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: "500" }}>Check-in</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </>
  );
};

const CheckedInUserCard = ({
  name,
  age,
  gender,
  checkInTime,
  checkedIn,
  manualCheckInRef,
}) => {
  return (
    <TouchableOpacity
      onPress={() => manualCheckInRef.current?.open()}
      activeOpacity={0.6}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: checkedIn ? "#59d97d" : "#eba4a8" },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: checkedIn ? "green" : "red", fontWeight: 600 },
          ]}
        >
          {name}
        </Text>
        <View className="flex justify-center items-center flex-row space-x-1 mt-2 mb-1">
          <Text style={styles.text}>{age} Yrs</Text>
          <Text style={styles.text}>({gender.charAt(0)})</Text>
        </View>
        <Text style={styles.text}>{checkInTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 80,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

export default ViewCheckIns;
