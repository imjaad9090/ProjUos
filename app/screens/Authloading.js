//import liraries
import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Image,
    NetInfo
  } from 'react-native';
  import Snackbar from 'react-native-snackbar';
  import firebase from 'react-native-firebase';
// create a component
class Authloading extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }


      // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type == 'none'){
            Snackbar.show({
                title: 'No connection available.',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'#e74c3c'
            });
        }})
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };






    render() {
        return (
            <View style={styles.container}>
            <Image source={require('./Images/logo.png')} style={{width:90,height:90,resizeMode:'contain'}} />
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
        backgroundColor: '#f8f8ff',
    },
});

//make this component available to the app
export default Authloading;
