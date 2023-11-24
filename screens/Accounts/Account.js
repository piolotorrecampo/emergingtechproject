import { StyleSheet, Text, View, Pressable, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../../components/Header";
import { useUser } from "../../context/UserContext";
import * as ImagePicker from "expo-image-picker";

const screenWidth = Dimensions.get('window').width;
const profilePhoto = require('../../assets/userPhoto.png');

const Account = ({ navigation }) => {
  const { userData } = useUser();

  const handleLogout = async () => {
    console.log('Logging out...')
    await AsyncStorage.removeItem('isLoggedIn');
    navigation.replace('Login');
    console.log('Logged out succesfully!')
  };

  return (
    <SafeAreaView>
      <Header
        title='Account'
      />
      <View style={styles.accountContainer}>
        <UploadImage
          name={userData.name}
        />
        <View style={styles.buttons}>
          <AccountButton 
            buttonTitle="Personal Account Information"
            buttonIcon={<MaterialIcons name='security' size={24} color="white" />}
            onPress={() => navigation.navigate('ChooseSetting')}
          />
          <AccountButton 
            buttonTitle="Logout"
            buttonIcon={<MaterialIcons name='logout' size={24} color="white" />}
            onPress={handleLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;

const AccountButton = (props) => {
  return (
    <Pressable onPress={props.onPress} style={styles.accountButtonContainer}>
      <Text style={styles.buttonIcon}>{props.buttonIcon}</Text>
      <Text style={styles.buttonText}>{props.buttonTitle}</Text>
    </Pressable>
  )
}

const UploadImage = (props) => {
  const [activeButton, setActiveButton] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work.");
      }
        })();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.');
    }
  };

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

  return(
    <View>
      <View style={styles.accountName}>
        <Pressable onPress={pickImageAsync}>
          <Image source={profilePhoto} style={styles.imageStyle} />
        </Pressable>
        <Text style={styles.accountNameText}>{props.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  accountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  accountName: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: screenWidth * 0.85, 
    height: "auto",
    borderRadius: 20,
    borderColor: "#FFC20F",
    padding: screenWidth * 0.10,
    marginBottom: screenWidth * 0.10,
  },
  accountNameText: {
    fontWeight: "bold",
    fontSize: screenWidth * 0.06,
    color: "black",
  },
  accountButtonContainer: {
    width: screenWidth * 0.90,
    height: screenWidth * 0.16,
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#FFC20F",
    padding: "5%",
    marginTop: "2%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFC20F",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: screenWidth * 0.04,
    paddingHorizontal: 10,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
