import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'

const logo = require('../assets/icon.png');

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC20F',   
        flexDirection: 'row',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: 'poppinsBold',
        color: 'black',
    }
})