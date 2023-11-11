import { StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const ChooseSetting = () => {

    const navigation = useNavigation();

  return (
    <SafeAreaView>
        <View style={styles.buttons}>
            <AccountButton 
                buttonTitle="Change Personal Information"
                buttonIcon={<MaterialIcons name='person' size={24} color="white" />}
                onPress={() => navigation.navigate('ChoosePersonalInfoForm')}
            />
            <AccountButton 
                buttonTitle="Change Password"
                buttonIcon={<MaterialIcons name='security' size={24} color="white" />}
                onPress={() => navigation.navigate('ChoosePasswordForm')}
            />
        </View>
    </SafeAreaView>
  )
}

export default ChooseSetting

const AccountButton = (props) => {
    return (
      <Pressable onPress={props.onPress} style={styles.accountButtonContainer}>
        <Text style={styles.buttonIcon}>{props.buttonIcon}</Text>
        <Text style={styles.buttonText}>{props.buttonTitle}</Text>
      </Pressable>
    )
  }

const styles = StyleSheet.create({
    accountButtonContainer: {
        width: screenWidth * 0.85,
        height: screenWidth * 0.15,
        flexDirection: 'row',
        alignItems: "flex-start",
        backgroundColor: "#FFC20F",
        padding: "5%",
        marginTop: "2%",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#FFC20F",
    },
    buttonText: {
        fontWeight: "bold",
        color: "#FFFFFF",
        fontSize: screenWidth * 0.04,
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})