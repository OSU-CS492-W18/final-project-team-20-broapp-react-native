import React from 'react';
import { StyleSheet, Text, View, ToolbarAndroid } from 'react-native';
import LayoutStyle from '../Styles/Layout.js';



export class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
      return (
        <View style={LayoutStyle.container}>
          <ToolbarAndroid title="BroTalk" titleColor="black" style={LayoutStyle.toolbar} />
          <Text>Login Screen</Text>
        </View>
      );
    }
  }