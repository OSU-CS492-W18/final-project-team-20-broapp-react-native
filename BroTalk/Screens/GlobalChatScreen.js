import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ListView
} from 'react-native';
import LayoutStyle from '../Styles/Layout.js';
import { StackNavigator } from 'react-navigation';
import store from 'react-native-simple-store';
import ChatStyles from '../Styles/ChatStyles';
import SendBird from 'sendbird';
import { CHANNEL_URL, APP_ID, BroArray } from "../protected";
var sb = null;
var dataStore = null;
var channel = null;
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
        sb = SendBird.getInstance();
        dataStore = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            UserName: "Bro",
            channel: null,
            text: "",
            dataSource: dataStore.cloneWithRows([])
        };
        this.openChannel();        

        store.get("username").then(res => {
            if (res !== null || res !== undefined) {
                this.setState({
                    UserName: res
                });
            }
        });
    }

    openChannel() {
        sb.OpenChannel.getChannel(CHANNEL_URL, function (newChannel, error) {
            if (error) {
                console.error(error);
                return;  
            }

            // Successfully fetched the channel.
            console.log("Channel fetched:" + newChannel);
            // Enter global channel
            newChannel.enter((response, error) => {
                if (error) {
                    console.error(error);
                    return;
                }
                console.log(response);
                channel = newChannel;
            });
        });
    }

    sendMessage() {
        //Send test message
        var message = BroArray[Math.floor((Math.random() * 3) + 1)];
        console.log(message);
        channel.sendUserMessage(message, function (message, error) {
            if (error) {
                console.log(error);
                return;
            }
            console.log("Sent Message:" + toString(message));
        });
    }

    onChangedMessageText = (newText) => {
        this.setState({
            text: newText
        });
        console.log(this.state.text);
    }

    render() {
        return (
            <View style={LayoutStyle.container}>
            {/* <ListView
                enableEmptySections={true}
                onEndReached={() => this._getChannelMessage(false)}
                onEndReachedThreshold={PULLDOWN_DISTANCE}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
                    if (rowData.messageType == 'user') {
                    return (
                        <View style={[styles.listItem, {transform: [{ scaleY: -1 }]}]}>
                            <View style={ChatStyles.senderContainer}>
                            <Text style={[ChatStyles.senderText, {color: '#3e3e55'}]}>{rowData.sender.nickname}</Text>
                            <Text style={[ChatStyles.senderText, {color: '#343434', fontWeight: 'bold'}]}>{rowData.message}</Text>
                            </View>
                        </View>
                    );
                    } else {
                        return null;
                    }
                }}/> */}

                <View style={ChatStyles.inputContainer}>
                    <TextInput
                        style={ChatStyles.textInput}
                        placeholder={'Please type mesasge...'}
                        ref='textInput'
                        onChangeText={this.onChangedMessageText}
                        value={this.state.text}
                    />
                    <Button
                        style={ChatStyles.sendButton}
                        title="Bro down!"
                        onPress={() => console.log("hello")}
                    />
                    <Button
                        title="Chat Bro!"
                        onPress={() => this.sendMessage()}
                    />
                </View>
            </View>
        );
    }

}