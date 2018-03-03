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
            UserName: "Brosuif"
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