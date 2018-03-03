import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LayoutStyle from './Styles/Layout.js';

export default class App extends React.Component {


  render() {
    return (
      <View style={LayoutStyle.container}>
        <Text>Dank memes</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}


