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
import SendBird from 'sendbird';
import { CHANNEL_URL, APP_ID } from "../protected";

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
        var channel;
        this.state = { 
            UserName: "Bro",
            channel: null  
        };
        store.get("username").then(res => {
            if (res !== null || res !== undefined) {
                this.setState({
                    UserName: res
                });
            }
        });
    }

    openChannel(){
        const sb = SendBird.getInstance();
        sb.OpenChannel.getChannel(CHANNEL_URL, function(channel, error) {
            if(error) {
                console.error(error);
                return;
            }
            
            // Successfully fetched the channel.
            console.log("Channel fetched:" + channel);
            
            // Enter global channel
           channel.enter( function(response, error){
                if (error) {
                    console.error(error);
                    return;
                }
            });

            //Send test message
            channel.sendUserMessage("Hello bros", function(message, error) {
                if (error) {
                  console.log(error);
                  return;
                }
                console.log("Sent Message");
            }); 
            
        });
    }

    render() {
        return (
            <View style={LayoutStyle.container}>
                <Text>global chat</Text>
                <Button
                    title="Chat Bro!"
                    onPress={() => this.openChannel()}
                />
            </View>
        );
    }

}