import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './screens/LandingPage';

export default function App() {
  return (
    <View style={styles.container}>
      <LandingPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
