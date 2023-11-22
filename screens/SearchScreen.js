import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const SearchScreen = () => {
  return (
    <View>
      <Header
        title='Search'
      />
      <Text>SearchScreen</Text>
      <TextInput/>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})