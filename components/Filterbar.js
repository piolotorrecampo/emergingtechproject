import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const logo = require('../assets/icon.png');

const Filterbar = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('SearchScreen');
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo}/>
      <Pressable onPress={() => onPress()} style={styles.searchIcon}>
        <FontAwesome name="search" size={20} color="black" />
      </Pressable>
    </View>
  )
}

export default Filterbar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC20F',   
        flexDirection: 'row',
        height: 60,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 7,
        paddingVertical: 5,
        marginBottom:  10,
    },
    searchIcon: {
      paddingHorizontal: 15,
    },
    logo: {
        width: 80,
        height: 49,
    }
})