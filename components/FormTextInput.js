import { StyleSheet, Text, View, TextInput, Pressable} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

export const FormTextInput = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <View style={styles.textinputContainer}>
        <TextInput 
          style={styles.textinput} 
          onChangeText={props.onChangeText} 
          secureTextEntry={props.secureTextEntry} 
          value={props.value} 
          placeholder={props.placeholder}
        />
      </View>
    </View>
  );
};

export const ShowHidePasssword = (props) => {
  return(
    <View style={styles.showpassword}>
      <Pressable onPress={props.onPress}>
        <Ionicons 
          name={props.state ? 'checkbox-sharp' : 'checkbox-outline'}
          size={24} 
          color="white" 
        />
      </Pressable>
      <Text style={styles.textPassword}>Show Password</Text>
    </View>
  )  
}

const styles = StyleSheet.create({
    textinputContainer: {
      borderWidth: 2,
      borderRadius: 15,
      borderColor: "white",
      height: 50,
      flexDirection: 'row',
      alignItems: 'center'
    }, 
    text: {
      paddingBottom: 5,
      color: 'white',
      fontFamily: 'poppinsSemiBold',
    },
    textinput: {
      padding: 10,
      width: '100%',
      fontFamily: 'poppinsRegular',
      color: 'white',
    },
    showpassword: {
      flexDirection: 'row',
      gap: 5,
    },
    textPassword: {
      fontFamily: 'poppinsRegular',
      marginTop: 2,
      color: 'white',
    }
});
