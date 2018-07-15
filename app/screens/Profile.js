//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,ActivityIndicator, Button,StatusBar,Image,TouchableOpacity,TextInput,Alert,AsyncStorage,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Header, Content, Thumbnail,H1,H2,H3 } from 'native-base';
import Drawer from 'react-native-drawer'
import Register from './Register';
import PropTypes from 'prop-types';
import TimeAgo from 'react-native-timeago';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import UserAvatar from 'react-native-user-avatar';
const place = 'Loading'
// create a component
class Login extends React.Component {
    static navigationOptions =({ navigation }) =>{
        title:'Profile'
        
        headerStyle:{
        backgroundColor:'#F2F9FF'
        }
        
    }
    constructor(){
        super()

        this.state={
            uri: 'https://im2.ezgif.com/tmp/ezgif-2-0a0115986d.png',
            basestring:null,
            visible: false,
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

    show(){
        var user = firebase.auth().currentUser;
        console.log(user)
    }
    
     componentDidMount(){
        firebase.auth().onAuthStateChanged( user => {
            if(user){
           var database = firebase.database();
           database.ref('Accounts/'+user.uid).on('value',(snap) => {
            var imageLink = snap.val().image
            var name = snap.val().name
            var role = snap.val().role
            var email = snap.val().email

            console.log(imageLink)
            this.setState({link:imageLink})
            this.setState({uname:name})
            this.setState({urole:role})
            this.setState({uemail:email})

        });
                     

}
else {
    console.log('user not found')
}

          });
        StatusBar.setHidden(true);

        {/*var database = firebase.database();
        database.ref('Accounts/'+user.uid).once('value').then(function(snapshot) {

            console.log(snapshot)

            // ...
          });*/}

          var user = firebase.auth().currentUser;

        if (user != null) {
            console.log(user.uid)
           var name = user.metadata.lastSignInTime;
             this.setState({last:name})
          }
    }


    


    componentWillMount(){
    }



    upload(){
        var user = firebase.auth().currentUser;

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
                  this.setState({visible:true})
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
                      console.log(url)
                    var database = firebase.database();
                    database.ref('Accounts/'+user.uid).update({
                        image : url
                      });
                      this.setState({visible:false})

                      alert('image uploaded')
                    console.log(url)
                  })
    
    
    
              });
              
        }

    render()  {
        const { navigation } = this.props;

        return (
         <View style={styles.container}>
         
            <Spinner visible={this.state.visible}/>
            <TouchableOpacity onPress={()=>this.picker()}>
            <UserAvatar size="200" name='A U' src= {this.state.link}/>
            </TouchableOpacity>
            <View style={{marginVertical:20,alignItems:'center'}}>
            <Text style={{color:'#2C2D33',fontWeight:"bold",fontSize:29}}>{this.state.uname}</Text>
            <Text style={{color:'#3B3C43',fontSize:16}}>{this.state.urole}</Text>
            <Text style={{color:'#3B3C43',fontSize:16}}>{this.state.uemail}</Text>

            </View>
         <Button title="logout" color="#568" onPress={()=>this.delete()}/>
           

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
        backgroundColor: '#FBFBFD',
    },
    image:{
        width:400,
        height:500,
        position:'absolute'
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
