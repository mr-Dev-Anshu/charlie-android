import { Ionicons } from "@expo/vector-icons";
import { Text, View, useColorScheme } from "react-native";

const ListComponent = ({ icon, text, color }) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";

  return (
    <View className="flex flex-row space-x-2 mt-0.5 items-center">
      <Ionicons name={icon} size={24} color={color} />
      <Text className={textColor}>{text}</Text>
    </View>
  );
};

export default ListComponent;
