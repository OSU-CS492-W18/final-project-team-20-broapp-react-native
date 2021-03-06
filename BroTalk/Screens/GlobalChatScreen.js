import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Button,
    ListView, CachedImage
} from 'react-native';
import LayoutStyle from '../Styles/Layout.js';
import { StackNavigator } from 'react-navigation';
import store from 'react-native-simple-store';
import ChatStyles from '../Styles/ChatStyles';
import SendBird from 'sendbird';
import { CHANNEL_URL, APP_ID, BroArray } from "../protected";
import moment from 'moment';

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
            channelQuery: null,
            text: "",
            messages: [],
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

    componentDidMount() {
        let self = this;
        var channelHandler = new sb.ChannelHandler();
        channelHandler.onMessageReceived = function(channel, message){
            var newMessage = [];
            newMessage.push(message);
            var messageList = newMessage.concat(self.state.messages);
            
            self.setState({ 
                messages: messageList, 
                dataSource: self.state.dataSource.cloneWithRows(messageList)
            });
        };

        sb.addChannelHandler("GlobalChat", channelHandler);
    }

    openChannel() {
        var self = this;
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
                self.setState({
                    channelQuery: channel.createPreviousMessageListQuery()
                });
                self.updateMessages(false);
            });
        });
    }

    updateMessages(update){
        var self = this;
        // Fetch previous 30 messages in channel from API
        if(update){
            self.state.messages = []
            self.state.channelQuery = channel.createPreviousMessageListQuery();
        }
        let messageList = self.state.channelQuery;
        messageList.load(30, false, (response, error) => {
            if (error) {
                console.error(error);
                return;
            }

            var messages = [];
            for(var i = 0; i < response.length; i++) {
                messages.push(response[i]);
            }

            //save messages and update state
            var newMessages = self.state.messages.concat(messages.reverse());
            console.log(newMessages);
            self.setState({
                messages: newMessages,
                dataSource: self.state.dataSource.cloneWithRows(newMessages)});
        });
    }

    sendMessage(text) {
        var self = this;
        //Send test message
        var message = BroArray[Math.floor((Math.random() * 6) + 1)];
        if(text){
            message = text;
        }
        console.log(message);
        channel.sendUserMessage(message, function (message, error) {
            if (error) {
                console.log(error);
                return;
            }
            console.log("Sent Message:" + toString(message));
            var messages = []
            messages.push(message);

            //save new message and update state
            var newMessages = messages.concat(self.state.messages);
            console.log(newMessages);
            self.setState({
                messages: newMessages,
                dataSource: self.state.dataSource.cloneWithRows(newMessages)});
        });
    }

    onChangedMessageText = (newText) => {
        this.setState({
            text: newText
        });
        console.log(this.state.text);
    }

    renderRowMsg = (rowData) => {
        if (rowData.messageType === 'user') {
            return (
            <TouchableHighlight underlayColor='#f7f8fc' onPress={() => console.log(rowData)}>
                <View style={[ChatStyles.listItem, {transform: [{ scaleY: -1 }]}]}>
                    <View style={ChatStyles.senderContainer}>
                        <Text style={[ChatStyles.senderText, {color: '#3e3e55'}]}>{rowData.sender.nickname}</Text>
                        <Text style={[ChatStyles.senderText, {color: '#343434', fontWeight: 'bold'}]}>{rowData.message}</Text>
                        <Text style={[ChatStyles.senderText, {color: '#343434'}]}>{moment(rowData.createdAt).calendar()}</Text>
                    </View>
                </View>
            </TouchableHighlight>
            );
        } else {
            return null;
        }
    }

    renderMsgList() {
        return (
            <View style={[ChatStyles.chatContainer, {transform: [{ scaleY: -1 }]}]}>
            <ListView
                enableEmptySections={true}
                onEndReached={() => this.updateMessages(true)}
                onEndReachedThreshold={40}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this.renderRowMsg(rowData)}/>
            </View>
        );
    }

    renderInputs(){
        return (
        <View style={ChatStyles.inputContainer}>
            <View style={ChatStyles.buttonView}>
                <Button
                    style={ChatStyles.sendButton}
                    title="Bro..."
                    onPress={() => this.sendMessage("Bro...")}
                />
            </View>
            <View style={ChatStyles.buttonView}>
                <Button
                    style={ChatStyles.sendButton}
                    title="Bro!"
                    onPress={() => this.sendMessage("Bro!")}
                />
            </View>
            <View style={ChatStyles.buttonView}>
                <Button
                    style={ChatStyles.sendButton}
                    title="Bra!"
                    onPress={() => this.sendMessage("Bra!")}
                />
            </View>
            <View style={ChatStyles.buttonView}>
                <Button
                    style={ChatStyles.sendButton}
                    title="Rand"
                    onPress={() => this.sendMessage()}
                />
            </View>
        </View>
        );
    }

    render() {
        return (
            <View style={ChatStyles.container}>
                {this.renderMsgList()}
                {this.renderInputs()}
            </View>
        );
    }
}