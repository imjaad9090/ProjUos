/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,ActivityIndicator
} from 'react-native';

import {Auth} from "./config/routes";
import {Stack} from './config/routes';
import firebase from 'react-native-firebase';


 export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    login: false,
    verified: false,
    };
  }

   componentWillMount(){  let currentComponent = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user)
        currentComponent.setState({login:true})

        //TURNING THIS OFF FOR SOME TIME 
        //TURN THIS ON AGAIN BY PASTING THIS INSIDE if CONDITION
        //==> && this.state.verified 
        //& uncomment below line :D 
        //currentComponent.setState({verified:user.emailVerified})
//
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });   }
  render(){

    if (this.state.login ) {
      return <Stack />;
    } else {
      return <Auth />;
    }
  }
}

