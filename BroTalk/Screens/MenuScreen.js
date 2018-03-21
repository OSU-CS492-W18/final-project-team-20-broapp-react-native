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
import { ShareButton } from '../Components/shareButton';

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
        
    }

    componentWillMount(){
        store.get("username").then(res => {
            if (res !== null || res !== undefined) {
                this.setState({
                    UserName: res
                });
            }
        });
    }

    navigateToChat(ChatName) {
        this.props.navigation.navigate(ChatName);
    }

    render() {
        return (
            <View style={LayoutStyle.container}>
                <Text>Bro Menu welcome: {this.state.UserName}</Text>
                <Button 
                    title="Global Chat"
                    onPress={() => this.navigateToChat("GlobalChat")}
                />
                <Button 
                    title="PlaceHolder Chat"
                    onPress={() => console.log("place holder navigation")}
                />
                <ShareButton/>
            </View>
        );
    }

}