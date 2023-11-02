import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { FormTextInput, ShowHidePasssword } from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";

const Register = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setReapetPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');

  const handleHidePassword = () => {
    setHidePassword(!hidePassword)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/landingpageplain.png')}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Create an account!</Text>
          <Text style={styles.textSubHeader}>Fill up the form to continue</Text>
        </View>
        <View style={styles.form}>
          <FormTextInput 
            title="Full Name"
            value={fullname}
            onChangeText={setFullname}
          /> 
          <FormTextInput 
            title="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          /> 
          <FormTextInput 
            title="Email"
            value={email}
            onChangeText={setEmail}
          /> 
          <View style={styles.password}>
            <FormTextInput 
              title="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!hidePassword} 
            />   
          </View>
          <View style={styles.password}>
            <FormTextInput 
              title="Repeat password"
              value={repeatPassword}
              onChangeText={setReapetPassword}
              secureTextEntry={!hidePassword} 
            />   
          </View>
          <ShowHidePasssword
            onPress={handleHidePassword}
            state={hidePassword}
          />
          <Text style={styles.text}>or</Text>
          <CustomButton
            title="Create an account"
          />
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
    color: 'white',
    textAlign: 'center',
  },
  forgotpassword: {
    color: 'lightblue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  }
});