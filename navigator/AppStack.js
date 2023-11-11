import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Account from '../screens/Accounts/Account'
import FoodDetail from '../screens/FoodDetail';
import MyProducts from '../screens/Accounts/MyProducts';
import ChooseSetting from '../screens/Accounts/ChooseSetting';
import ChangePasswordForm from '../screens/Accounts/ChangePasswordForm';
import ChangePersonalInfoForm from '../screens/Accounts/ChangePersonalInfoForm';
import AddProduct from '../screens/Accounts/AddProduct';
import UpdateProduct from '../screens/Accounts/UpdateProduct';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Foods">
      <Stack.Screen name="Foods" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="FoodDetail" component={FoodDetail} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
      <Stack.Screen name="MyProducts" component={MyProducts} options={{ headerShown: false }}/>
      <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }}/>
      <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{ headerShown: false }}/>
      <Stack.Screen name="ChooseSetting" component={ChooseSetting} options={{ headerShown: false }}/>
      <Stack.Screen name="ChoosePasswordForm" component={ChangePasswordForm} options={{ headerShown: false }}/>
      <Stack.Screen name="ChoosePersonalInfoForm" component={ChangePersonalInfoForm} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Foods') {
            return (
              <Ionicons
                name={
                  focused
                    ? 'fast-food'
                    : 'fast-food-outline'
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Favorites') {
            return (
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Account') {
            return (
              <MaterialCommunityIcons
                name={focused ? 'account' : 'account-outline'}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#402E32',
        tabBarStyle: {
          backgroundColor: "#FFC20F",
          height: 56,
        }
      })}
    >
      <Tab.Screen name="Foods" component={HomeStack} options={{ headerShown: false }}/>
      <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: false }}/>
      <Tab.Screen name="Account" component={AccountStack} options={{ headerShown: false }}/> 
    </Tab.Navigator>
  );
}

