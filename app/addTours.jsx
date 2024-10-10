import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "galio-framework";
import { router } from "expo-router";
import { useSelector } from "react-redux";

const addTours = () => {
  const { user } = useSelector((state) => state.user);

  const [error, setError] = useState("");
  const [tourName, setTourName] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [distance, setDistance] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingCloseDate, setBookingCloseDate] = useState("");
  const [costPerPerson, setCostPerPerson] = useState("");
  const [adminCanReject, setAdminCanReject] = useState(false);
  const [paymentGatewayEnabled, setPaymentGatewayEnabled] = useState(false);
  const [include, setInclude] = useState("");
  const [notIncluded, setNotIncluded] = useState("");
  const [backPack, setBackPack] = useState("");
  const [checkInBaggage, setCheckInBaggage] = useState("");

  const submitForm = async () => {
    if (
      !tourName ||
      !budget ||
      !location ||
      !description ||
      !totalSeats ||
      !distance ||
      !startDate ||
      !endDate ||
      !bookingCloseDate ||
      !costPerPerson ||
      !difficulty
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setError("");

      const formData = {
        name: tourName,
        budget,
        location,
        description,
        total_seats: parseInt(totalSeats, 10),
        distance,
        tour_start: new Date(startDate),
        tour_end: new Date(endDate),
        booking_close: new Date(bookingCloseDate),
        tour_cost: costPerPerson,
        can_admin_reject: adminCanReject,
        enable_payment_getway: paymentGatewayEnabled,
        include: include,
        not_included: notIncluded,
        back_pack: backPack,
        check_in_baggage: checkInBaggage,
        difficulty,
      };

      const response = await fetch(
        "https://trakies-backend.onrender.com/api/tour/create-tour",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-email": user?.email,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        const { _id } = result;
        router.push(`/addTourImgs?id=${_id}`);
      } else {
        setError(result.message || "Failed to submit tour. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting tour:", err);
      setError("Error submitting tour. Please try again.");
    }
  };

  return (
    <View className="h-full w-full px-4">
      <ScrollView
        className="h-full w-full py-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 44 }}
      >
        <View className="flex justify-center items-center ">
          {error && (
            <View className="flex flex-row justify-center items-center space-x-3 h-6">
              <Ionicons name="warning" size={24} color={"red"} />
              <Text
                className={`text-base font-semibold tracking-wider text-red-600`}
              >
                {error}
              </Text>
            </View>
          )}
          <View className="w-full py-2">
            <TextInput
              placeholder="Tour Name"
              value={tourName}
              placeholderTextColor={"gray"}
              onChangeText={setTourName}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Budget"
              value={budget}
              placeholderTextColor={"gray"}
              onChangeText={setBudget}
              keyboardType="numeric"
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Location"
              value={location}
              placeholderTextColor={"gray"}
              onChangeText={setLocation}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Description"
              value={description}
              placeholderTextColor={"gray"}
              onChangeText={setDescription}
              multiline
              className={`border-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 h-24 `}
            />
            <TextInput
              placeholder="Difficulty [e.g., Easy, Medium, Hard]"
              value={difficulty}
              placeholderTextColor={"gray"}
              onChangeText={setDifficulty}
              className={`border-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3`}
            />
            <TextInput
              placeholder="Total Seats"
              value={totalSeats}
              placeholderTextColor={"gray"}
              onChangeText={setTotalSeats}
              keyboardType="numeric"
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Distance"
              value={distance}
              placeholderTextColor={"gray"}
              onChangeText={setDistance}
              keyboardType="numeric"
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Start Date (YYYY-MM-DD)"
              value={startDate}
              placeholderTextColor={"gray"}
              onChangeText={setStartDate}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="End Date (YYYY-MM-DD)"
              value={endDate}
              placeholderTextColor={"gray"}
              onChangeText={setEndDate}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Booking Close (YYYY-MM-DD)"
              value={bookingCloseDate}
              placeholderTextColor={"gray"}
              onChangeText={setBookingCloseDate}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Cost Per Person"
              value={costPerPerson}
              placeholderTextColor={"gray"}
              onChangeText={setCostPerPerson}
              keyboardType="numeric"
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Included Items (comma separated)"
              value={include}
              placeholderTextColor={"gray"}
              onChangeText={setInclude}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Not Included Items (comma separated)"
              value={notIncluded}
              placeholderTextColor={"gray"}
              onChangeText={setNotIncluded}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Backpack Items (comma separated)"
              value={backPack}
              placeholderTextColor={"gray"}
              onChangeText={setBackPack}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <TextInput
              placeholder="Check-in Baggage Items (comma separated)"
              value={checkInBaggage}
              placeholderTextColor={"gray"}
              onChangeText={setCheckInBaggage}
              className={`border-2 py-2 mb-3 w-full border-green-600 rounded-lg placeholder:text-base placeholder:font-semibold px-3 `}
            />
            <View className="flex-row justify-between items-center w-full mb-3 border-2 py-1 rounded-lg px-2 border-green-600">
              <Text className={`text-lg font-semibold `}>
                Admin Can Reject Booking?
              </Text>
              <View style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}>
                <Switch
                  trackColor={"green"}
                  value={adminCanReject}
                  onChange={() => setAdminCanReject(!adminCanReject)}
                  ios_backgroundColor={"gray"}
                />
              </View>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3 border-2 py-1 rounded-lg px-2 border-green-600">
              <Text className={`text-lg font-semibold `}>
                Payment Gateway Enabled?
              </Text>
              <View style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}>
                <Switch
                  trackColor={"green"}
                  value={paymentGatewayEnabled}
                  onChange={() =>
                    setPaymentGatewayEnabled(!paymentGatewayEnabled)
                  }
                  ios_backgroundColor={"gray"}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        className={` w-full py-2 flex-row justify-between bottom-2 space-x-3 `}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          className="flex-1"
        >
          <View className="bg-gray-500 py-2 rounded-lg">
            <Text className="text-center text-white font-bold text-lg">
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={submitForm}
          className="flex-1"
        >
          <View className="bg-green-600 py-2 rounded-lg">
            <Text className="text-center text-white font-bold text-lg">
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default addTours;
