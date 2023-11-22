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
        paddingTop: 30,
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom:  10,
    },
    title: {
        fontSize: 20,
    }
})