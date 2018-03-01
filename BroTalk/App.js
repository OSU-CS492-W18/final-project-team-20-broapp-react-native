import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LayoutStyle } from './Styles/Layout';
export default class App extends React.Component {
  render() {
    return (
      <View style={LayoutStyle.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}


