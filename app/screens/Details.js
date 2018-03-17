//import liraries
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity,TextInput,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drawer from 'react-native-drawer'
import Location from '../misc/Location';
import Register from './Register';
import PropTypes from 'prop-types';
import Menu from '../misc/Menu';
import firebase from 'react-native-firebase';

// create a component
class Details extends Component {

constructor(){
    super()
    this.state={
        name:'',
        email:'',
        phone:null,
        id:''
    }
}

    componentDidMount(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
console.log(user)        
      console.log('signed in')
            } else {
              // User is signed out.
              // ...
            }
          });
         }
         sendmail(){
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
            console.log('email sent')
              }).catch(function(error) {
                // An error happened.
              });
         }

         componentWillMount(){
            var user = firebase.auth().currentUser;
            
            if (user != null) {
                this.state.name = user.displayName;
                this.state.email = user.email;
                this.state.phone = user.phoneNumber;
                this.state.id = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                                 // this value to authenticate with your backend server, if
                                 // you have one. Use User.getToken() instead.
              }
         }


    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:19,fontWeight:"bold"}}>Name : {this.state.name}</Text>
                <Text style={{fontSize:19,fontWeight:"bold"}}>Email : {this.state.email}</Text>
                <Text style={{fontSize:19,fontWeight:"bold"}}>Phone : {this.state.phone}</Text>
                <Text style={{fontSize:19,fontWeight:"bold"}}>ID : {this.state.id}</Text>


    <Button title="send mail" onPress={()=>this.sendmail()} />

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#da0',
    },
});

//make this component available to the app
export default Details;
