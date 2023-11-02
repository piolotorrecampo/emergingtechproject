import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Pressable } from "react-native";
import React, { useState } from "react";
import {FormTextInput, ShowHidePasssword} from "../components/FormTextInput";
import CustomButton from "../components/CustomButton"


const Login = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [isChecked, setIsChecked] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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
          <ShowHidePasssword
            onPress={handleHidePassword}
            state={hidePassword}
          />
          <CustomButton
            title="Log in"
          />
          <ForgotPassword/>
        </View>
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
  
});
