import { View , Image} from "react-native";
import React from "react";


const CarouselImageRender = ({ item }) => {
  return (
    <View className="w-full h-full ">
      <Image source={{ uri: item }} resizeMode="cover" className="h-full w-full object-fill" />
    </View>
  );
};

export default CarouselImageRender;
