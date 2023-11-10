import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import Register from '../screens/Register';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoardingScreen">
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name='Register'component={Register} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default AuthStack;