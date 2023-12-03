import React,  { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserProvider } from './context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnBoardingScreen from './screens/OnBoardingScreen';
import Login from './screens/Login';
import Register from './screens/Register'
import Home from './screens/Home';
import Favorites from './screens/Favorites';
import Account from './screens/Accounts/Account'
import FoodDetail from './screens/FoodDetail';
import MyProducts from './screens/Accounts/MyProducts';
import ChooseSetting from './screens/Accounts/ChooseSetting';
import ChangePasswordForm from './screens/Accounts/ChangePasswordForm';
import ChangePersonalInfoForm from './screens/Accounts/ChangePersonalInfoForm';
import AddProduct from './screens/Accounts/AddProduct';
import UpdateProduct from './screens/Accounts/UpdateProduct';
import { useFonts } from 'expo-font';
import SearchScreen from './screens/SearchScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [loaded] = useFonts({
    poppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    poppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    poppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
    poppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const checkLoginStatus = async () => {
    const value = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(value === 'true');
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (!loaded || isLoggedIn === null) {
    return null;
  }


  if (isLoggedIn === null) {
    return null; 
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <UserProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="OnBoarding"
              component={ OnBoardingScreen }
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={ Login }
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Dashboard" 
              component={ AppStack } 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={ Register } 
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </UserProvider>
      </SafeAreaProvider>
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


const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="FoodsScreen">
      <Stack.Screen name="FoodsScreen" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="FoodDetailScreen" component={FoodDetail} options={{ headerShown: false }}/>
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
      <Stack.Screen name="ChooseSetting" component={ChooseSetting} options={{ headerShown: false }}/>
      <Stack.Screen name="ChoosePasswordForm" component={ChangePasswordForm} options={{ headerShown: false }}/>
      <Stack.Screen name="ChoosePersonalInfoForm" component={ChangePersonalInfoForm} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
};

const MyProductStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyProducts">
      <Stack.Screen name="MyProducts" component={MyProducts} options={{ headerShown: false }}/>
      <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }}/>
      <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }}/>
      <Stack.Screen name="FoodDetail" component={FoodDetail} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};


function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Foods') {
            return (
              <MaterialCommunityIcons
                name={ focused ? 'food' : 'food-outline' }
                size={24}
                color={color}
              />
            );
          } else if (route.name === 'Favorites') {
            return (
              <MaterialCommunityIcons
                name={focused ? 'bookmark' : 'bookmark-outline'} 
                size={24} 
                color={color} 
              />
            );
          } else if (route.name === 'MyProductStack') {
            return (
              <MaterialCommunityIcons
                name={focused ? 'storefront' : 'storefront-outline'}
                size={26}
                color={color}
              />
            );
          } else if (route.name === 'Account') {
            return (
              <MaterialCommunityIcons
                name={focused ? 'account' : 'account-outline'}
                size={26}
                color={color}
              />
            );
          }
        },
        tabBarLabel: '',
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#402E32',
        tabBarCentered: true,
        tabBarStyle: {
          backgroundColor: "#FFC20F",
          height: 56,
          padding: 10,
        }
      })}
    >
      <Tab.Screen 
          name="Foods" 
          component={HomeStack} 
          options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesStack} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="MyProductStack" 
        component={MyProductStack} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountStack} 
        options={{ headerShown: false }}
      /> 
    </Tab.Navigator>
  );
}

