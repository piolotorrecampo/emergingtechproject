import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, TextInput } from 'react-native';
import Foods from './components/Foods';
import Button from './components/button';

const App = () => {
  // Dummy data for user-uploaded food images (replace with actual user-uploaded image URIs)
  const userUploadedImages = [
    'user-upload-1.jpg',
    'user-upload-2.jpg',
    'user-upload-3.jpg',
    'user-upload-4.jpg',
    'user-upload-5.jpg',
    'user-upload-6.jpg',
  ];

  // Calculate the height of upper and lower containers in pixels
  const containerHeight = 30 * Dimensions.get('screen').scale;

  // State for user input
  const [searchText, setSearchText] = useState('');

  // Function to handle input change
  const handleInputChange = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      {/* Top orange background with search bar */}
      <View style={[styles.orangeBackground, { height: containerHeight, justifyContent: 'flex-end' }]}>
        <TextInput
          style={styles.searchBar}
          placeholder="     Search..."
          placeholderTextColor="white"
          onChangeText={handleInputChange}
          value={searchText}
        />
      </View>

      {/* Middle container with white background */}
      <View style={styles.middleContainer}>
        {/* Connect the Foods component here */}
        <Foods userUploadedImages={userUploadedImages} searchText={searchText} />
      </View>

      {/* Bottom orange background with buttons */}
      <Button />

      {/* StatusBar */}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  orangeBackground: {
    backgroundColor: 'orange',
  },

  middleContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  searchBar: {
    backgroundColor: 'transparent',
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 5,
    width: '70%',
    marginBottom: 5, // Lower the search bar a bit
    alignSelf: 'flex-end', // Align the search bar to the right
  },
});

export default App;

