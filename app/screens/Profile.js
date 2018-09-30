//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,ActivityIndicator, Button,StatusBar,Image,TouchableOpacity,TextInput,Alert,AsyncStorage,Platform,TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Thumbnail,H1,H2,H3 } from 'native-base';
import Drawer from 'react-native-drawer'
import Register from './Register';
import PropTypes from 'prop-types';
import TimeAgo from 'react-native-timeago';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';

import UserAvatar from 'react-native-user-avatar';
const place = 'Loading'
// create a component
class Login extends React.Component {
    static navigationOptions =({ navigation }) =>{
        title:'Profile'
        
        headerStyle:{
        backgroundColor:'#2A3963'
        }
        
    }
    constructor(){
        super()

        this.state={
            uri: 'https://im2.ezgif.com/tmp/ezgif-2-0a0115986d.png',
            basestring:null,
            visible: false,
            name:'',
            editview:false
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

    updateName(){
        if (this.state.name != '' && this.state.name.length > 10) {
            var user = firebase.auth().currentUser;
            var newname = this.state.name;
            var database = firebase.database();
                    database.ref('Accounts/'+user.uid).update({
                        name : newname
                      });
                      this.setState({visible:false,editview:false})
        }
        else{
            alert('Username must not be empty or less then 10 characters.')
        }
        
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
            <View>
            
            <LinearGradient   start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
 colors={['#0F2027','#203A43','#2c5364']} style={{width:210,height:210,borderRadius:105,justifyContent:'center',alignItems:'center'}} >
            
            <CachedImage style={{width:200,height:200,borderRadius:100}} source={{uri:this.state.link}}/>
            </LinearGradient>
            <TouchableWithoutFeedback onPress={()=>this.picker()}>
            
            <LinearGradient colors={['#000428','#004e92']} style={{position:'absolute',alignSelf:'flex-end',bottom:0,right:20,width:48,height:48,borderRadius:24,backgroundColor:'#568',alignItems:"center",justifyContent:'center'}}>

                <Icon name="camera" size={22} color="white" />

            </LinearGradient>
            </TouchableWithoutFeedback>
            </View>
            
            {this.state.editview && 
            <View style={{width:'100%',alignSelf:'center',alignItems:'center'}}>
            <TextInput  
        autoFocus={true}
      selectionColor="#a5b1c2"
      returnKeyType="done"
      textBreakStrategy="highQuality"
       underlineColorAndroid='transparent'
       autoCorrect={false}
       blurOnSubmit={true}
       //onSubmitEditing={()=>this.onSubmit()}
       autoCapitalize='words'
       maxLength={20}
       onChangeText={(text)=>this.setState({name:text})}
       style={{paddingVertical:4,
       justifyContent:'center',
           textDecorationLine:'none',
           textDecorationColor:'transparent',
           backgroundColor:'white',
           marginVertical:10,
           textAlign:'center',
           paddingHorizontal:16,
           borderColor:'#000428',
           borderWidth:3,
           borderRadius:7,
           color:'#2e3131',
           fontWeight:'400',
           alignItems:'center',
           width:'50%',
           alignSelf:'center',
           //position:'relative',
           fontStyle:'normal',
           fontSize:14,
              
       }} />

       <TouchableOpacity onPress={()=>this.updateName()} activeOpacity={0.9} style={{width:'50%',paddingVertical:9,borderRadius:12,alignItems:'center',justifyContent:'center',backgroundColor:'#192a56'}}>
       <Text style={{color:'#fff',fontWeight:"400",fontSize:20}}>Update</Text>

       </TouchableOpacity>

       </View>
            }
            {!this.state.editview && 
            <View style={{marginVertical:20,alignItems:'center'}}>

          
            <View>
            <View style={{flexDirection:'row',alignItems:'center',paddingVertical:5}}>
            <Text style={{color:'#2C2D33',fontWeight:"400",fontSize:20}}>{this.state.uname}</Text>
            <Icon name="pencil" onPress={()=>this.setState({editview:true})} style={{paddingHorizontal:3}} size={22} color="#273c75" />

            </View>

            <Text style={{color:'#3B3C43',fontSize:15,}}>{this.state.urole}</Text>
            <Text style={{color:'#3B3C43',fontSize:15}}>{this.state.uemail}</Text>
            
            </View>
         </View>
            }

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
