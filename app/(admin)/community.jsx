import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import PostComponent from "../../components/UI/PostComponent";
import { useSelector } from "react-redux";
import LoginReqCard from "../../components/UI/LoginReqCard";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { uploadFilesToS3 } from "../../utils/uploadFileHelper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const Community = () => {
  const { user } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const addPostRef = useRef(null);

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

    if (!result.canceled) {
      handleSelectImages(images, result.assets);
    }
  };

  const getAllPosts = async () => {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/Post/get-posts`
      );
      const posts = await res.json();
      setAllPosts(posts.data);
    } catch (error) {
      console.log("Failed to get posts", error);
    }
  };

  const handlePost = async () => {
    if (!images || !text) return;

    setLoading(true);
    try {
      const body = {
        userEmail: user.email,
        name: user.given_name,
        content: text,
      };

      const postRes = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/Post/create-post`,
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
          `${process.env.EXPO_PUBLIC_BASE_URL}/api/Post/delete-post?id=${res.data._id}`,
          { method: "DELETE" }
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

  useEffect(() => {
    getAllPosts();
  }, [allPosts]);

  if (allPosts.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  return (
    <>
      {user ? (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.postsContainer}>
              {allPosts.map((post, index) => (
                <PostComponent key={index} post={post} />
              ))}
            </View>
          </ScrollView>
          <View style={styles.shareButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => addPostRef.current?.open()}
              style={styles.shareButton}
            >
              <Text style={styles.shareButtonText}>Share your experience</Text>
            </TouchableOpacity>
          </View>
          <Modalize
            adjustToContentHeight
            ref={addPostRef}
            handlePosition="inside"
            modalStyle={styles.modalStyle}
          >
            <View style={styles.modalContainer}>
              <ScrollView contentContainerStyle={styles.modalScrollContent}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    Share your experience with us
                  </Text>
                  <TextInput
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    onChangeText={setText}
                    value={text}
                    placeholder="Write your thoughts...."
                    keyboardType="default"
                    style={styles.textInput}
                    placeholderTextColor="gray"
                  />
                  {images.length > 0 ? (
                    <View style={styles.imagesContainer}>
                      {images.map((img, idx) => (
                        <View key={idx} style={styles.imageWrapper}>
                          <Image
                            source={{ uri: img.uri }}
                            style={styles.image}
                          />
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleUnselect(img.uri)}
                            style={styles.imageCloseButton}
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
                    <View style={styles.addImagesPlaceholder}>
                      <Text>Please share the moments you captured</Text>
                      <TouchableOpacity
                        onPress={pickImage}
                        activeOpacity={0.6}
                        style={styles.addImagesButton}
                      >
                        <Text style={styles.addImagesButtonText}>
                          Add Images
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </ScrollView>
              <View style={styles.postButtonContainer}>
                <TouchableOpacity
                  onPress={handlePost}
                  activeOpacity={0.7}
                  style={styles.postButton}
                >
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.postButtonText}>Post</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Modalize>
        </SafeAreaView>
      ) : (
        <LoginReqCard />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  postsContainer: {
    paddingHorizontal: "5%",
    paddingTop: 20,
  },
  shareButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: "5%",
    right: "5%",
  },
  shareButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  shareButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalStyle: {
    width: "100%",
    padding: 16,
  },
  modalContainer: {
    paddingHorizontal: "5%",
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalContent: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    height: 150,
    marginTop: 10,
    textAlignVertical: "top",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 20,
    width: "100%",
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  imageCloseButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
  addImagesPlaceholder: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 8,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addImagesButton: {
    backgroundColor: "green",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  addImagesButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  postButtonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  postButton: {
    backgroundColor: "green",
    width: "60%",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  postButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default Community;
