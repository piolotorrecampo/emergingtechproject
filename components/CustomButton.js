import { StyleSheet, Text, View, Pressable } from "react-native";

const CustomButton = (props) => {
  const type = props.type

  return (
    <Pressable 
        onPress={props.onPress} 
        style={type ? styles.containerOutline : styles.container}
    >
        <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFC20F",
        height: 'auto',
        width: 'auto',
        borderRadius: 15,
        padding: 15,
        boxShadow: '7px 6px 24px -10px rgba(0,0,0,0.67)',
    },
    containerOutline: {
        borderColor: "#FFC20F",
        borderWidth: 2,
        height: 'auto',
        width: 'auto',
        borderRadius: 15,
        padding: 15,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins',
        fontSize: 15,
    }
});
