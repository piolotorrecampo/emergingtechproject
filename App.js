// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Information from './components/Information/';
import ChangePersonal from './components/ChangePersonal/';
import ChangePassword from './components/Cpassword/';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Information">
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="ChangePersonal" component={ChangePersonal} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
