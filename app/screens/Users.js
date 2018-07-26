//import liraries
import React, { Component } from 'react';
import { View, StyleSheet,Button,FlatList,Image,TouchableOpacity,PushNotificationIOS,AsyncStorage,TextInput,StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, Card, CardItem, Thumbnail,Text, Left, Body, Right } from 'native-base';
function geoFence(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }  

// create a component
class Users extends React.Component {

    static navigationOptions =({ navigation }) =>{
        title:'Friends'
        
        headerStyle:{
        backgroundColor:'#2A3963'
        }
        
    }

constructor(props){
    super(props)
    this.state={
        visible: true,
        online:'#44bd32',
        store:[]
    }
    this.userR = firebase.database().ref('Accounts/');
        this.user = firebase.auth().currentUser;

}

componentDidMount(){

    this.interval = setInterval(() => {

        this.checkLocation()



    }, 10000);


}


checkLocation(){

    navigator.geolocation.getCurrentPosition(
        (position) => {
          if(position){
            console.log(position)
            var distance = geoFence(31.415634,74.175616,position.coords.latitude,position.coords.longitude).toFixed(5);
            if(distance <= 1){
                console.log('inside the campus')
            }
            else{
                console.log('Outside campus')
            }




          }
          else {
              console.log('position undefined')
          }
        },
        (error) => console.log({ error: error.message }),
        { enableHighAccuracy: true},
      );
    
}


componentWillUnmount(){
    console.log('unmounted')
}


showUsers(){
    let currentComponent = this.state;

    let newC = this.setState;
    var store =[]
        var userR = firebase.database().ref('Accounts/');
        var user = firebase.auth().currentUser;

        
        console.log(store)
        this.setState({store:store})    
}

showImage(props){
   
    return <Image source={{uri: props}} style={{alignSelf:'center',borderRadius:50,width:50,height:50}} />

}


     getData(){
    this.setState({visible:true})

    firebase.auth().onAuthStateChanged( user => {
        if(user){

    var userR = firebase.database().ref('Accounts/');
       var user = firebase.auth().currentUser;
        
       userR.on('value', (snap) =>{
        var mid =[];

        snap.forEach((child)=>{
            if(child.val().uid != user.uid)
            
            {
            console.log(child)
          //var childData = childSnapshot.val();
          mid.push({
            name: child.val().name,
            email: child.val().email,
            role:  child.val().role,
            id: child.val().uid,
            image: child.val().image,
            status: (child.val().online),
            location:child.val().location
          })


}
else {
    console.log('not one of us')
}
          console.log(mid)
          //console.log(this.state.store)
          
        });
        this.setState({store:mid,visible:false})

        
    });  


        }}
    )

}



     async componentWillMount(){
        var user = firebase.auth().currentUser;
        var database = firebase.database();

        

       console.log('will mount ran')
       var mymail= await AsyncStorage.getItem('myEmail')


        this.setState({thismail:JSON.parse(mymail)})
       this.getData()
 
    }

      onlineStatus(props){
          console.log(props)
          if(props == 'true'){
       return <Image source={require('./Images/online.png')} style={{width:10,height:10,resizeMode:'contain'}} />
    
    }
    else if(props == 'false') {
        return <Image source={require('./Images/offline.png')} style={{width:10,height:10,resizeMode:'contain'}} />
    }

}

change=()=>{
    this.setState({online:'#00b894'})
}
    render() {
        let currentComponent = this.state;
        return (
            <View style={styles.container}>
            <StatusBar
     backgroundColor="blue"
     barStyle="light-content"
   />
            <Spinner visible={this.state.visible}/>
            
            {/*<View style={{width:'95%',alignSelf:'center',height:45,top:5,borderColor:'#c6d0ec',borderWidth:2,backgroundColor:'white',borderRadius:5,alignContent:'stretch'}}>
            <TextInput  
             //onTouchStart={()=> this.setState({show:false,body:true})}
           selectionColor={'black'}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            //autoCapitalize='none'
            placeholderTextColor="#bfbfbf"
            //onChangeText={(text)=>this.search(text)}
            placeholder='Search people..'
            style={{
                backgroundColor:'white',
                textDecorationLine:'none',
                textDecorationColor:'transparent',
                color:'#273c75',
                fontWeight:'400',
                borderRadius:5,
                width:'100%',
                paddingHorizontal:5,
                height:'100%',
                fontStyle:'normal',
                   
            }} />            
            </View>*/}
            
            <View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.store}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('chat',{name:item.name,goid:item.id,gomail:item.email,goimage:item.image})}
          
        
              style={{padding:4,flexDirection:'row',top:3,backgroundColor:'transparent',height:80,shadowOffset: { width: 10, height: 10 },marginHorizontal:5, shadowColor: 'black',alignItems:'center'}}>
                        
                        
                        
                        
              <View style={[styles.iconBorder, {backgroundColor: item.status? '#1abc9c':'#dfe4ea'}]}>
                        <Image source={{uri : item.image}} style={{width:50,height:50,borderRadius:25,}}    />
                        </View>
                        
                        
                        <View style={{left:13}}>
                        <Text style={{fontWeight:'400',fontSize:16,color:'#141c33'}}>{item.name}</Text>
                        <Text style={{fontWeight:'400',fontSize:16,color:'#141c33'}}>{item.location.latitude}</Text>

                        <Text style={{color:'#b5b5b5',fontSize:14}}>We will meet at the station..</Text>

                        
                        </View>



                

              </TouchableOpacity>


              )}
            />  
            </View>          
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:2,
        backgroundColor: '#F8F9FC',
    },
    iconBorder:{
       width:55,height:55,borderRadius:55,justifyContent:'center',alignItems:'center'
    }
});

//make this component available to the app
export default Users;
//00b894
//backgroundColor:{this.state.online ? '#ced6e0' : '#00b894'}