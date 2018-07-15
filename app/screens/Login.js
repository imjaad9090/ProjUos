//import liraries
import React, { Component } from 'react';
import { View, Text,Keyboard,TouchableWithoutFeedback,StyleSheet,ScrollView,Button,TouchableOpacity,KeyboardAvoidingView,TextInput,Image,ImageBackground,StatusBar,Alert,AsyncStorage, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drawer from 'react-native-drawer'
import PropTypes from 'prop-types';
import CarrierInfo from 'react-native-carrier-info';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import { TextField } from 'react-native-material-textfield';
import GeoFencing from 'react-native-geo-fencing';
// create a component
class Login extends React.Component {
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

        
              // User is signed in.
              if(this.state.email!='' && this.state.password != '')
              {firebase.auth().signInWithEmailAndPassword(email, password).then( async function() {
                await AsyncStorage.setItem('userToken', 'LoggedIn');
            
                navigate('App');
                console.log('worked inside')
                 })
                 .catch(function(error){
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = JSON.stringify(error.message);
                Alert.alert('Something went wrong',errorMessage)
                // ...
              })
            }
            else {
                Alert.alert('Oww Snap','Looks like one of the field is empty')
            }
            
             
        
      

       



    }
     componentDidMount(){
        StatusBar.setHidden(true);

        
     }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground source={require('./Images/23.png')}  style={styles.bgImage}>
          <Image source={require('./Images/unichite.png')} style={{width:200,height:100,resizeMode:'contain',bottom:80}}/>
           <TextInput
                style={styles.input}
                selectionColor={'#3d1767'}

                onChangeText={(email) => this.setState({email})}
                multiline={false}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={(event) => { 
                    this.refs.SecondInput.focus(); 
                  }}
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />

              <TextInput
        style={styles.input}
        selectionColor={'#3d1767'}
        ref='SecondInput'
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

            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.register()} style={{backgroundColor:'white',borderRadius:19,width:'75%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#3d1767'}}>LOGIN</Text>
            </TouchableOpacity>

<TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('register')} style={{backgroundColor:'white',borderRadius:19,width:'75%',height:40,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#3d1767'}}>REGISTER</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row'}}>
            <Text style={{color:'#fff',fontWeight:'200',fontSize:15,top:10}} onPress={()=>this.props.navigation.navigate('forget')}>Having trouble logging in?</Text>
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
export default Login;
