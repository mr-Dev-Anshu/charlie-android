import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const ViewCheckIns = () => {
  const { id } = useLocalSearchParams();

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
    handleGetCheckedInMembers();
  }, []);

  if (checkedInMembersLoading) {
    return (
      <View>
        <ActivityIndicator color="green" size={"large"} />
      </View>
    );
  }

  return (
    <View className="p-2">
      <Text>ViewCheckIns</Text>
      <CheckedInUserCard
        name={"Rahul"}
        age={"32"}
        gender={"Male"}
        checkInTime={"10:35"}
        checkedIn={true}
      />
      <CheckedInUserCard
        name={"Rahul"}
        age={"32"}
        gender={"Male"}
        checkInTime={"10:35"}
        checkedIn={false}
      />
    </View>
  );
};

const CheckedInUserCard = ({ name, age, gender, checkInTime, checkedIn }) => {
  return (
    <TouchableOpacity>
      <View
        style={[
          styles.card,
          { backgroundColor: checkedIn ? "green" : "red", },
        ]}
      >
        <Text style={styles.text}>{name}</Text>
        <View className="flex justify-center items-center flex-row space-x-1 mt-2">
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
    width: 100,
    height: 100,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

export default ViewCheckIns;
