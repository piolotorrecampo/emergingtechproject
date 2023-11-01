import { StyleSheet, Text, View, TextInput } from "react-native";

const FormTextInput = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <TextInput style={styles.textinput} value={props.value} placeholder={props.placeholder}/>
    </View>
  );
};

export default FormTextInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 10,
    },
    text: {
        
    },
    textinput: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "white",
        height: 50,
    }
});
