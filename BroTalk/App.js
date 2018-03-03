import React from 'react';
import { StyleSheet, Text, View, ToolbarAndroid } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LoginScreen } from './Screens/LoginScreen';

//router
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
},
{
  initialRouteName: 'Login',
}
);
