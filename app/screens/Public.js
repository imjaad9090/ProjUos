//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Platform,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "react-native-firebase";
import md5 from './lib/md5';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
// create a component
class Public extends Component {

    static navigationOptions =({ navigation }) =>{
        drawerLockMode: 'locked-closed'
    
    }

    constructor(props){
        super(props)
        var user = firebase.auth().currentUser;

        this.state = {
            visible: false,
            messages:[],
            id:user.uid
          };
        this.chatRef = firebase.database().ref().child('Lounge/');
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);
    }


    static navigationOptions=({ navigation })=>({
        title: 'Lounge fu',  
        headerStyle:{
        backgroundColor:'#F2F9FF'
        },
        headerTitleStyle:{
            color:'#2a0845'
        }
    })



    
    listenForItems(chatRef) {
        const { params } = this.props.navigation.state;
        var user = firebase.auth().currentUser;
        chatRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
               // console.log(child)
                items.push({
                    createdAt: new Date(child.val().createdAt),
                    name: child.val().name,
                    text: child.val().text,
                    _id: child.val().createdAt,
                    
                    
                    avatar: child.val().userimage, 
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={{  flex: 1,
                backgroundColor:this.props.colors.background}}>
             <View style={styles.header}>
                    <View style={styles.headerInner}>


                        <Text style={styles.headerText}>Public Feed</Text>
                        


                    </View>
                </View>
         <Spinner visible={this.state.visible}/>

            <GiftedChat
                messages={this.state.messages}
                placeholder="Type a message.."
                onSend={this.onSend.bind(this)}
            
                user={{
                    _id: this.state.id,
                }}
                />
      </View>
      </TouchableWithoutFeedback>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Public);
  