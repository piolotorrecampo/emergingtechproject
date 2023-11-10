import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight, Modal,
} from "react-native";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Image source={require("./assets/appIcon.png")} style={styles.appIcon} />
    </View>
  );
};

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
      <Header title="" />
      <View style={styles.content}>
        <View style={styles.accountName}>
          <TouchableOpacity
            onPress={() => handleImagePress(require("./assets/piolo.png"))}
          >
            <Image
              source={require("./assets/piolo.png")}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
          <Text style={styles.accountNameText}>Project Manager</Text>
        </View>
        <View style={styles.settings}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Image
                source={require("./assets/myproducts.png")}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>My Products</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Image
                source={require("./assets/accountinformation.png")}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>
                Personal and Account Information
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Image
                source={require("./assets/logout.png")}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
      <View style={styles.bottomNav}>
        <TouchableHighlight
          style={styles.navButton}
          underlayColor="transparent"
          onPress={() => handlePress("Favorites")}
        >
          <View style={styles.navbarButtonContent}>
            <Image
              source={require("./assets/heart.png")}
              style={[
                styles.navbarIcons,
                { tintColor: activeButton === "Favorites" ? "black" : "white" },
              ]}
            />
            <Text
              style={[
                styles.buttonText,
                { color: activeButton === "Favorites" ? "black" : "#FFFFFF" },
              ]}
            >
              Favorites
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navButton}
          underlayColor="transparent"
          onPress={() => handlePress("Food")}
        >
          <View style={styles.navbarButtonContent}>
            <Image
              source={require("./assets/food.png")}
              style={[
                styles.navbarIcons,
                { tintColor: activeButton === "Food" ? "black" : "white" },
              ]}
            />
            <Text
              style={[
                styles.buttonText,
                { color: activeButton === "Food" ? "black" : "#FFFFFF" },
              ]}
            >
              Food
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navButton}
          underlayColor="transparent"
          onPress={() => handlePress("Account")}
        >
          <View style={styles.navbarButtonContent}>
            <Image
              source={require("./assets/account.png")}
              style={[
                styles.navbarIcons,
                { tintColor: activeButton === "Account" ? "black" : "white" },
              ]}
            />
            <Text
              style={[
                styles.buttonText,
                { color: activeButton === "Account" ? "black" : "#FFFFFF" },
              ]}
            >
              Account
            </Text>
          </View>
        </TouchableHighlight>
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
  header: {
    backgroundColor: "#FFC20F",
    padding: 20,
    alignItems: "center",
    width: 5000,
    height: 120,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  content: {
    flex: 1, // Make the content fill the available space
    alignItems: "center",
    justifyContent: "center",
  },
  accountName: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFC20F",
    width: 350,
    height: 350,
    marginTop: -100,
    marginBottom: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFC20F",
  },
  accountNameText: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
    marginTop: 10,
    color: "#FFFFFF",
  },
  button: {
    width: 350,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFC20F",
    padding: 15,
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFC20F",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  imageStyle: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 200,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  appIcon: {
    width: 100,
    height: 50,
    marginTop: 40,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "center",
    height: 70,
    backgroundColor: "#FFC20F",
    width: 500,
  },
  navButton: {
    width: 100,
  },
  navButtonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 40,
  },
  navbarIcons: {
    width: 20,
    height: 20,
  },
  navbarButtonContent: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalImage: {
    width: 300,
    height: 300,
  },
  modalCloseButton: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
  },
});
