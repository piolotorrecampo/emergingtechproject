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
        height: 60,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 7,
        paddingVertical: 5,
        marginBottom:  10,
    },
    title: {
        fontSize: 20,
    }
})