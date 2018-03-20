import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
} from 'react-native';
import LayoutStyle from '../Styles/Layout.js';
import { StackNavigator } from 'react-navigation';
import store from 'react-native-simple-store';
import SendBird from 'sendbird';
import { APP_ID } from "../protected";

export class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'BroTalk Login',
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
        this.state = {
            UserName: ""
        };

        store.get("username").then(res => {
            if(res !== null || res !== undefined) {
                this.setState({
                    UserName: res
                });
            }
        });
    }

    changeScreen() {
        store.update("username", this.state.UserName);
        const userName = this.state.UserName;
        console.log("User: " + userName);

        const sb = new SendBird({ 'appId': APP_ID });
        // Connect to SendBird API
        sb.connect(this.state.UserName, (user, error) => {
            if (error) {
                console.log("Error Logging in:" + error);
            } else {
                sb.updateCurrentUserInfo(userName, null, (user, error) => {
                    if (error) {
                        console.log("Error Updating User in:" + error);
                    } else {
                        this.setState({
                            UserName: '',
                        }, () => {
                            console.log("Logged in!");
                            this.props.navigation.navigate('Menu');
                        });
                    }
                })
            }
        })

        this.props.navigation.navigate('Menu');
    }

    updateTextBoxUserName = (user) => {
        this.setState({ UserName: user });
        console.log(user);
    }

    render() {
        return (
            <View style={LayoutStyle.container}>
                <Text style={LayoutStyle.h1Login}>Choose a name Bro!</Text>
                <TextInput
                    style={LayoutStyle.loginTextInput}
                    onChangeText={this.updateTextBoxUserName}
                    value={this.state.UserName}
                />
                <Button
                    title="Login Bro!"
                    onPress={() => this.changeScreen()}
                />
            </View>
        );
    }
}