import React from 'react';
import { StackNavigator } from 'react-navigation';

//Screens
import { LoginScreen } from './Screens/LoginScreen';
import { MenuScreen } from "./Screens/MenuScreen";


//router
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Menu: {
    screen: MenuScreen,
  },
},
{
  initialRouteName: 'Login',
}
);
