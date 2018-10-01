//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions,Linking,ImageBackground,ActivityIndicator, Button,StatusBar,Image,TouchableOpacity,TextInput,Alert,AsyncStorage,Platform,TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Thumbnail,H1,H2,H3 } from 'native-base';
import Drawer from 'react-native-drawer'
import Register from './Register';
import PropTypes from 'prop-types';
import TimeAgo from 'react-native-timeago';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
const window = Dimensions.get('window');

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
            uname:'',
            ubio:'',
            editview:false,
            shareView:false
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
            var bio = snap.val().bio


            console.log(imageLink)
            this.setState({link:imageLink})
            this.setState({uname:name})
            this.setState({urole:role})
            this.setState({uemail:email})
            this.setState({ubio:bio})


        });
                     

}
else {
    console.log('user not found')
}

          });

        

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
        if (this.state.uname != '' && this.state.uname.length > 10 && this.state.ubio.length > 10 ) {
            var user = firebase.auth().currentUser;
            var newname = this.state.uname;
            var newbio  = this.state.ubio;
            var database = firebase.database();
                    database.ref('Accounts/'+user.uid).update({
                        name : newname,
                        bio : newbio
                      });
                      this.setState({visible:false,editview:false})
        }
        else{
            alert('Username and bio must not be empty or less then 10 characters.')
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
        shareToWhatsApp(text){
            //Linking.openURL(`fb-messenger://user-thread/send?text=${text}`);

            //Linking.openURL(`fb-messenger://user-thread/`);
            Linking.openURL(`whatsapp://send?text=${text}`);
          }

          shareToMessenger(text){
            //Linking.openURL(`fb-messenger://user-thread/send?text=${text}`);

            Linking.openURL(`fb-messenger://user-thread/`);
            //Linking.openURL(`facebook://send?text=${text}`);
          }

          shareToFb(){
            Linking.openURL("https://www.facebook.com/");
          }


    render()  {
        const { navigation } = this.props;

        return (
         <View style={styles.container}>
            <View style={{alignItems:'center',backgroundColor:'white', paddingBottom:65,borderBottomEndRadius:window.width-230,borderBottomStartRadius:window.width-230,width:'100%'}}>
            <View style={{paddingTop:20}}>
            
            <LinearGradient   start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
 colors={['transparent','transparent','transparent']} style={{width:160,height:160,borderRadius:80,justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}} >
            
            <CachedImage style={{width:'95%',height:'95%',borderRadius:80}} source={{uri:this.state.link}}/>
            </LinearGradient>
            <TouchableWithoutFeedback onPress={()=>this.picker()}>
            
            <LinearGradient colors={['#000428','#004e92']} style={{position:'absolute',alignSelf:'flex-end',bottom:0,right:20,width:44,height:44,borderRadius:22,backgroundColor:'#568',alignItems:"center",justifyContent:'center'}}>

                <Icon name="camera" size={20} color="white" />

            </LinearGradient>
            </TouchableWithoutFeedback>
            </View>
            
            
            {this.state.editview ?
            
            <View style={{width:'100%'}}>

            <TextInput  
       autoFocus={true}
     selectionColor="#a5b1c2"
     returnKeyType="done"
     textBreakStrategy="highQuality"
      underlineColorAndroid='transparent'
      autoCorrect={false}
      blurOnSubmit={true}
      value={this.state.uname}
      //onSubmitEditing={()=>this.onSubmit()}
      autoCapitalize='words'
      maxLength={20}
      onChangeText={(text)=>this.setState({uname:text})}
      style={{paddingVertical:4,
      justifyContent:'center',
          textDecorationLine:'none',
          textDecorationColor:'transparent',
          backgroundColor:'white',
          marginVertical:5,
          textAlign:'center',
          paddingHorizontal:16,
          borderColor:'#000428',
          borderWidth:1,
          borderRadius:4,
          color:'#2e3131',
          fontWeight:'400',
          alignItems:'center',
          width:'80%',
          alignSelf:'center',
          //position:'relative',
          fontStyle:'normal',
          fontSize:14,
             
      }} />

      <TextInput  
       autoFocus={true}
     selectionColor="#a5b1c2"
     returnKeyType="done"
     textBreakStrategy="highQuality"
      underlineColorAndroid='transparent'
      autoCorrect={false}
      value={this.state.ubio}

      blurOnSubmit={true}
      //onSubmitEditing={()=>this.onSubmit()}
      autoCapitalize='words'
      maxLength={300}
      onChangeText={(bio)=>this.setState({ubio:bio})}
      style={{paddingVertical:4,
      justifyContent:'center',
          textDecorationLine:'none',
          textDecorationColor:'transparent',
          backgroundColor:'white',
          marginVertical:5,
          textAlign:'center',
          paddingHorizontal:16,
          borderColor:'#000428',
          borderWidth:1,
          borderRadius:4,
          color:'#2e3131',
          fontWeight:'400',
          alignItems:'center',
          width:'80%',
          alignSelf:'center',
          //position:'relative',
          fontStyle:'normal',
          fontSize:14,
             
      }} />

      <TouchableOpacity onPress={()=>this.updateName()} activeOpacity={0.9} style={{alignSelf:'center',width:'70%',paddingVertical:12,borderRadius:12,alignItems:'center',justifyContent:'center',backgroundColor:'#192a56'}}>
      <Text style={{color:'#fff',fontWeight:"400",fontSize:13}}>Update</Text>

      </TouchableOpacity>
           </View>
        :
        


        <View style={{marginVertical:13,alignItems:'center',width:'100%'}}>
 
           <View style={{paddingHorizontal:6,flexDirection:'column',alignItems:'center',paddingVertical:5,flexWrap:'wrap'}}>
            <Text style={{color:'#2C2D33',fontWeight:"500",fontSize:20}}>{this.state.uname}</Text>
            <Text style={{color:'#3B3C43',fontSize:15,textAlign:'center'}}>{this.state.ubio}</Text>
            <Text style={{color:'#3B3C43',fontSize:15}}>{this.state.uemail}</Text>

          {/*   <Icon name="pencil" onPress={()=>this.setState({editview:true})} style={{paddingHorizontal:3}} size={22} color="#273c75" /> */}

            </View>
            {/* <Text style={{color:'#3B3C43',fontSize:15,}}>{this.state.urole}</Text> */}
            <View style={{width:'100%',paddingVertical:10,flexDirection:'row',alignItems:'center'}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={{width:60,height:60,borderRadius:30,backgroundColor:'#ecf0f1',alignItems:'center',justifyContent:'center'}}>
                <Icon name="cog" onPress={()=>this.setState({editview:true})} size={23} color="#bdc3c7" />  
                </TouchableOpacity>
            </View>
                <View  style={styles.separator} />
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>this.setState({editview:true})} activeOpacity={0.9} style={{width:60,height:60,borderRadius:30,backgroundColor:'#273c75',alignItems:'center',justifyContent:'center'}}>
                <Icon name="pencil"  size={23} color="#fff" />  
                </TouchableOpacity>
            </View>
            </View>
         </View>
            
        }
            

            </View>
            {this.state.shareView && 
            <View style={{width:'100%',paddingVertical:10,flexDirection:'row',alignItems:'center'}}>
            
                <TouchableOpacity activeOpacity={0.9} onPress={()=>this.shareToMessenger()} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{width:60,height:60,borderRadius:30,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('./Images/messenger1.png')} style={{width:'60%',height:'60%'}} resizeMode='contain' />

                </View>
            </TouchableOpacity>

            <View  style={styles.separator} />
            <TouchableOpacity activeOpacity={0.9} onPress={()=>this.shareToWhatsApp('Download unichat from playstore.')} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{width:60,height:60,borderRadius:30,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('./Images/whatsapp1.png')} style={{width:'60%',height:'60%'}} resizeMode='contain' />
                </View>
            </TouchableOpacity>

                <View  style={styles.separator} />

             <TouchableOpacity activeOpacity={0.9} onPress={()=>this.shareToFb()} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{width:60,height:60,borderRadius:30,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('./Images/facebook.png')} style={{width:'60%',height:'60%'}} resizeMode='contain' />

                </View>
            </TouchableOpacity>
            </View>
            }
            <TouchableOpacity onPress={()=>this.setState({shareView:!this.state.shareView})} activeOpacity={0.9} style={{position:'absolute',bottom:0,width:'100%',alignItems:'center',justifyContent:'center',paddingVertical:14,backgroundColor:'#273c75'}}>
            <Text style={{color:'#fff',fontSize:17,textAlign:'center'}}>Share Unichat</Text>

            </TouchableOpacity>

    </View>
       
            
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
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
      separator:{
        borderLeftWidth: 1,
        alignSelf:'center',
        borderColor: '#dcdde1',
        
        height: '85%',
        backgroundColor:'transparent',
      }
      
});

//make this component available to the app
export default Login;
