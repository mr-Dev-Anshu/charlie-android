import { View, Text, Alert, Dimensions, useColorScheme } from "react-native";
import Button from "react-native-button";
import { useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { members, tours } from "../../constants/tours.js";
import { Image } from "expo-image";
import LinearGradient from "react-native-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import ListComponent from "../../components/UI/ListComponent.jsx";
import { Modalize } from "react-native-modalize";
import approve from "../../assets/approve.png";
import Checkbox from "expo-checkbox";
import Carousel from "react-native-reanimated-carousel";
import CarouselImageRender from "../../components/UI/CarouselImageRender.jsx";

const width = Dimensions.get("window").width;

const DetailsScreen = ({ params }) => {
  const { id } = useLocalSearchParams();
  const [tourMembers, setTourMembers] = useState(members);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    isIncluded: true,
    isTrekker: false,
    noAccommodation: false,
  });

  const handleSaveMember = () => {
    if (!newMember.name) {
      Alert.alert("Please enter member name");
      return;
    }
    setTourMembers([...tourMembers, newMember]);
    setShowAddMember(false);
  };

  const handleAddMember = () => {
    setShowAddMember(true);
  };

  const handleRemoveMember = async (index) => {
    setTourMembers(tourMembers.filter((member, i) => i !== index));
  };

  const handleCancel = () => {
    setShowAddMember(false);
  };

  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const bgColor = colorScheme === "dark" ? "bg-black" : "bg-white";
  const accentBgColor = colorScheme === "dark" ? "bg-gray-800" : "bg-white";

  const interestedRef = useRef(null);
  const reserveRef = useRef(null);

  const tour = tours.find((tour) => tour.id === Number(id));

  return (
    <>
      <ScrollView className="flex h-full">
        {/* <Image source={{ uri: tour.image }} className="h-72 w-full" /> */}
        <Carousel
          loop
          width={width}
          height={288}
          autoPlay={true}
          data={tour.images}
          autoPlayInterval={2000}
          scrollAnimationDuration={1000}
          renderItem={CarouselImageRender}
        />
        <View className="px-2 mt-4 pb-8 relative">
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(240, 101, 2, 0.2)", "rgba(0, 174, 255, 0.2)"]}
            className="rounded-xl"
          >
            <View
              className={`flex flex-row justify-between border-2  py-3 px-4 rounded-xl `}
            >
              <View className="space-y-2">
                <Text className={`font-medium ${textColor}`}>Price</Text>
                <Text
                  className={`text-lg font-bold ${textColor}`}
                >{`₹ ${tour?.cost}`}</Text>
              </View>
              <View className="space-y-2">
                <Text className={`font-medium ${textColor}`}>
                  Seats Available
                </Text>
                <Text className={`text-lg font-bold ${textColor} text-right`}>
                  {`${tour?.seats} seats`}
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View
            className={`flex flex-row justify-between py-3 px-4 rounded-xl mt-4 ${bgColor}`}
          >
            <View className="space-y-2">
              <Text className={`font-medium ${textColor}`}>Tour Name</Text>
              <Text
                className={`text-lg font-bold ${textColor}`}
              >{`${tour?.name}`}</Text>
            </View>
            <View className="space-y-2">
              <Text className={`font-medium ${textColor}`}>Booking Open</Text>
              <Text className={`text-lg font-bold ${textColor} text-right`}>
                {`till 19 July`}
              </Text>
            </View>
          </View>
          <View className={`px-4 space-y-2 mt-3 ${bgColor}`}>
            <Text className={`font-semibold text-md ${textColor}`}>
              Description
            </Text>
            <Text
              className={`text-justify tracking-wider text-md ${textColor}`}
            >
              {tour?.info}
            </Text>
          </View>
          <View className={`px-4 space-y-2 mt-3 ${bgColor}`}>
            <Text className={`font-semibold text-md ${textColor}`}>Date</Text>
            <Text
              className={`text-justify tracking-wider text-md font-semibold ${textColor}`}
            >
              {`${tour?.date} ( ${tour?.duration} )`}
            </Text>
          </View>
          <View className="px-4 mt-5">
            <View className="flex flex-row justify-left items-center space-x-3">
              <Ionicons name="thumbs-up-outline" size={24} color={"green"} />
              <Text className={`text-base ${textColor} font-bold`}>
                What is included ?
              </Text>
            </View>
            <View className="px-1 mt-3 space-y-2">
              <ListComponent
                icon="checkmark-circle"
                text="Food"
                color={"#0e9c02"}
              />
              <ListComponent
                icon="checkmark-circle"
                text="Accomodation"
                color={"#0e9c02"}
              />
              <ListComponent
                icon="checkmark-circle"
                text="Guide"
                color={"#0e9c02"}
              />
              <ListComponent
                icon="checkmark-circle"
                text="Transportation"
                color={"#0e9c02"}
              />
            </View>
          </View>
          <View className="px-4 mt-6">
            <View className="flex flex-row justify-left items-center space-x-3">
              <Ionicons name="thumbs-down-outline" size={24} color={"red"} />
              <Text className={`text-base ${textColor} font-bold`}>
                What is not included ?
              </Text>
            </View>
            <View className="px-1 mt-3 space-y-2">
              <ListComponent
                icon="close-circle-outline"
                text="Food"
                color={"red"}
              />
              <ListComponent
                icon="close-circle-outline"
                text="Accomodation"
                color={"red"}
              />
              <ListComponent
                icon="close-circle-outline"
                text="Guide"
                color={"red"}
              />
              <ListComponent
                icon="close-circle-outline"
                text="Transportation"
                color={"red"}
              />
            </View>
          </View>
          <View className="px-4 mt-6">
            <View className="flex flex-row justify-left items-center space-x-3">
              <Ionicons name="bag-check-outline" size={24} color={"green"} />
              <Text className={`text-base ${textColor} font-bold`}>
                Bag Pack
              </Text>
            </View>
            <View className="px-1 mt-3 space-y-2">
              <ListComponent
                icon="checkmark-circle-outline"
                text="Food"
                color={"gray"}
              />
              <ListComponent
                icon="checkmark-circle-outline"
                text="Accomodation"
                color={"gray"}
              />
              <ListComponent
                icon="checkmark-circle-outline"
                text="Guide"
                color={"gray"}
              />
              <ListComponent
                icon="checkmark-circle-outline"
                text="Transportation"
                color={"gray"}
              />
            </View>
          </View>
          <View className="px-4 mt-6">
            <View className="flex flex-row justify-left items-center space-x-3">
              <Ionicons
                name="checkmark-done-circle-outline"
                size={24}
                color={"green"}
              />
              <Text className={`text-base ${textColor} font-bold`}>
                Check In Baggage
              </Text>
            </View>
            <View className="px-1 mt-3 space-y-2">
              <ListComponent
                icon="checkmark-circle-outline"
                text="Water Bottle"
                color={"gray"}
              />
              <ListComponent
                icon="checkmark-circle-outline"
                text="Trekking Boots"
                color={"gray"}
              />
              <ListComponent
                icon="checkmark-circle-outline"
                text="Rain Coat"
                color={"gray"}
              />
              <ListComponent
                icon="checkmark-circle-outline"
                text="Warm Clothes"
                color={"gray"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="h-fit mb-5 flex flex-row justify-between items-center w-full px-6 space-x-4">
        <TouchableOpacity
          onPress={() => interestedRef.current?.open()}
          activeOpacity={0.8}
        >
          <View className=" bg-slate-500 w-[180px] rounded-xl py-4 ">
            <Text className="text-white text-center text-md font-semibold">
              Interested
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => reserveRef.current?.open()}
          activeOpacity={0.8}
        >
          <View className="py-4 bg-green-700 w-[180px] rounded-xl">
            <Text className="text-center text-white font-semibold">
              Reserve Seat
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modalize
        ref={interestedRef}
        handleStyle={{ backgroundColor: "green" }}
        handlePosition="inside"
        modalHeight={350}
      >
        <View
          className={`flex justify-center items-center h-[350px] rounded-t-lg ${accentBgColor}`}
        >
          <Text className={`text-xl font-semibold mt-6 ${textColor}`}>
            Thanks for showing interest for the tour.
          </Text>
          <Image source={approve} className=" h-40 w-40 mt-2" />
          <Text className={`mt-2 text-lg ${textColor}`}>
            Our team will reach out to you.
          </Text>
        </View>
        <Button
          title="Close"
          color={"red"}
          onPress={() => interestedRef.current?.close()}
        />
      </Modalize>
      <Modalize
        ref={reserveRef}
        handlePosition="inside"
        handleStyle={{ backgroundColor: "green" }}
        modalHeight={600}
      >
        <View className="h-full relative">
          <View className={`flex px-4 h-[600px] rounded-t-lg ${accentBgColor}`}>
            <View>
              <Text className={`text-lg font-semibold mt-6 ${textColor}`}>
                Select Number of Seats
              </Text>
              <Text className={`text-sm tracking-wider ${textColor}`}>
                You can add family members in my profile.
              </Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 150 }}
            >
              <View className="mt-6 space-y-5">
                {tourMembers.map((member, index) => (
                  <View key={index} className="space-y-2">
                    <View className="w-full flex flex-row justify-between items-center">
                      <Text className={`text-lg font-semibold ${textColor}`}>
                        {member.name}
                      </Text>
                      <Button onPress={() => handleRemoveMember(index)}>
                        <Ionicons
                          name="close-circle-outline"
                          size={20}
                          color={"red"}
                        />
                      </Button>
                    </View>
                    <View className="flex flex-row w-full justify-between mt-2">
                      <View className="flex flex-row space-x-2 justify-center items-center">
                        <Checkbox
                          value={member.isTrekker}
                          style={{ height: 16, width: 16 }}
                          color={"green"}
                        />
                        <Text className={`${textColor}`}>I am a Trekker</Text>
                      </View>
                      <View className="flex flex-row space-x-2 justify-center items-center">
                        <Checkbox
                          value={member.noAccommodation}
                          style={{ height: 16, width: 16 }}
                          color={"green"}
                        />
                        <Text className={`${textColor}`}>No Accommodation</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              {showAddMember && (
                <View className="mt-8 space-y-4">
                  <TextInput
                    placeholder="Enter Member Name"
                    placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
                    className={`border-2 p-2 rounded-md h-10 font-semibold border-green-700 ${textColor}`}
                    value={newMember.name}
                    onChangeText={(text) =>
                      setNewMember({ ...newMember, name: text })
                    }
                  />
                  <View className="flex flex-row justify-between px-1">
                    <View className="flex flex-row space-x-2 justify-start items-center">
                      <Checkbox
                        value={newMember.isTrekker}
                        onValueChange={(value) =>
                          setNewMember({ ...newMember, isTrekker: value })
                        }
                        style={{ height: 16, width: 16 }}
                        color={"green"}
                      />
                      <Text className={`font-semibold ${textColor}`}>
                        Is a Trekker ?
                      </Text>
                    </View>
                    <View className="flex flex-row space-x-2 justify-start items-center">
                      <Checkbox
                        value={newMember.noAccommodation}
                        onValueChange={(value) =>
                          setNewMember({ ...newMember, noAccommodation: value })
                        }
                        style={{ height: 16, width: 16 }}
                        color={"green"}
                      />
                      <Text className={`font-bold ${textColor}`}>
                        No Accommodation
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row justify-end items-center px-1">
                    <Button onPress={handleCancel}>
                      <View
                        className={`bg-red-500 w-[80px] flex justify-center items-center py-1.5 rounded-md mr-2`}
                      >
                        <Text className="font-semibold text-white">Cancel</Text>
                      </View>
                    </Button>
                    <Button onPress={handleSaveMember}>
                      <View
                        className={`bg-green-600 w-[80px] flex justify-center items-center py-1.5 rounded-md`}
                      >
                        <Text className="font-semibold text-white">Save</Text>
                      </View>
                    </Button>
                  </View>
                </View>
              )}
              {!showAddMember && (
                <View
                  className={`${accentBgColor} w-40 mt-4 py-2 px-2 rounded-md`}
                >
                  <Button className="bg-green-600" onPress={handleAddMember}>
                    <Ionicons
                      name="add-circle-outline"
                      color="white"
                      size={20}
                    />
                    <Text className="font-semibold ml-1 text-white">
                      Add New Member
                    </Text>
                  </Button>
                </View>
              )}
            </ScrollView>
          </View>
          <View className={`px-4 absolute bottom-0 pb-8 pt-1`}>
            <View className="flex flex-row w-full justify-between items-center">
              <View>
                <Text className={`text-xs ${textColor}`}>Total Payable</Text>
                <Text className={`text-xl font-bold ${textColor}`}>
                  {`₹ 12,000`}
                </Text>
              </View>
              <Button onPress={() => router.push("/payment")}>
                <View className="h-10 w-40 flex justify-center items-center rounded-lg bg-green-700">
                  <Text className="text-white font-semibold tracking-wider">
                    Pay Now
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
      </Modalize>
    </>
  );
};

export default DetailsScreen;
