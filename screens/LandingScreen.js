import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/landingpagebg.png')}>
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
      </ImageBackground>
    </SafeAreaView>
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
      fontWeight: 'bold',
      fontSize: 18,
    },
    textSubHeader: {
      textAlign: 'center',
      fontSize: 12,
      width: 400,
    }
});