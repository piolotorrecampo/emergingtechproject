import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormTextInput } from '../../components/FormTextInput';
import CustomButton from '../../components/CustomButton';
import { useUser } from '../../context/UserContext';

import { db } from "../../services/firebase";
import { doc, updateDoc, query, where, getDocs, collection } from '@firebase/firestore';

const ChangePersonalInfoForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const { userData } = useUser();

  const handleChangeInfo = async (username, newUsername, newEmail) => {
    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        const userRef = doc(db, 'users', userId);

        await updateDoc(userRef, {
          username: newUsername,
          email: newEmail,
        });

        setUsername('');
        setEmail('');
        navigation.navigate('Account');
      } else {
        console.log('User not found: Please check the username and try again.');
      }
    } catch (error) {
      console.error('Error during password update:', error.message);
    }
  };

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>Personal Information</Text>
            <FormTextInput 
              title="Username"
              value={username}
              onChangeText={(value) => setUsername(value)}
            />
            <FormTextInput 
              title="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <CustomButton
                title="Change Personal Information"
                onPress={() => handleChangeInfo(userData.username, username, email)}
            />
        </View>
    </SafeAreaView>
  )
}

export default ChangePersonalInfoForm

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D1A50C",
        padding: 10,
        paddingVertical: 10,
        gap: 10,
        borderRadius: 10,
        margin:10,
    },
    title: {
        fontSize: 25,
        color: 'white',
    }
})