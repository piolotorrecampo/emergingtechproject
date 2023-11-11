import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight, Modal, Dimensions } from "react-native";


const screenWidth = Dimensions.get('window').width;

const Header = () => {};

export default function App() {
  const [activeButton, setActiveButton] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePress = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleImagePress = (imageSource) => {
    setSelectedImage(imageSource);
    setImageModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setImageModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.accountName}>
          <TouchableOpacity onPress={() => handleImagePress(require("./assets/piolo.png"))}>
            <Image source={require("./assets/piolo.png")} style={styles.imageStyle} />
          </TouchableOpacity>
          <Text style={styles.accountNameText}>Project Manager</Text>
        </View>
        <View style={styles.settings}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Image source={require("./assets/myproducts.png")} style={styles.buttonImage} />
              <Text style={styles.buttonText}>My Products</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Image source={require("./assets/accountinformation.png")} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Personal and Account Information</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Image source={require("./assets/logout.png")} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
      <View style={styles.bottomNav}>
      </View>
      <StatusBar style="auto" />
      <Modal
        transparent={true}
        animationType="slide"
        visible={isImageModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal}>
            <Image source={selectedImage} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  accountName: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFC20F",
    width: screenWidth * 0.85, 
    height: "auto",
    borderRadius: screenWidth * 0.06,
    borderColor: "#FFC20F",
    padding: screenWidth * 0.10,
    marginBottom: screenWidth * 0.10,
  },
  accountNameText: {
    fontWeight: "bold",
    fontSize: screenWidth * 0.06,
    color: "#FFFFFF",
  },
  button: {
    width: screenWidth * 0.85,
    height: screenWidth * 0.15,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFC20F",
    padding: "5%",
    marginTop: "2%",
    borderRadius: screenWidth * 0.06,
    borderWidth: 1,
    borderColor: "#FFC20F",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: screenWidth * 0.04,
  },
  imageStyle: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    marginBottom: "5%",
    borderRadius: 200,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonImage: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06,
    marginRight: screenWidth * 0.06,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalImage: {
    width: screenWidth * 1,
    height: screenWidth * 1,
  },
  modalCloseButton: {
    color: "white",
    fontSize: 10,
    marginTop: "2%",
  },
});
