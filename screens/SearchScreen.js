import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchScreen = () => {

  return (
    <SafeAreaView>
      <Header
        title='Search'
      />
      <View>
        <TextInput/>
      </View>
     
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})