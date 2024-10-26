import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import LabelValue from "../components/UI/LabelValue";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import MemberCard from "../components/UI/MemberCard";
import { formatDate } from "../utils/helpers";
import { setMembers } from "../redux/slices/userSlice";

const { width, height } = Dimensions.get("window");

const Profile = () => {
  const data = useSelector((state) => state.user);
  const { user, role, profile } = data;
  const router = useRouter();
  const dispatch = useDispatch();
  const [membersData, setMembersData] = useState([]);

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

      const data = await response.json();

      if (response.status !== 200) {
        console.error("Error response:", response);
        throw new Error("Failed to fetch members.");
      }
      setMembersData(data);
      dispatch(setMembers(data));
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    handleGetMembers();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ paddingVertical: 7 }}>
          <Text style={styles.titleText}>Personal Details</Text>
        </View>
        <LabelValue label={"Name"} value={user?.given_name} />
        <View style={styles.detailsContainer}>
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
                label={"Emergency Contact No"}
                value={profile.emergency_contact}
              />
            </View>
          ) : (
            <View style={styles.createProfileContainer}>
              <Text style={styles.createProfileText}>
                You haven't created your profile yet!
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/editProfile")}
                style={styles.createProfileButton}
              >
                <Text style={styles.createProfileButtonText}>
                  Create Profile
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.memberContainer}>
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: width * 0.045, fontWeight: "500" }}>
                Added Members
              </Text>
            </View>
            {membersData.length !== 0 ? (
              <>
                {membersData.map((mem, index) => (
                  <MemberCard data={mem} key={index} />
                ))}
              </>
            ) : (
              <View style={styles.noMembersContainer}>
                <Text>No Members</Text>
              </View>
            )}
          </View>
          {role && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/(admin)/tours")}
              style={[styles.adminButton]}
            >
              <Text style={styles.actionButtonText}>Admin Screen</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/addMember")}
          style={[styles.actionButton, styles.addMemberButton]}
        >
          <Ionicons name="add-outline" size={16} color={"white"} />
          <Text style={[styles.actionButtonText]}>Add Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/updateProfile")}
          style={[styles.actionButton, styles.editProfileButton]}
        >
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: width * 0.04,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    paddingBottom: height * 0.03,
  },
  titleText: {
    fontSize: width * 0.05,
    fontWeight: "500",
    marginBottom: height * 0.001,
  },
  detailsContainer: {
    marginTop: height * 0.001,
    marginBottom: height * 0.05,
  },
  createProfileContainer: {
    height: height * 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  createProfileText: {
    fontSize: width * 0.045,
    color: "green",
    textAlign: "center",
  },
  createProfileButton: {
    backgroundColor: "red",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    marginTop: height * 0.02,
    borderRadius: 10,
    alignItems: "center",
  },
  createProfileButtonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  noMembersContainer: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    alignItems: "center",
    marginVertical: height * 0.02,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: height * 0.002,
  },
  actionButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    width: width * 0.4,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.01,
    marginVertical: height * 0.01,
  },
  actionButtonText: {
    fontSize: width * 0.045,
    marginLeft: 0.001,
    color: "white",
  },
  addMemberButton: {
    backgroundColor: "gray",
    color: "white",
  },
  editProfileButton: {
    backgroundColor: "green",
  },
  memberContainer: {
    marginTop: 12,
  },
  adminButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    width: width * 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default Profile;
