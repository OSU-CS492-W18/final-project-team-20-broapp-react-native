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
            UserName: "",
            PassWord: "",
        };
    }

    changeScreen(screenName) {
        this.props.navigation.navigate(screenName);
    }

    updateUserName = (user) => {
        this.setState({ UserName: user});
        console.log(user);
    }

    updatePassword = (pass) => {
        this.setState({ PassWord: pass });
        console.log(pass);
    }

    render() {
        return (
            <View style={LayoutStyle.container}>
                <Text>Choose a name Bro!</Text>
                <TextInput
                    style={LayoutStyle.loginTextInput}
                    onChangeText={this.updateUserName}
                    value={this.state.UserName}
                />
                {/* <Text>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={LayoutStyle.loginTextInput}
                    onChangeText={this.updatePassword}
                    value={this.state.PassWord}
                /> */}
                <Button
                    title="Login Bro!"
                    onPress={() => this.changeScreen('Details')}
                />
            </View>
        );
    }
}