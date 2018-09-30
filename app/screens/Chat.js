//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Platform } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "react-native-firebase";
import md5 from './lib/md5';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import Icon from "react-native-vector-icons/Feather";

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
        headerTintColor: '#fff', 
        headerStyle:{
            backgroundColor:'#2A3963'
        },
        drawerLockMode: 'locked-closed',

        headerTitleStyle:{
            color:'#fff'
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
            <View style={{flex: 1,
                backgroundColor:this.props.colors.background}}>
                 <View style={styles.header}>
                        <View style={styles.headerInner}>
    
    
                        <Icon name="arrow-left" size={26} onPress={()=>this.props.navigation.pop()} color={'white'} />
         
                            <Text style={styles.headerText}>{this.props.navigation.state.params.name}</Text>
                            
    
    
                        </View>
                    </View>
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
      </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F2F9FF'
    },
    header: {
        height: 50,
        paddingHorizontal: 13,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: Platform.OS == "ios" ? 20 : 0,
        flexDirection: 'row',
    
        backgroundColor: '#0b2441'
    },
    headerInner: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row'
    },
    headerText: {
        flexDirection: 'row',
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontSize: 19,
        color: 'white',
        fontWeight: '400'
    },
});

//make this component available to the app
const mapStateToProps = (state) => {
    return { colors: state.theme.appTheme };
  }
  
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Chat);
  