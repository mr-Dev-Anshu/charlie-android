import { View, Text, Alert, StyleSheet, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CheckPointElement = ({ points, index }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handleQRCodePress = () => {
    setScanned(false); // Reset scanned state to allow scanning again
    setShowCamera(true); // Show the camera view
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setShowCamera(false); // Hide the camera after scanning
    Alert.alert("QR Code Scanned", `Data: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.checkpointInfo}>
          <Text style={styles.checkpointText}>{`Check Point ${index + 1}`}</Text>
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
      {showCamera && (
        <RNCamera
          style={StyleSheet.absoluteFillObject}
          onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
          captureAudio={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    padding: 8,
    justifyContent: "start",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 16,
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
});

export default CheckPointElement;