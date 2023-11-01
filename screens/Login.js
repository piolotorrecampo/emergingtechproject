import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React from "react";
import FormTextInput from "../components/FormTextInput";
import CustomButton from "../components/CustomButton";

const Login = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/landingpagebg.png')}>
        <View style={styles.form}>
          <Image style={styles.logo} source={require('../assets/icon.png')}/>
          <View style={styles.inputs}>
            <FormTextInput 
              title="Username or Email"
              placeholder=""
            /> 
            <FormTextInput 
              title="Password"
              placeholder=""
            /> 
          </View>
          <CustomButton
            title="Log in"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
  },
  background: {
      flex: 1,
      justifyContent: 'center',  
  },
  logo: {
      height: 117,
      width: 182,
  },
  form:  {
    flex: 4,
    justifyContent: 'center',
    width: '100%',
  },
  inputs: {
    flex: 1,
  },
  header: {
      flex: 1,
      justifyContent: 'center',
  },
  buttons: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
      textAlign: 'center',
  }
});
