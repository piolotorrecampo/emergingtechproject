import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";

const LandingScreen = ({ navigation }) => {

  const clickHandlerLogin = () => {
    navigation.navigate('Login')
  } 

  const clickHandlerRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/landingpagebg.png')}>
        <View style={styles.header}>
            <Image style={styles.logo} source={require('../assets/icon.png')}/>
            <Text style={{fontWeight: 'bold'}}>Satisfy Your Cravings, One Click at a Time.</Text>
            <Text style={styles.text}>Here at Technological Institute of the Philippines, Quezon City</Text>
        </View>
        <View styles={styles.buttons}>
            <CustomButton
                title="Log in"
                destination={clickHandlerLogin}
            />
            <CustomButton
                title="Create an account"
                type='true'
                destination={clickHandlerRegister}
            />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LandingScreen;

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
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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