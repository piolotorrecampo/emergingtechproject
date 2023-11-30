import { StyleSheet, Text, TextInput, View, Pressable, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormTextInput } from '../../components/FormTextInput';
import CustomButton from '../../components/CustomButton';
import { useUser } from '../../context/UserContext';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker";

import { db, storage } from "../../services/firebase";
import { doc, updateDoc, query, where, getDocs, collection } from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Header from '../../components/Header';

const ChangePersonalInfoForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const { userData } = useUser();

  const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      } else {
        alert('You did not select any image.');
      }
    }

  const handleChangeInfo = async (username, newUsername, newEmail) => {
    try {
      let imageUrl = ''
      if (newUsername.length <= 0){
        newUsername = userData.username
      }
      if (email.length <= 0){
        newEmail = userData.email
      }
      if(image){
        const storageRef = ref(storage, 'productImages/' + Math.random().toString(36).substring(2));
        const response = await fetch(image);
        const imageBlob = await response.blob();
        await uploadBytes(storageRef, imageBlob);
        imageUrl = await getDownloadURL(storageRef);
      }else{
        imageUrl = userData.image;
      }

      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        const userRef = doc(db, 'users', userId);

        await updateDoc(userRef, {
          image: imageUrl,
          username: newUsername,
          email: newEmail,
        });

        Alert.alert('Successful', 'Personal Info added successfully.', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

        setUsername('');
        setEmail('');
        setImage(null);
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
      <Header
        title='Personal Information'
      />
        <View style={styles.container}>
        <Pressable style={styles.logoContainer} onPress={pickImageAsync}>
                    {image ? (
                      <Image source={{ uri: image.uri }} style={styles.selectedImage} />
                    ) : (
                      <View style={styles.chooseImageContainer}>
                        <Ionicons name="md-image-outline" size={24} color="white" />
                        <Text style={styles.choosePhoto}>Add Photo</Text>
                      </View>
                    )}
                </Pressable>
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

export default ChangePersonalInfoForm;

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
    },
    logoContainer: {
        alignItems: "center",
    },
    choosePhoto: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
    },
    chooseImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
        backgroundColor: '#FFC20F',
        borderRadius: 10,
    },
    selectedImage: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 16,
    },
})