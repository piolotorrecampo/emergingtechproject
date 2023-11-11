import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FormTextInput } from '../../components/FormTextInput'
import CustomButton from '../../components/CustomButton'

const ChangePersonalInfoForm = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>Personal Information</Text>
            <FormTextInput 
              title="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <FormTextInput 
              title="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <FormTextInput 
              title="Email"
              value={email}
              onChangeText={setEmail}
            />
            <CustomButton
                title="Change Personal Information"
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