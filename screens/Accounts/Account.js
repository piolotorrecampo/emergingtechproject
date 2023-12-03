import { StyleSheet, Text, View, Pressable, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../../components/Header";
import { useUser } from "../../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;
const profilePhoto = require('../../assets/userPhoto.png');

import { db } from "../../services/firebase";
import { getDocs, getDoc, doc, collection } from '@firebase/firestore';

const Account = ({ navigation }) => {
  const { userData } = useUser();
  const [updateImage, setUpdateImage] = useState('');
  const [updateUsername, setUpdateUseranme] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(collection(db, 'users'), userData.id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const username = userDocSnapshot.data().username;
          const email = userDocSnapshot.data().email;
          const image = userDocSnapshot.data().image;
          setUpdateEmail(email);
          setUpdateImage(image);
          setUpdateUseranme(username);
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error(error);
      }
    };

    let timerId = setInterval(() => {
        fetchData();
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

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
          name={updateUsername}
          email={updateEmail}
          image={updateImage}
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
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ChoosePersonalInfoForm');
  }
  
  return(
    <View>
      <View style={styles.accountProfile}>
        <Pressable  onPress={() => handlePress()}>
          { props.image ?
            <Image source={{ uri : props.image }} style={styles.imageStyle} />
            :
            <Image source={profilePhoto} style={styles.imageStyle} />
          }
        </Pressable>
        <View style={styles.dataContainer}>
          <Text style={styles.accountNameText}>{props.name}</Text>
          <Text style={styles.emailText}>{props.email}</Text>
        </View> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  accountProfile: {
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#FFC20F',
    borderWidth: 9,
  },
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
  emailText: {
    fontFamily: 'poppinsLight',
    fontSize:  15,
    textAlign: 'center',
  },
  accountNameText: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'poppinsBold',
    textAlign: 'center',
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
  },
  dataContainer: {
    marginVertical: 15,
  }
});
