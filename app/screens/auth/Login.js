//import liraries
import React, { Component } from 'react';
import { View, Text,Keyboard,TouchableWithoutFeedback,StyleSheet,ScrollView,Button,TouchableOpacity,KeyboardAvoidingView,TextInput,Image,ImageBackground,StatusBar,Alert,AsyncStorage,ActivityIndicator } from 'react-native';

import firebase from 'react-native-firebase';

// create a component
class Login extends React.Component {
    static navigationOptions = {
        header:null
    }

    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            logincolor:'white',
            logomargin:80,
            animating:false,
            disabled:false
        }
    }
        
    
    
        loginUser(){
        const { navigate } = this.props.navigation;

        const { email, password } = this.state;

        
              // User is signed in.
              if(this.state.email!='' && this.state.password != '')
              {
                this.setState({disabled:true,animating:true})

                firebase.auth().signInWithEmailAndPassword(email, password).then( async function() {
                await AsyncStorage.setItem('userToken', 'LoggedIn');

                navigate('App');
                //console.log('worked inside')
                 })
                 .catch((error)=>{
                // Handle Errors here.

                this.setState({disabled:false,animating:false,logincolor:'#e74c3c'})
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
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

     }
     _keyboardDidShow () {
        console.log('Keyboard Shown');
      }

      _keyboardDidHide () {
        console.log('Keyboard Hidden');

      }
    

    render() {
        return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground source={require('../Images/23.png')}  style={styles.bgImage}>
          <Image source={require('../Images/unichite.png')} style={{width:200,height:100,resizeMode:'contain',bottom:80}}/>

          <KeyboardAvoidingView style={{width:'100%',alignItems:'center'}} behavior="padding">

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
        returnKeyType="done"
        underlineColorAndroid="transparent"
        placeholderTextColor="#bdc3c7"

/>
</KeyboardAvoidingView>

            <TouchableOpacity disabled={this.state.disabled} activeOpacity={0.8} onPress={()=>this.loginUser()} style={{backgroundColor:this.state.logincolor,borderRadius:19,width:'75%',height:40, alignItems:'center',justifyContent:'center',marginVertical:10}}>
            
           
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#3d1767'}}>LOGIN</Text>

            
            </TouchableOpacity>

<TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('register')} style={{backgroundColor:'white',borderRadius:19,width:'75%',height:40,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#3d1767'}}>REGISTER</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row'}}>
            <Text style={{color:'#fff',fontWeight:'200',fontSize:15,top:10}} onPress={()=>this.props.navigation.navigate('forget')}>Having trouble logging in?</Text>
            </View>
            <View style={{paddingTop:19}}>
            <ActivityIndicator size="large" color='#fff' animating={this.state.animating}  />
            </View>
            
            {/* <MaterialIndicator color='white' size={23} animationDuration={5000} animating={this.state.animating}/> */}

              </ImageBackground>
              </TouchableWithoutFeedback>

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
        letterSpacing:2,
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
