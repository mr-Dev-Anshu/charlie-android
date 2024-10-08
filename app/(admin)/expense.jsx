import {  Text, View, useColorScheme } from "react-native";
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
import ModalDropdown from "react-native-modal-dropdown";

const expense = () => {
  const addExpenseDetailRef = useRef(null);
  const showExpenseDetailRef = useRef(null);
  const exportExcelSheet = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
        break;
    }
  };

  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const bgColor = colorScheme === "dark" ? "bg-black" : "bg-white";
  const accentBgColor = colorScheme === "dark" ? "bg-gray-800" : "bg-white";

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [roles, setRoles] = useState([
    { label: "Admin", value: "admin" },
    { label: "Coordinator", value: "coordinator" },
  ]);

  return (
    <>
      <View className="mt-16 h-full w-full relative">
        <View className="z-50 px-3">
          <DropDownPicker
            open={open}
            value={value}
            items={roles}
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
            setValue={setValue}
            setItems={setRoles}
          />
        </View>
        <View className="flex flex-row justify-between items-center px-3 py-3">
          <View
            className={`w-[30%] rounded-lg flex justify-center items-center h-[70px] space-y-1 bg-green-600/30 `}
          >
            <Text className={`${textColor} font-medium`}>Budget</Text>
            <Text className={`text-lg font-bold text-blue-600`}>
              ₹ 1,00,000
            </Text>
          </View>
          <View
            className={`w-[30%] rounded-lg flex justify-center items-center h-[70px] space-y-1 bg-green-600/30 `}
          >
            <Text className={`${textColor} font-medium`}>Spent</Text>
            <Text className={`text-lg font-bold text-red-600`}>₹ 1,00,000</Text>
          </View>
          <View
            className={`w-[30%] rounded-lg flex justify-center items-center h-[70px] space-y-1 bg-green-600/30 `}
          >
            <Text className={`${textColor} font-medium`}>Balance</Text>
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
                className={`flex flex-row w-full justify-between items-center px-2 py-2 shadow-sm ${accentBgColor} shadow-black/30 rounded-lg mb-2`}
              >
                <View className="flex flex-row w-[220px] justify-start items-center space-x-3">
                  <Ionicons
                    name={getIconName(item.category)}
                    size={24}
                    color={"green"}
                  />
                  <View>
                    <Text className={`${textColor} font-semibold`}>
                      {shorten(item.category, 25)}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {item.createdAt}
                    </Text>
                  </View>
                </View>
                <Text className={`${textColor}`}>{item.name}</Text>
                <View className="flex flex-row justify-center items-center space-x-4">
                  <Text className={`w-14 text-right font-medium ${textColor} `}>
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
          className={`flex flex-row justify-between items-center w-full bottom-14 px-3 py-2 ${bgColor}`}
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
          <View className="w-full">
            <ModalDropdown
              options={[
                "SriSailam Tour",
                "Hyderabad Tour",
                "Vizag Tour",
                "Goa Tour",
                "Kerala Tour",
              ]}
              defaultValue="Select Expense Category"
              onSelect={(index, value) => setSelectedIndex(index)}
              style={{
                padding: 10,
                borderColor: "green",
                borderRadius: 10,
                borderWidth: 2,
                width: "100%",
                height: 40,
              }}
              textStyle={{ color: "black", fontSize: 14 }}
              dropdownTextStyle={{
                color: "black",
                fontSize: 14,
                lineHeight: 24,
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={{
                width: 200,
                height: 150,
                paddingTop: 10,
                borderColor: "green",
              }}
            />
          </View>
          <View className="w-full">
            <ModalDropdown
              options={[
                "Food & Snacks",
                "First Aid",
                "Transportation",
                "Accommodation",
                "Miscellaneous",
              ]}
              defaultValue="Select Expense Category"
              onSelect={(index, value) => setSelectedIndex(index)}
              style={{
                padding: 10,
                borderColor: "green",
                borderRadius: 10,
                borderWidth: 2,
                width: "100%",
                height: 40,
              }}
              textStyle={{ color: "black", fontSize: 14 }}
              dropdownTextStyle={{
                color: "black",
                fontSize: 14,
                lineHeight: 24,
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={{ width: "100%", height: 150 }}
            />
          </View>
          <TextInput
            placeholder="Note"
            multiline
            numberOfLines={2}
            autoCapitalize="none"
            keyboardType="email-address"
            className="text-black text-base font-semibold lowercase w-full outline-green-700 indent-3 border-2 border-green-700 rounded-[10px] p-1.5"
            placeholderTextColor={"#7d7d7d"}
          />
          <TextInput
            placeholder="Date"
            autoCapitalize="none"
            keyboardType="numbers-and-punctuation"
            className="text-black text-base font-semibold lowercase w-full outline-green-700 indent-3 border-2 border-green-700 rounded-[10px] p-1.5"
            placeholderTextColor={"#7d7d7d"}
          />
          <TextInput
            placeholder="Amount"
            autoCapitalize="none"
            keyboardType="number-pad"
            className="text-black text-base font-semibold lowercase w-full outline-green-700 indent-3 border-2 border-green-700 rounded-[10px] p-1.5"
            placeholderTextColor={"#7d7d7d"}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            containerStyle={{ width: "100%" }}
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
        >
          <View className="flex justify-center items-center mt-2 bg-green-600 w-full py-2 rounded-[10px]">
            <Text className="text-white text-lg font-semibold">
              Add Expense
            </Text>
          </View>
        </TouchableOpacity>
      </Modalize>
    </>
  );
};

export default expense;
