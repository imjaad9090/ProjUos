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
class Forget extends Component {
    static navigationOptions = {
        header:null
    }

    constructor(){
        super()
        this.state={
            email:'',
        }
    }

    forget(){
        const { navigate } = this.props.navigation;

        const { email } = this.state;

        var auth = firebase.auth();
var emailAddress = this.state.email;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  console.log('password reset email sent')
  navigate('login')
}).catch(function(error) {
  // An error happened.
});
    }
     componentDidMount(){
        
        
     }

    render() {
        return (
            <LinearGradient colors={['#eee','#5628B4']} style={styles.container}>

          <View>
          <Text>{this.state.carrier}</Text>
                <Text>{this.state.netcode}</Text>
          <Text>{this.state.latitude}</Text>
          <Text>{this.state.longitude}</Text>

            <Button  title="Back" onPress={()=>this.props.navigation.pop()}/>
          <TextInput
                style={styles.input}
                //value={this.state.email}
                onChangeText={(email) => this.setState({email})}
                multiline={false}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />

              
          <Button title="Confirm" onPress={() =>this.forget()}/>
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
export default Forget;
