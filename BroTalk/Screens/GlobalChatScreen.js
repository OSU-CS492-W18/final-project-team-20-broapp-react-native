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
import * as SendBird from 'sendbird';

/***
 * Using SendBird:
 * https://sendbird.com/
 * https://blog.sendbird.com/react-native-chat-tutorial-one-build-chat-with-sendbird
 */

export class GlobalChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Global Chat',
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
                <Text>global chat</Text>
            </View>
        );
    }

}