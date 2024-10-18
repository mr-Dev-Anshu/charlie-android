import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { format } from "date-fns";

const addTours = () => {
  const { user } = useSelector((state) => state.user);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tourName, setTourName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [distance, setDistance] = useState("");
  const [costPerPerson, setCostPerPerson] = useState("");
  const [adminCanReject, setAdminCanReject] = useState(false);
  const [paymentGatewayEnabled, setPaymentGatewayEnabled] = useState(false);
  const [image, setImage] = useState([]);

  // date range picker

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingCloseDate, setBookingCloseDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showBookingClosePicker, setShowBookingClosePicker] = useState(false);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  const onChangeBookingClose = (event, selectedDate) => {
    const currentDate = selectedDate || bookingCloseDate;
    setShowBookingClosePicker(false);
    setBookingCloseDate(currentDate);
  };

  // date range picker

  // image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  const handleCancelImage = (fileName) => {
    setImage(image.filter((i) => i.fileName !== fileName));
  };

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
    setLoading(true);
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

      const notificationData = {
        title: `Buckle up! New tour: ${tourName}`,
        id: result._id,
      };

      const notify = await fetch(
        "https://trakies-backend.onrender.com/api/notification/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData),
        }
      );

      await notify.json();

      if (response.ok) {
        const { _id } = result;
        router.push(`/addTourImgs?id=${_id}`);
      } else {
        setError(result.message || "Failed to submit tour. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting tour:", err);
      setError("Error submitting tour. Please try again.");
    } finally {
      setLoading(false);
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
              className={`border py-2 mb-3 w-full border-slate-500/50 rounded-lg placeholder:text-base  px-3 `}
            />
            <TextInput
              placeholder="Location"
              value={location}
              placeholderTextColor={"gray"}
              onChangeText={setLocation}
              className={`border py-2 mb-3 w-full border-slate-500/50 rounded-lg placeholder:text-base  px-3 `}
            />
            <TextInput
              placeholder="Description"
              textAlignVertical="top"
              value={description}
              placeholderTextColor={"gray"}
              onChangeText={setDescription}
              multiline
              className={`border mb-3 w-full border-slate-500/50 rounded-lg placeholder:text-base  px-3 h-24 py-2 `}
            />
            <TextInput
              placeholder="Difficulty [Easy, Medium, Hard]"
              value={difficulty}
              placeholderTextColor={"gray"}
              onChangeText={setDifficulty}
              className={`border mb-3 w-full border-slate-500/50 rounded-lg placeholder:text-base  py-2 px-3`}
            />
            <TextInput
              placeholder="Total Seats"
              value={totalSeats}
              placeholderTextColor={"gray"}
              onChangeText={setTotalSeats}
              keyboardType="numeric"
              className={`border py-2 mb-3 w-full border-slate-500/50 rounded-lg placeholder:text-base  px-3 `}
            />
            <TextInput
              placeholder="Distance (kms)"
              value={distance}
              placeholderTextColor={"gray"}
              onChangeText={setDistance}
              keyboardType="numeric"
              className={`border py-2 mb-3 w-full border-slate-500/50 rounded-lg placeholder:text-base  px-3 `}
            />
            <View>
              <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                <TextInput
                  editable={false}
                  className={`border py-2 mb-3 w-full border-slate-500/50 rounded-lg text-black placeholder:text-base  px-3 `}
                  value={
                    startDate ? format(startDate, "yyyy-MM-dd") : new Date()
                  }
                  placeholder="Select Start Date"
                />
              </TouchableOpacity>
              {showStartPicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={onChangeStart}
                />
              )}
              <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                <TextInput
                  editable={false}
                  className={`border py-2 mb-3 w-full border-slate-500/50 rounded-lg text-black placeholder:text-base  px-3 `}
                  value={endDate ? format(endDate, "yyyy-MM-dd") : new Date()}
                  placeholder="Select End Date"
                />
              </TouchableOpacity>
              {showEndPicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={onChangeEnd}
                />
              )}
              <TouchableOpacity onPress={() => setShowBookingClosePicker(true)}>
                <TextInput
                  editable={false}
                  className={`border py-2 mb-3 w-full border-slate-500/50 rounded-lg text-black placeholder:text-base  px-3 `}
                  value={
                    bookingCloseDate
                      ? format(bookingCloseDate, "yyyy-MM-dd")
                      : new Date()
                  }
                  placeholder="Select Booking Close Date"
                />
              </TouchableOpacity>
              {showBookingClosePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={onChangeBookingClose}
                />
              )}
            </View>
            <TextInput
              placeholder="Cost Per Person"
              value={costPerPerson}
              placeholderTextColor={"gray"}
              onChangeText={setCostPerPerson}
              keyboardType="numeric"
              className={`border py-2 mb-3 w-full border-slate-500/50 rounded-lg placeholder:text-base  px-3 `}
            />
            <View className="flex-row py-2 justify-between items-center w-full mb-3 border  rounded-lg px-2 border-slate-500/50">
              <Text
                className={`text-base ${
                  adminCanReject ? "text-black" : "text-gray-500"
                } `}
              >
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
            <View className="flex-row py-2 justify-between items-center w-full mb-3 border  rounded-lg px-2 border-slate-500/50">
              <Text
                className={`text-base ${
                  paymentGatewayEnabled ? "text-black" : "text-gray-500"
                }  `}
              >
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
            {image && image.length > 0 ? (
              <View className="w-full h-fit">
                {image.map((img, idx) => (
                  <View className="relative">
                    <Image
                      key={idx}
                      source={{ uri: img.uri }}
                      style={{
                        width: "100%",
                        height: 156,
                        borderRadius: 10,
                        marginTop: 10,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => handleCancelImage(img.fileName)}
                      className="absolute top-4 right-2 bg-red-600 rounded-full"
                    >
                      <Ionicons
                        name="close-outline"
                        size={16}
                        color={"white"}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                containerStyle={{ width: "100%" }}
                onPress={pickImage}
              >
                <View className="flex h-32 border border-green-700 rounded-lg flex-row justify-center items-center space-x-3">
                  <Ionicons name="add-circle" size={20} color={"green"} />
                  <Text className="text-base font-semibold text-green-600">
                    Upload tour images here
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <View
        className={`w-full py-2 flex-row justify-between bottom-2 space-x-3 `}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full bg-green-700 flex justify-center items-center py-3 rounded-lg"
          // onPress={submitForm}
          onPress={() => router.push("/tour/123")}
        >
          {loading ? (
            <ActivityIndicator color="white" size={"small"} />
          ) : (
            <Text style={{ color: "white", fontSize: 18 }}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default addTours;
