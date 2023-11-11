// Foods.js
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Foods = ({ userUploadedImages, title }) => {
  const [favorites, setFavorites] = useState(Array(userUploadedImages.length).fill(false));

  const handleFavoriteToggle = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = !updatedFavorites[index];
    setFavorites(updatedFavorites);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userUploadedImages.map((image, index) => (
        <View key={index} style={styles.foodBox}>
          <TouchableOpacity onPress={() => handleFavoriteToggle(index)} style={styles.favoriteButton}>
            <Ionicons name={favorites[index] ? 'heart' : 'heart-outline'} size={24} color={favorites[index] ? 'red' : 'black'} />
          </TouchableOpacity>

          <View style={styles.overlay}>
            <Text style={styles.foodTitle}>{title} {index + 1}</Text>
          </View>
          
          <Image source={{ uri: image }} style={styles.foodImage} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20, // Add margin at the top
  },

  foodBox: {
    width: '48%', // Adjust the width based on your preference
    marginBottom: 10,
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden', // Hide overflow to respect borderRadius
  },

  foodImage: {
    width: '70%', // Adjust the width based on your preference
    height: 200, // Adjust the height based on your preference
    borderRadius: 20,
    margin: 17,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'orange', // Adjust the color and opacity of the overlay
    padding: 20,
    justifyContent: 'flex-end', // Align the text to the bottom
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  foodTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white', // Adjust the text color
  },

  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure the button is above the overlay
  },
});

export default Foods;







