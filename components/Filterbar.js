import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React from 'react'

const logo = require('../assets/icon.png');

const Filterbar = () => {
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={logo}/>
      <View>
        <TextInput placeholder="Search" style={styles.textInput}/>
      </View>
    </View>
  )
}

export default Filterbar

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC20F',   
        paddingTop: 30,
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginBottom:  10,
    },
    textInput: {
        borderColor: 'white',
        borderWidth: 1,
        width: 290,
        borderRadius: 100,
        padding: 7,
    },
    logo: {
        width: 100,
        height: 59,
    }
})