//import liraries
import React, { Component } from 'react';
import { View, Text,Keyboard,TouchableWithoutFeedback,StyleSheet,ScrollView,Button,TouchableOpacity,KeyboardAvoidingView,TextInput,Image,ImageBackground,StatusBar,Alert,AsyncStorage } from 'react-native';

import firebase from 'react-native-firebase';
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
        if(this.state.email!=''){
        auth.sendPasswordResetEmail(emailAddress).then(function() {
  Alert.alert('Success.','Password reset email has been sent.')
  navigate('login')
}).catch(function(error) {
    Alert.alert('Ops we are sorry','The recovery link could not be sent to this email, please try again.')
  // An error happened.
});

}
else {
    alert('Please enter a valid email address.')
}
    }
     componentDidMount(){
        
        
     }

     render() {
        return (
            <KeyboardAvoidingView behavior="padding">
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground source={require('../Images/23.png')}  style={styles.bgImage}>
          <Image source={require('../Images/unichite.png')} style={{width:200,height:100,resizeMode:'contain',bottom:80}}/>
           <TextInput
                style={styles.input}
                selectionColor={'#3d1767'}

                onChangeText={(email) => this.setState({email})}
                multiline={false}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="done"
                
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"

              />

              

            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.forget()} style={{backgroundColor:'white',borderRadius:19,width:'75%',height:40,alignItems:'center',justifyContent:'center',marginVertical:10}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#3d1767'}}>Send Confirmation</Text>
            </TouchableOpacity>



            <View style={{flexDirection:'row'}}>
            <Text style={{color:'#fff',fontWeight:'200',fontSize:15,top:10}} onPress={()=>this.props.navigation.pop()}>Go back to login.</Text>
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
export default Forget;
