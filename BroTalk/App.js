import React from 'react';
import { StackNavigator } from 'react-navigation';

//Screens
import { LoginScreen } from './Screens/LoginScreen';
import { MenuScreen } from "./Screens/MenuScreen";
import { GlobalChatScreen } from "./Screens/GlobalChatScreen";


//router
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Menu: {
    screen: MenuScreen,
  },
  GlobalChat: {
    screen: GlobalChatScreen,
  },
},
{
  initialRouteName: 'Login',
}
);
