// Cpassword.js

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Cpassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = () => {
    if (password === repeatPassword) {
      // Passwords match, you can perform your desired action here
      console.log('Passwords Match!');
      // Resetting the error message if previously shown
      setPasswordsMatch(true);
    } else {
      // Passwords don't match
      setPasswordsMatch(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        secureTextEntry={true}
        value={repeatPassword}
        onChangeText={(text) => setRepeatPassword(text)}
      />
      {!passwordsMatch && <Text style={styles.errorMessage}>Passwords do not match</Text>}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  submitButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Cpassword;
