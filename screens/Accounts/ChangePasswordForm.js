import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import CustomButton from '../../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FormTextInput } from '../../components/FormTextInput'

const ChangePasswordForm = () => {
    const [hidePassword, setHidePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>Password</Text>
            <FormTextInput 
              title="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!hidePassword} 
            />  
            <FormTextInput 
              title="Repeat Password"
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              secureTextEntry={!hidePassword} 
            />  
            <CustomButton
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