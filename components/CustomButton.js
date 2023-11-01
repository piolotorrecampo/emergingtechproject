import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const CustomButton = (props) => {
  const type = props.type

  return (
    <Pressable onPress={props.destination} style={type ? styles.containerOutline : styles.container}>
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
        borderRadius: 5,
        padding: 15,
        margin: 4,
        boxShadow: '7px 6px 24px -10px rgba(0,0,0,0.67)',
    },
    containerOutline: {
        borderColor: "#FFC20F",
        borderWidth: 2,
        height: 'auto',
        width: 'auto',
        borderRadius: 5,
        padding: 15,
        margin: 4,
    },
    text: {
        textAlign: 'center',
        color: 'white'
    }
});
