import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormTextInput } from '../../components/FormTextInput';
import { ShowHidePasssword } from '../../components/FormTextInput';
import { useUser } from '../../context/UserContext';

import { db } from "../../services/firebase";
import { doc, updateDoc, query, where, getDocs, collection } from '@firebase/firestore';

const ChangePasswordForm = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const { userData } = useUser();

  const handleChangePassword = async (username, newPassword, oldPassword) => {
    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        const userRef = doc(db, 'users', userId);

        console.log(userData.password);
        console.log(oldPassword);

        if (userData.password === oldPassword) {
          await updateDoc(userRef, {
            password: newPassword,
          });
          setPassword('');
          setCurrentPassword('');
          console.log('Update successful');
          navigation.navigate('Account');
        } else {
          console.log("Password not matched.")
        }
      } else {
        console.log('User not found: Please check the username and try again.');
      }
    } catch (error) {
      console.error('Error during password update:', error.message);
    }
  };

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  }

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>Password</Text>
            <FormTextInput 
              title="Current Password"
              value={currentPassword}
              onChangeText={(value) => setCurrentPassword(value)}
              secureTextEntry={!hidePassword} 
            />  
            <FormTextInput 
              title="Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={!hidePassword} 
            />   
             <ShowHidePasssword
              onPress={handleHidePassword}
              state={hidePassword}
            />
            <CustomButton
              onPress={() => handleChangePassword(userData.username, password, currentPassword)}
              title="Change Password"
            />
        </View>
    </SafeAreaView>
  )
}

export default ChangePasswordForm

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