//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "react-native-firebase";
import md5 from './lib/md5';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

// create a component
class Chat extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            visible: true,
            messages:[]

          };
        this.user = firebase.auth().currentUser

        this.chatRef = firebase.database().ref().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);
    }


    static navigationOptions=({ navigation })=>({
        title: `${navigation.state.params.name}`,  
        headerTintColor: 'white', 
        headerStyle:{
            backgroundColor:'#0F3057'
        },
        headerTitleStyle:{
            color:'white'
        }
    })



    
    listenForItems(chatRef) {
        const { params } = this.props.navigation.state;

        var user = firebase.auth().currentUser;

        chatRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                var avatar = 'https://www.gravatar.com/avatar/' + ( child.val().uid == user.uid? md5(user.email) : md5(params.gomail))
                var username = params.name
                var imagelink = params.goimage
                console.log(username)
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    name: JSON.stringify(username),
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        //aded
                        _id: child.val().uid,
                        name: username,
                        avatar: imagelink, 

                    }
                });
            });

            this.setState({
                messages: items,
                visible:false
            })
        });
        }


    generateChatId() {
        const { params } = this.props.navigation.state;

        var user = firebase.auth().currentUser;
        //console.log(user.uid)
        //console.log(params.goid)
        if(user.uid > params.goid)
        return `${user.uid}-${params.goid}`
    else
        return `${params.goid}-${user.uid}`

    }
    



    componentDidMount(){
        this.listenForItems(this.chatRefData);

    }

    componentWillMount() {
        
      }

      componentWillUnmount(){
          this.chatRefData.off()
      }

      
      onSend(messages = []) {
        var user = firebase.auth().currentUser;

        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });
        messages.forEach(message => {
            var now = new Date().getTime()
            this.chatRef.push({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: user.uid,
                order: -1 * now
            })
        })
        
    }





    render() {
        return (
            <LinearGradient colors={['#076585','#fff']} style={styles.container}>
         <Spinner visible={this.state.visible}/>

            <GiftedChat
                messages={this.state.messages}
                placeholder="Type a message.."
                onSend={this.onSend.bind(this)}
                user={{
                    _id: this.user.uid,
                    name: this.state.userName
                }}
                />
      </LinearGradient>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    
    },
});

//make this component available to the app
export default Chat;
