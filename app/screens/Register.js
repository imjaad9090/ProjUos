//import liraries
import React, { Component } from 'react';
import { View,TouchableWithoutFeedback, Text, StyleSheet,Picker,Keyboard,Button,TouchableOpacity,KeyboardAvoidingView,TextInput,Alert,AsyncStorage,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Drawer from 'react-native-drawer'
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { Dropdown } from 'react-native-material-dropdown';

// create a component
class Register extends React.Component {
    static navigationOptions = {
        header:null
    }

    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            username:'',
            role:'Student',
            online:false
        }
    }

     register(){
        const { navigate,pop } = this.props.navigation;

        var db = firebase.database().ref();

        const { email, password } = this.state;


        if(this.state.email != '' && this.state.password.length >=6 & this.state.username != '')
        {
            firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            var user = firebase.auth().currentUser;

        console.log('success')
firebase.database().ref().child('Accounts').child(user.uid).set({
    email: this.state.email,
    uid: user.uid,
    name: this.state.username,
    role: this.state.role,
    image:"https://firebasestorage.googleapis.com/v0/b/unichatio-f63db.appspot.com/o/user.png?alt=media&token=644dcea8-1c60-4615-998c-8e29627b1f8b",
    online: this.state.online,
    bio:'Apparently, this user prefers to keep an air of mystery about them.'
})
        

var user = firebase.auth().currentUser;

user.sendEmailVerification().then(async function() {
    console.log('email has been sent')
    await AsyncStorage.setItem('userToken', 'LoggedIn');
    Alert.alert('Verify Email','A verification email has been sent to your inbox, please verify yourself and log in.')
    //navigate('App');
    pop()
      })
console.log(user)
          
 }).catch(function(error) {

    var showErr = JSON.stringify(error.message)
    Alert.alert('Ohh Snapp..',showErr)

});

}
else {
    alert('One of the fields are empty or password is less than 6 characters')
}
        
    }
     
    render() {
        const { navigate,pop } = this.props.navigation;
        let data = [{
            value: 'Student',
          }, {
            value: 'Teacher',
          }];
        return (
        <KeyboardAvoidingView behavior="padding">
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           <ImageBackground source={require('./Images/23.png')}  style={styles.bgImage}>

        <View style={{alignSelf:'center',bottom:10}}>

        <Icon name="info" size={30} color="white" onPress={()=>Alert.alert('Just a moment','Unichat team cares for your privacy, a verfication link will be sent to your email for authentication purposes. Once verified you will be able to log into the application.')} />
        </View>
          <Dropdown
          label="I am here as"
          animationDuration={100}
          value={this.state.role}
          fontSize={15}
          overlayStyle={{backgroundColor:'rgba(0,0,0,0.2)'}}
            containerStyle={{width:280,backgroundColor:'white',padding:5,borderRadius:6,borderWidth:2}}
            onChangeText={(itemValue, itemIndex) =>
            this.setState({ role: itemValue,show:true })}        
            data={data}
      />


        <TextInput
                style={styles.input}
                //value={this.state.email}
                onChangeText={(username) => this.setState({username})}
                multiline={false}
                placeholder="What should we call you"
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"
                onSubmitEditing={(event) => { 
                    this.refs.two.focus(); 
                  }}

              />

          <TextInput
          ref="two"
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
                onSubmitEditing={(event) => { 
                    this.refs.three.focus(); 
                  }}
              />



              <TextInput
        style={styles.input}
        ref="three"
        onChangeText={(password) => this.setState({password})}
        multiline={false}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        underlineColorAndroid="transparent"
        placeholderTextColor="#bdc3c7"

/>

       <TouchableOpacity activeOpacity={0.8} onPress={()=>this.register()} style={{backgroundColor:'white',borderRadius:19,width:'75%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#3d1767'}}>SIGN UP</Text>
            </TouchableOpacity>


            <View style={{flexDirection:'row'}}>
            <Text style={{color:'#fff',fontWeight:'200',fontSize:15,top:10}} onPress={()=>pop()}>Already have an account?</Text>
            </View>




</ImageBackground>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>

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
        marginVertical:5,
        height: 40,
        padding:8,
        borderWidth:2,
        borderColor:'rgba(0, 0, 0, 0.2)',
        borderRadius: 6,
        width:'75%',
        backgroundColor:'white',
        fontSize: 16,
        //color: "#2c3e50"
      },

      bgImage:{
          width:'100%',
          height:'100%',
          justifyContent:'center',
          alignItems:'center'
      }




});

//make this component available to the app
export default Register;
