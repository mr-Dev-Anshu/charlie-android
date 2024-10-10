import { Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { expenseDetails } from "../../constants/tours";
import { Modalize } from "react-native-modalize";
import { Ionicons } from "@expo/vector-icons";
import { shorten } from "../../components/UI/PostComponent";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { uploadFileToS3 } from "../../utils/uploadFileHelper";

const expense = () => {
  const { tour } = useSelector((state) => state.tour);
  const { user } = useSelector((state) => state.user);

  // Transform the tour data for the dropdown
  const toursData = tour.map((t) => {
    return { label: t.name, value: t._id };
  });

  const addExpenseDetailRef = useRef(null);
  const showExpenseDetailRef = useRef(null);
  const exportExcelSheet = useRef(null);

  const [open, setOpen] = useState(false);

  const [expenseCategory, setExpenseCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  // const handleAddExpense = async () => {
  //   if (!expenseCategory || !amount || !date || !user.name) return;
  //   setLoading(true);
  //   const imgUrl = await uploadFileToS3(image);

  //   const newExpense = {
  //     category: expenseCategory,
  //     amount: amount,
  //     note: note,
  //     reciept: imgUrl,
  //     date: date,
  //     name: user?.name,
  //   };

  //   console.log("data------>", newExpense);

  //   fetch("https://trakies-backend.onrender.com/api/expanse/add-expanse", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newExpense),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setExpenseCategory("");
  //       setAmount("");
  //       setNote("");
  //       setImage(null);
  //       setDate("");
  //       setLoading(false);
  //       addExpenseDetailRef?.current?.close();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError(error?.message);
  //       setLoading(false);
  //     });
  // };

  const [currentTour, setCurrentTour] = useState(toursData[0]?.value);
  const [tours, setTours] = useState(toursData);

  console.log(currentTour);

  const getIconName = (category) => {
    switch (category) {
      case "Food & Snacks":
        return "fast-food-outline";
      case "First Aid":
        return "medkit-outline";
      case "Transportation":
        return "car-outline";
      case "Accommodation":
        return "bed-outline";
      case "Miscellaneous":
        return "document-text-outline";
      default:
        return "help-outline";
    }
  };

  return (
    <>
      <View className="mt-16 h-full w-full relative">
        <View className="z-50 px-3">
          <DropDownPicker
            open={open}
            items={tours}
            value={currentTour} // Show the selected value
            onChangeValue={(value) => setCurrentTour(value)} // Update selected tour
            closeOnBackPressed={true}
            placeholder="Select Tour"
            zIndex={1000}
            textStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
            arrowIconStyle={{ tintColor: "white" }}
            tickIconStyle={{ tintColor: "white" }}
            style={{ backgroundColor: "#117004", borderColor: "#117004" }}
            dropDownContainerStyle={{
              backgroundColor: "#117004",
              borderColor: "#117004",
            }}
            setOpen={setOpen}
            setItems={setTours}
          />
        </View>
        <View className="flex flex-row justify-between items-center px-3 py-3">
          <View
            className={`w-[30%] rounded-lg flex justify-center items-center h-[70px] space-y-1 bg-green-600/30 `}
          >
            <Text className={` font-medium`}>Budget</Text>
            <Text className={`text-lg font-bold text-blue-600`}>
              ₹ 1,00,000
            </Text>
          </View>
          <View
            className={`w-[30%] rounded-lg flex justify-center items-center h-[70px] space-y-1 bg-green-600/30 `}
          >
            <Text className={` font-medium`}>Spent</Text>
            <Text className={`text-lg font-bold text-red-600`}>₹ 1,00,000</Text>
          </View>
          <View
            className={`w-[30%] rounded-lg flex justify-center items-center h-[70px] space-y-1 bg-green-600/30 `}
          >
            <Text className={` font-medium`}>Balance</Text>
            <Text className={`text-lg font-bold text-green-600`}>
              ₹ 1,00,000
            </Text>
          </View>
        </View>
        <View className=" h-[75%] px-3">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 56 }}
          >
            {expenseDetails?.map((item, index) => (
              <View
                key={index}
                className={`flex flex-row w-full justify-between items-center px-2 py-2 bg-white shadow-xl  shadow-black/50 rounded-lg mb-2`}
              >
                <View className="flex flex-row w-[220px] justify-start items-center space-x-3">
                  <Ionicons
                    name={getIconName(item.category)}
                    size={24}
                    color={"green"}
                  />
                  <View>
                    <Text className={` font-semibold`}>
                      {shorten(item.category, 25)}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {item.createdAt}
                    </Text>
                  </View>
                </View>
                <Text>{item.name}</Text>
                <View className="flex flex-row justify-center items-center space-x-4">
                  <Text className={`w-14 text-right font-medium  `}>
                    ₹ {item.amount}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => showExpenseDetailRef?.current?.open()}
                  >
                    <Ionicons name="eye-outline" size={20} color={"green"} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View
          className={`flex flex-row justify-between items-center w-full bottom-14 px-3 py-2 bg-white `}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => exportExcelSheet?.current?.open()}
          >
            <View className="bg-green-600 py-2 rounded-xl flex justify-center items-center w-[190px]">
              <Text className="text-white text-lg font-semibold">
                Export Excel
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => addExpenseDetailRef?.current?.open()}
          >
            <View className="bg-green-600 py-2 rounded-xl flex justify-center  items-center w-[190px]">
              <Text className="text-white text-lg font-semibold">
                Add Expense
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modalize ref={showExpenseDetailRef} modalHeight={600}>
        <View>
          <Text>Hello</Text>
        </View>
      </Modalize>
      <Modalize ref={exportExcelSheet} modalHeight={400}>
        <View>
          <Text>Hello</Text>
        </View>
      </Modalize>
      <Modalize ref={addExpenseDetailRef} modalHeight={500}>
        <View className="flex justify-center items-center py-2">
          <Text className="text-lg font-semibold">Add Expense Details</Text>
        </View>
        <View className="px-6 pt-3 flex justify-center items-center space-y-4 ">
          <TextInput
            placeholder="Category [e.g., Food, Accomodation]..."
            onChangeText={setExpenseCategory}
            autoCapitalize="none"
            keyboardType="default"
            className="text-black text-base font-semibold px-2 lowercase w-full outline-green-700 indent-3 border-2 border-green-700 rounded-[10px] p-1.5"
            placeholderTextColor={"#7d7d7d"}
          />
          <TextInput
            placeholder="Note"
            multiline
            numberOfLines={2}
            onChangeText={setNote}
            autoCapitalize="none"
            keyboardType="default"
            className="text-black text-base font-semibold px-2 lowercase w-full outline-green-700 indent-3 border-2 border-green-700 rounded-[10px] p-1.5"
            placeholderTextColor={"#7d7d7d"}
          />
          <TextInput
            placeholder="Date"
            autoCapitalize="none"
            onChangeText={setDate}
            keyboardType="numbers-and-punctuation"
            className="text-black text-base font-semibold px-2 lowercase w-full outline-green-700 indent-3 border-2 border-green-700 rounded-[10px] p-1.5"
            placeholderTextColor={"#7d7d7d"}
          />
          <TextInput
            placeholder="Amount"
            autoCapitalize="none"
            onChangeText={amount}
            keyboardType="number-pad"
            className="text-black text-base font-semibold px-2 lowercase w-full outline-green-700 indent-3 border-2 border-green-700 rounded-[10px] p-1.5"
            placeholderTextColor={"#7d7d7d"}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            containerStyle={{ width: "100%" }}
            onPress={pickImage}
          >
            <View className="h-20 flex justify-center items-center border-2 border-dashed rounded-lg mb-3 border-green-600 w-full">
              <View className="flex flex-row justify-center items-center space-x-3">
                <Ionicons name="add-circle" size={20} color={"green"} />
                <Text className="text-base font-semibold text-green-600">
                  Upload Receipt Image ( optional )
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          containerStyle={{ width: "100%", paddingHorizontal: 24 }}
          onPress={handleAddExpense}
        >
          <View className="flex justify-center items-center mt-2 bg-green-600 w-full py-2 rounded-[10px]">
            {loading ? (
              <Text className="text-white text-lg font-semibold">
                Adding...
              </Text>
            ) : (
              <Text className="text-white text-lg font-semibold">
                Add Expense
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </Modalize>
    </>
  );
};

export default expense;
