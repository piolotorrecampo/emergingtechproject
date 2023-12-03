import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";



const CustomButton = (props) => {
  const type = props.type;
  const [isPressed, setIsPressed] = useState(false);
    
  
  const handlePressIn = () => {
    setIsPressed(true);
    console.log('pressed');
  };

  const handlePressOut = () => {
    setIsPressed(false);
    console.log('pressedout');
  };

    const variationOne = isPressed ? styles.variationOne : styles.container;
    const variationTwo = isPressed ? styles.variationTwo : styles.containerOutline;

  return (
    <Pressable 
        onPress={props.onPress} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={type ? variationTwo : variationOne}
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
    variationOne: {
        backgroundColor: "rgba(255, 194, 15, 0.6)",
        height: 'auto',
        width: 'auto',
        borderRadius: 15,
        padding: 15,
        boxShadow: '7px 6px 24px -10px rgba(0,0,0,0.67)',
    },
    variationTwo: {
        backgroundColor: "rgba(255, 194, 15, 0.1)",
        height: 'auto',
        width: 'auto',
        borderRadius: 15,
        padding: 15,
        borderWidth: 2,
        borderColor: "#FFC20F",
        boxShadow: '7px 6px 24px -10px rgba(0,0,0,0.67)',
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'poppinsSemiBold',
        fontSize: 15,
    }
});
