import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigator/AuthStack'
import AppStack from './navigator/AppStack';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {<AuthStack/>}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
