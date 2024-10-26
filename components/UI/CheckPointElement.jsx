import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType, useCameraPermissions } from "expo-camera";

const { height, width } = Dimensions.get("window");

const CheckPointElement = ({ points, index }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    };
    checkAndRequestPermission();
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleQRCodePress = () => {
    setScanned(false);
    setShowCameraModal(true);
  };

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      setShowCameraModal(false);
      Alert.alert("QR Code Scanned", `Data: ${data}`);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.checkpointInfo}>
            <Text
              style={styles.checkpointText}
            >{`Check Point ${index + 1}`}</Text>
            <Text style={styles.pointName}>{points?.name}</Text>
          </View>
          <View style={styles.qrIconContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleQRCodePress}>
              <Ionicons name="qr-code-outline" size={32} color={"green"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{points?.description}</Text>
        </View>
      </View>
      <Modal
        visible={showCameraModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCameraModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Camera
            style={styles.camera}
            type={CameraType.back}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeScannerSettings={{
              barCodeTypes: ["qr"],
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowCameraModal(false)}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    padding: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  header: {
    flexDirection: "row",
  },
  checkpointInfo: {
    width: "80%",
  },
  checkpointText: {
    paddingVertical: 4,
    fontSize: 12,
  },
  pointName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  qrIconContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionContainer: {
    width: "100%",
    marginTop: 8,
  },
  descriptionText: {
    marginTop: 8,
    textAlign: "justify",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: width * 0.8,
    height: height * 0.5,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});

export default CheckPointElement;