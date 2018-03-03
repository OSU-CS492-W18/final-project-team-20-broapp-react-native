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
    }

    changeScreen(screenName) {
        this.props.navigation.navigate(screenName);
    }

    updateUserName = (user) => {
        this.setState({ UserName: user });
        console.log(user);
    }

    updatePassword = (pass) => {
        this.setState({ PassWord: pass });
        console.log(pass);
    }

    render() {
        return (
            <View style={LayoutStyle.container}>
                <Text style={LayoutStyle.h1Login}>Choose a name Bro!</Text>
                <TextInput
                    style={LayoutStyle.loginTextInput}
                    onChangeText={this.updateUserName}
                    value={this.state.UserName}
                />
                <Button
                    title="Login Bro!"
                    onPress={() => this.changeScreen('Menu')}
                />
            </View>
        );
    }
}