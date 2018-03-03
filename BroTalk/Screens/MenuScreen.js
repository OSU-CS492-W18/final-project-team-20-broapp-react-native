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
import store from 'react-native-simple-store';

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
        
        this.state = { UserName: "Bro"};
        store.get("username").then(res => {
            if (res !== null || res !== undefined) {
                this.setState({
                    UserName: res
                });
            }
        });
    }

    render() {
        return (
            <View style={LayoutStyle.container}>
                <Text>Bro Menu welcome: {this.state.UserName}</Text>
            </View>
        );
    }

}