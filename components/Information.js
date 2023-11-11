// Information.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Information = ({ navigation }) => {
  const handlePersonalInformationPress = () => {
    navigation.navigate('ChangePersonal');
  };

  const handleChangePasswordPress = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePersonalInformationPress}>
        <Text style={styles.buttonText}>Change Personal Information</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleChangePasswordPress}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 150,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Information;
