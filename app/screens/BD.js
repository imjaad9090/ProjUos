//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "react-native-firebase";
import md5 from './lib/md5';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

// create a component
class BD extends Component {

    constructor(props){
        super(props)
        var user = firebase.auth().currentUser;

        this.state = {
            visible: false,
            messages:[],
            id:user.uid
          };
        this.chatRef = firebase.database().ref().child('BD/');
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);
    }


    static navigationOptions=({ navigation })=>({
        title: 'Business Department',  
        //headerTintColor: 'white', 
        headerStyle:{
        backgroundColor:'#eee'
        },
        headerTitleStyle:{
            color:'black'
        }
    })



    
    listenForItems(chatRef) {
        const { params } = this.props.navigation.state;
        var user = firebase.auth().currentUser;
        chatRef.on('value', (snap) => {
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    name: child.val().name,
                    avatar: child.val().userimage, 
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        //aded
                        _id: child.val().uid,
                        name: child.val().name,
                        avatar: child.val().userimage, 

                    }
                });
            });

            this.setState({
                messages: items,
                visible:false
            })
        });
        }


    /*generateChatId() {
        const { params } = this.props.navigation.state;

        var user = firebase.auth().currentUser;
        //console.log(user.uid)
        //console.log(params.goid)
        if(user.uid > params.goid)
        return `${user.uid}-${params.goid}`
    else
        return `${params.goid}-${user.uid}`

    }*/
    



    componentDidMount(){
        this.listenForItems(this.chatRefData);
        var user = firebase.auth().currentUser;

        firebase.database().ref('Accounts/' + user.uid).once('value').then((snapshot) =>{
            var username = (snapshot.val() && snapshot.val().name);
           var imageUrl = (snapshot.val() && snapshot.val().image);
           this.setState({myusername:username})
           this.setState({myimage:imageUrl})
          });

    }

    componentWillMount() {
        
      }

      componentWillUnmount(){
          this.chatRefData.off()
      }

      
      onSend(messages = []) {
        var user = firebase.auth().currentUser;
               
          messages.forEach(message => {
            
            var now = new Date().getTime()
            this.chatRef.push({
                _id: now,
                name:this.state.myusername,
                userimage:this.state.myimage,
                text: message.text,
                createdAt: now,
                uid: user.uid,
                order: -1 * now
            })
        })
        
    }





    render() {
        return (
            <LinearGradient colors={['#e1eec3','#f05053']} style={styles.container}>
         <Spinner visible={this.state.visible}/>

            <GiftedChat
                messages={this.state.messages}
                placeholder="Type a message.."
                onSend={this.onSend.bind(this)}
                user={{
                    _id: this.state.id,
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
export default BD;
