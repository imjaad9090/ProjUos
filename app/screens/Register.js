//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity,TextInput,Alert,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drawer from 'react-native-drawer'
import PropTypes from 'prop-types';
import CarrierInfo from 'react-native-carrier-info';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import { TextField } from 'react-native-material-textfield';
import GeoFencing from 'react-native-geo-fencing';

// create a component
class Register extends Component {
    static navigationOptions = {
        header:null
    }

    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            username:'',
            role:''
        }
    }

    register(){
        const { navigate } = this.props.navigation;

        var db = firebase.database().ref();

        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            var user = firebase.auth().currentUser;

        console.log('success')
firebase.database().ref().child('Accounts').child(user.uid).set({
    email: this.state.email,
    uid: user.uid,
    name: this.state.username,
    role: this.state.role,
    image:" "
})
        {/*db.child('Users').push({
            email: this.state.email,
            uid: user.uid,
            name: this.state.username,
            role: this.state.role
        })
        db.child('Profile').push({
            email: this.state.email,
            uid: user.uid,
            name: this.state.username,
            role: this.state.role,
            image:" "
        })*/}


var user = firebase.auth().currentUser;
user.sendEmailVerification().then(function() {
    console.log('email has been sent')
      }).catch(function(error) {

        alert('ops we were unable to send confirmation email')
    });
console.log(user)
navigate('profile')
          })
        
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
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
     }

    render() {
        const { navigate,pop } = this.props.navigation;

        return (
            <LinearGradient colors={['#00BBF0','#00204A']} style={styles.container}>

          <View>

            <Button title="Login" onPress={()=>pop()} />

          <Text>{this.state.carrier}</Text>
                <Text>{this.state.netcode}</Text>
          <Text>{this.state.latitude}</Text>
          <Text>{this.state.longitude}</Text>


            <TextInput
                style={styles.input}
                //value={this.state.email}
                onChangeText={(role) => this.setState({role})}
                multiline={false}
                placeholder="Student / Teacher ?"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />

        <TextInput
                style={styles.input}
                //value={this.state.email}
                onChangeText={(username) => this.setState({username})}
                multiline={false}
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />

          <TextInput
                style={styles.input}
                //value={this.state.email}
                onChangeText={(email) => this.setState({email})}
                multiline={false}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
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
          <Button title="Signup" onPress={() =>this.register()}/>
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
export default Register;
