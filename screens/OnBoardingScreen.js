import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";

const OnBoardingScreen = ({ navigation }) => {

  const clickHandlerLogin = () => {
    navigation.navigate('Login')
  } 

  const clickHandlerRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/landingpagebg.png')}>
        <View style={styles.overlay}>
          <View style={styles.contents}>
            <View style={styles.header}>
              <Image style={styles.logo} source={require('../assets/icon.png')}/>
              <Text style={styles.textHeader}>Satisfy Your Cravings, One Click at a Time.</Text>
              <Text style={styles.textSubHeader}>Here at Technological Institute of the Philippines, Quezon City</Text>
            </View>
            <View style={styles.buttons}>
                <CustomButton
                    title="Log in"
                    onPress={clickHandlerLogin}
                />
                <CustomButton
                    title="Create an account"
                    type='true'
                    onPress={clickHandlerRegister}
                />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
    },
    background: {
      flex: 1,
      justifyContent: 'center',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
    },
    contents: {
      flex: 1,
      justifyContent: 'center',
      margin: 20,
      gap: 300,
    },
    logo: {
      height: 117,
      width: 182,
    },
    header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
    },
    buttons: {
      flex: 1,
      justifyContent: 'center',
      gap: 10,
    },
    textHeader:{
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'poppinsBold',
    },
    textSubHeader: {
      textAlign: 'center',
      fontSize: 13,
      width: 250,
      fontFamily: 'poppinsLight',
    }
});