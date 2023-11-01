import { StyleSheet, View, ImageBackground, Image, TextInput } from "react-native";
import CustomButton from "../components/CustomButton";
import FormTextInput from "../components/FormTextInput";

const Register = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/landingpagebg.png')}>
        <View style={styles.form}>
          <Image style={styles.logo} source={require('../assets/icon.png')}/>
          <View style={styles.inputs}>
            <FormTextInput
                title="Email or username"
                placeholder='Email or Password'
            />
          </View>
          <CustomButton
            title="Register"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Register;

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
        backgroundColor: "#D1A50C",
    },
    inputs: {
  
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

  
