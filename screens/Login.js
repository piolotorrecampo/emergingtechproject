import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Pressable, Modal, Alert } from "react-native";
import React, { useState } from "react";
import {FormTextInput, ShowHidePasssword} from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";
import { useUser } from '../context/UserContext';

import { db } from "../services/firebase";
import { getDocs, query, collection, where } from 'firebase/firestore';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignedIn, setSignedIn] = useState(false);
  const { setUserData } = useUser();

  const handleLogin = async () => {
    try {
      console.log('Logging in...')
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = { id: userDoc.id, ...userDoc.data() };

        if (userData.password === password) {
          console.log('Successfully Logged In!');
          setUserData(userData);
          navigation.replace('Dashboard');
        } else {
          console.log('Invalid Credentials: Please check your username and password.');
          Alert.alert('Invalid Credentials', 'Please check your username and password.', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      } else {
        console.log('User Not Found: Please check your username and try again.');
        Alert.alert('Invalid Credentials', 'Please check your username and password.', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const handleCloseModal = () => {
    setSignedIn(false);
  }

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/landingpageplain.png')}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Welcome!</Text>
          <Text style={styles.textSubHeader}>Sign in to continue</Text>
        </View>
        <View style={styles.form}>
          <FormTextInput 
            title="Username"
            value={username}
            onChangeText={(value) => setUsername(value)}
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
            title="Log in"
            onPress={handleLogin}
          /> 
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isSignedIn}
          onRequestClose={handleCloseModal}
        >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You have successfully signed in!</Text>
            <Pressable style={styles.modalButton} onPress={handleCloseModal}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

function ForgotPassword() {
  return(
    <Pressable>
      <Text style={styles.forgotpassword}>Forgot Password?</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
  },
  textHeader: {
    color: 'white',
    fontSize: 50,
  },
  textSubHeader: {
    color: 'white',
    fontSize: 22,
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
    backgroundColor: 'rgba(209, 165, 12, 0.7)',
    margin: 10,
    padding: 10,
    borderRadius: 15,
    gap: 10,
  },
  text: {
      textAlign: 'center',
      color: 'white',
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
