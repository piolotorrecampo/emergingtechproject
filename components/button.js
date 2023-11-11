// Button.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Button = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="heart" size={24} color="white" />
        <Text style={styles.label}>Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="fast-food" size={24} color="white" />
        <Text style={styles.label}>Foods</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="person" size={24} color="white" />
        <Text style={styles.label}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'orange',
    height: 50,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    color: 'white',
    marginTop: 1,
  },
});

export default Button;