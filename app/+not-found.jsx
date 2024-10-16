import { ActivityIndicator, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="h-full w-full flex justify-center items-center">
      <ActivityIndicator size="large" color="green" />
      <Text>Loading...</Text>
    </View>
  );
}
