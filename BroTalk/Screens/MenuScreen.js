import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';
import LayoutStyle from '../Styles/Layout.js';
import { StackNavigator } from 'react-navigation';

export class MenuScreen extends React.Component {
    static navigationOptions = {
        title: 'BroTalk Menu',
        headerStyle: {
            backgroundColor: '#4286f4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={LayoutStyle.container}>
                <Text>Bro Menu</Text>
            </View>
        );
    }

}