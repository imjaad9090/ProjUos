//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity,TextInput,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drawer from 'react-native-drawer'
import PropTypes from 'prop-types';
import CarrierInfo from 'react-native-carrier-info';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import { TextField } from 'react-native-material-textfield';
import GeoFencing from 'react-native-geo-fencing';

// create a component
class Login extends Component {
    static navigationOptions = {
        header:null
    }

    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }

    register(){
        const { navigate } = this.props.navigation;

        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            navigate('profile')

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
    }
     componentDidMount(){
        
        const polygon = [
            { lat: 31.52312970169497, lng:74.32199478149413 },
            { lat: 31.52077011411445, lng: 74.3208360671997 },
            { lat: 31.516325147731852, lng: 74.32474136352539 },
            { lat: 31.519489692808282, lng: 74.3291187286377 },
            { lat: 31.523916217643997, lng: 74.32729482650757 },
            { lat: 31.52312970169497, lng:74.32199478149413 }
          ];

          navigator.geolocation.getCurrentPosition(
            (position) => {
              let point = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
        
              GeoFencing.containsLocation(point, polygon)
                .then(() => console.log('inside'))
                .catch(() => console.log('outt'))
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 20000 }
          );
     }

    render() {
        return (
            <LinearGradient colors={['#eee','#5628B4']} style={styles.container}>

          <View>
          <Text>{this.state.carrier}</Text>
                <Text>{this.state.netcode}</Text>
          <Text>{this.state.latitude}</Text>
          <Text>{this.state.longitude}</Text>
          <Button  title="Forgot password" onPress={()=>this.props.navigation.navigate('forget')}/>

            <Button  title="Register" onPress={()=>this.props.navigation.navigate('register')}/>
          <TextInput
                style={styles.input}
                //value={this.state.email}
                onChangeText={(email) => this.setState({email})}
                multiline={false}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />

              <TextInput
        style={styles.input}
//value={this.state.email}
        onChangeText={(password) => this.setState({password})}
        multiline={false}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        underlineColorAndroid="transparent"
        placeholderTextColor="#bdc3c7"

/>
          <Button title="Login" onPress={() =>this.register()}/>
          </View>
          </LinearGradient>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    justifyContent:'center',
    paddingLeft: 15,
    paddingRight: 15
    },
    input: {

        height: 40,
        padding:8,
        borderColor:'rgba(52, 52, 52, 0.0)',
        borderRadius: 2,
        marginTop:5,
        width:'100%',
        backgroundColor:'white',
        fontSize: 16,
        //color: "#2c3e50"
      },
});

//make this component available to the app
export default Login;
