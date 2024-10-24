import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Modalize } from "react-native-modalize";
import { post } from "../../constants/tours";
import PostComponent from "../../components/UI/PostComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import LoginReqCard from "../../components/UI/LoginReqCard";
import { useSelector } from "react-redux";
import { uploadFilesToS3 } from "../../utils/uploadFileHelper";
import { ActivityIndicator } from "react-native-paper";

const community = () => {
  const { user } = useSelector((state) => state.user);

  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [allPosts, setAllPosts] = useState([]);

  const handleSelectImages = (existingImages, assets) => {
    setImages([...existingImages, ...assets]);
  };

  const handleUnselect = (uri) => {
    setImages(images.filter((image) => image.uri !== uri));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      handleSelectImages(images, result.assets);
    }
  };

  const getAllPosts = async () => {
    try {
      const res = await fetch(
        "https://trakies-backend.onrender.com/api/Post/get-posts"
      );

      const posts = await res.json();
      setAllPosts(posts.data);
    } catch (error) {
      console.log("Failed to get posts", error);
    }
  };

  const handlePost = async () => {
    if (!images || !text) {
      return;
    }

    setLoading(true);

    try {
      const body = {
        userEmail: user.email,
        name: user.given_name,
        content: text,
      };

      const postRes = await fetch(
        "https://trakies-backend.onrender.com/api/Post/create-post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (postRes.status !== 201) {
        throw new Error("Failed to post.");
      }

      const res = await postRes.json();

      const imgRes = await uploadFilesToS3(images, res.data._id);

      if (!imgRes) {
        await fetch(
          `https://trakies-backend.onrender.com/api/Post/delete-post?id=${res.data._id}`,
          {
            method: "DELETE",
          }
        );
        throw new Error("Failed to post images.");
      }
      addPostRef.current.close();
    } catch (error) {
      console.log(error);
      Alert.alert("Oops!", "Something went wrong\n\nPlease try again");
    } finally {
      setLoading(false);
    }
  };

  const addPostRef = useRef(null);

  useEffect(() => {
    getAllPosts();
  }, [allPosts]);

  if (allPosts.length === 0) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator color="green" size={"large"} />
      </View>
    );
  } 

  return (
    <>
      {user ? (
        <>
          <View className="mt-16 h-full relative">
            <ScrollView
              contentContainerStyle={{ paddingBottom: 10, flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              <View className="px-4 pt-16 w-full">
                {allPosts.length > 0 &&
                  allPosts?.map((post, index) => (
                    <PostComponent key={index} post={post} />
                  ))}
              </View>
            </ScrollView>
            <View className="h-14 absolute bottom-16 w-full px-4 py-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => addPostRef.current?.open()}
                className="bg-green-700 h-10 py-2 flex justify-center items-center rounded-lg"
              >
                <Text className="text-white font-semibold">
                  Share your experience
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modalize
            adjustToContentHeight
            ref={addPostRef}
            handlePosition="inside"
            modalStyle={{ overflow: "hidden", width: "100%" }}
          >
            <View className="w-full h-full px-4 flex-1 justify-between items-center">
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: 20,
                  flexGrow: 1,
                }}
                style={{ width: "100%", flex: 1 }}
              >
                <View className="w-full flex-1">
                  <View className="py-2 flex justify-center items-center">
                    <Text className="text-xl font-semibold">
                      Share your experience with us
                    </Text>
                  </View>
                  <TextInput
                    multiline={true}
                    numberOfLines={6}
                    textAlignVertical="top"
                    onChangeText={setText}
                    value={text}
                    placeholder="Write your thoughts...."
                    keyboardType="default"
                    className="w-full mt-3 border-2 border-green-700 rounded-lg p-2"
                    placeholderTextColor={"gray"}
                  />
                  {images.length !== 0 ? (
                    <View
                      className="flex flex-row flex-wrap justify-center 
                          items-center space-x-4 border-2 border-green-600 
                          rounded-lg p-1 py-5 mt-4"
                    >
                      {images.map((img, idx) => (
                        <View key={idx} className="relative h-fit w-fit">
                          <Image
                            source={{ uri: img.uri }}
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 10,
                              marginBottom: 14,
                            }}
                          />
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleUnselect(img.uri)}
                            className="absolute -top-2 -right-2 h-5 w-5 
                             rounded-full flex justify-center items-center 
                             border-2 border-gray-500 bg-white"
                          >
                            <Ionicons
                              name="close-outline"
                              size={14}
                              color="red"
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View className="border-2 border-green-700 flex justify-center items-center h-32 w-full rounded-lg mt-2">
                      <Text>Please share the moments you captured</Text>
                      <View className="w-full flex justify-center items-center mt-1">
                        <TouchableOpacity
                          onPress={pickImage}
                          className="bg-green-700 w-40 px-4 py-3 mt-2 rounded-lg flex justify-center items-center"
                        >
                          <Text className="text-white font-semibold">
                            Add Images
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </ScrollView>
              <View className="w-full h-12 px-6">
                <TouchableOpacity
                  onPress={handlePost}
                  activeOpacity={0.7}
                  className="bg-green-700 w-full h-10 flex justify-center items-center py-3 rounded-xl"
                >
                  {loading ? (
                    <ActivityIndicator color="white" size={"small"} />
                  ) : (
                    <Text className="font-semibold text-white">Post</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Modalize>
        </>
      ) : (
        <LoginReqCard />
      )}
    </>
  );
};

export default community;
