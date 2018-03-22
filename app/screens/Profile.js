//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,StatusBar,Image,TouchableOpacity,TextInput,Alert,AsyncStorage,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drawer from 'react-native-drawer'
import Register from './Register';
import PropTypes from 'prop-types';
import TimeAgo from 'react-native-timeago';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-crop-picker';


// create a component
class Login extends React.Component {
    static navigationOptions =  {
        
        
    }
    constructor(){
        super()

        this.state={
            uri: 'https://im2.ezgif.com/tmp/ezgif-2-0a0115986d.png',
            basestring:null,
        }
    }

    state={
        dname:'',
        phone:'',
        last:'',

    };
    
    delete(){
const { navigate } = this.props.navigation;
var user = firebase.auth().currentUser;

firebase.auth().signOut().then(async function() {
    var status = AsyncStorage.getItem('userToken')
    console.log(status)
     AsyncStorage.removeItem('userToken');
    navigate('Auth');
}, function(error) {
    alert(error)
            // An error happened.
          });

    }


update(){

    var user = firebase.auth().currentUser;
    console.log(this.state.phone)
    user.updateProfile({
  photoURL: this.state.dname,
  phoneNumber: this.state.phone
    }).then(function() {


Alert.alert('profile updated.')
}).catch(function(error) {
    console.log(error)
});
    }
     componentDidMount(){
        StatusBar.setHidden(true);

        var user = firebase.auth().currentUser;
        if (user != null) {
           var name = user.metadata.lastSignInTime;
             this.setState({last:name})
          }
    }



    upload(){
        var user = firebase.auth().currentUser;

        var database = firebase.database();
        database.ref('Accounts/'+user.uid).update({
            
            image : this.state.basestring
          });
        }
    
      
    picker(){
        ImagePicker.openPicker({
            includeBase64:true,
            width: 500,
            height: 600,
            cropping: true
          }).then(image => {
            console.log(image);
            this.setState({uri: image.path})
            this.setState({forupload: image.path})
            console.log(this.state.forupload)

            var mime = 'image/jpeg'
            var user = firebase.auth().currentUser;

            const imageRef = firebase.storage().ref(`/Images/${user.uid}`)
            const uploadUri = Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path


            return imageRef.putFile(uploadUri,{ contentType: mime}).then(() => {
             return imageRef.getDownloadURL();
              
              }).then((url) => {
                var database = firebase.database();
                database.ref('Accounts/'+user.uid).update({
                    image : url
                  });
                  alert('image uploaded')
                console.log(url)
              })



          });
          
    }

    render()  {
        const { navigation } = this.props;

        return (
         
          <View style={styles.container}>
          <Button title="Logout" onPress={()=> this.delete()} />
          <Text>Hello</Text>
          <TimeAgo time={this.state.last} />
          <TextInput
                style={styles.input}
                //value={this.state.email}
                onChangeText={(dname) => this.setState({dname})}
                multiline={false}
                placeholder="Image url"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                placeholderTextColor="#bdc3c7"
                
              />
              <TextInput
        style={styles.input}
//value={this.state.email}
        onChangeText={(phone) => this.setState({phone})}
        multiline={false}
        placeholder="phone number"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        underlineColorAndroid="transparent"
        placeholderTextColor="#bdc3c7"

/>
            <Button title="Update pic" onPress={()=>this.upload()} />
        <Button title="Pick Image" onPress={()=>this.picker()} />
          <Button title="Update" onPress={() =>this.update()}/>
          <Button title="Profile" onPress={() =>this.props.navigation.navigate('details')}/>
          <Image
          style={{top:10,width:100,height:100,borderRadius:50,resizeMode:'contain'}}
          source={{uri: this.state.uri}}    
             />          
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
        backgroundColor: '#17B978',
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
