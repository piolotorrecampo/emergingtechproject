import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Modal, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { FormTextInput, ShowHidePasssword } from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";

import { db } from "../services/firebase";
import { doc, setDoc, getDocs, addDoc, collection, query, where } from "firebase/firestore"; 

const Register = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setSignedUp] = useState(false);

  const handleCreateAccount = async () => {
    try {
      if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        console.log('Invalid Input: Please fill in all fields.');
        Alert.alert('Invalid Input', 'Please fill in all fields.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        return;
      }
  
      const userRef = collection(db, 'users');
  
      // Check if the username already exists
      const querySnapshot = await getDocs(query(userRef, where('username', '==', username)));
      if (querySnapshot.docs.length > 0) {
        console.log('Username already exists. Please choose a different username.');
        Alert.alert('Invalid Username', 'Username already exists. Please choose a different username.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        return;
      }
  
      // Set the user data in the document
      addDoc(userRef, {
        username: username,
        email: email,
        password: password,
      });
  
      console.log('Sign Up Successful: Welcome to the app!');
      Alert.alert('Sign up Successful', 'Click the OK button to proceed to sign in screen.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };
  

  const handleCloseModal = () => {
    setSignedUp(false);
  };

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/landingpageplain.png')}>
        <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Create an account!</Text>
          <Text style={styles.textSubHeader}>Fill up the form to continue</Text>
        </View>
        <View style={styles.form}>
          <FormTextInput 
            title="Username"
            value={username}
            onChangeText={(value) => setUsername(value)}
          /> 
          <FormTextInput 
            title="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          /> 
          <View style={styles.password}>
            <FormTextInput 
              title="Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={!hidePassword} 
            />   
          </View>
          <ShowHidePasssword
            onPress={handleHidePassword}
            state={hidePassword}
          />
          <CustomButton
            title="Create an account"
            onPress={handleCreateAccount}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isSignedUp}
          onRequestClose={handleCloseModal}
        >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You have successfully registered!</Text>
            <Pressable style={styles.modalButton} onPress={handleCloseModal}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  textHeader: {
    color: 'white',
    fontSize: 45,
    fontFamily: 'poppinsBold',
  },
  textSubHeader: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'poppinsLight',
  },
  header: {
    padding: 10,
    margin: 10,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  form:  {
    backgroundColor: 'rgba(209, 165, 12, 0.4)',
    margin: 10,
    padding: 10,
    borderRadius: 15,
    gap: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  forgotpassword: {
    color: 'lightblue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: "#FFC20F",
    padding: 10,
    borderRadius: 10,
    gap: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  modalText: {
    fontSize: 18,
  },
  modalButton: {
    backgroundColor: 'rgb(209, 165, 12)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 260,
    borderRadius: 10,
  },
});