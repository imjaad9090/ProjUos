//import liraries
import React, { Component } from 'react';
import { View, StyleSheet,Button,FlatList,Image,TouchableOpacity,AsyncStorage,TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, Card, CardItem, Thumbnail,Text, Left, Body, Right } from 'native-base';


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
        online:'#ced6e0',
        store:[]
    }
    this.userR = firebase.database().ref('Accounts/');
        this.user = firebase.auth().currentUser;

}

componentDidMount(){
    


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


async getData(){
this.setState({visible:true})
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
            status: JSON.stringify(child.val().online)
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

}



     async componentWillMount(){
        var user = firebase.auth().currentUser;
        var database = firebase.database();

        
        console.log(user.uid)

       console.log('will mount ran')
       var mymail= await AsyncStorage.getItem('myEmail')


        this.setState({thismail:JSON.parse(mymail)})
       this.getData()
 
    }

      onlineStatus(props){
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
                        
                        
                        
                        
                        <View style={[styles.iconBorder, {backgroundColor: this.state.online}]}>
                        <Image source={{uri : item.image}} style={{width:50,height:50,borderRadius:25,}}    />
                        </View>
                        
                        
                        <View style={{left:13}}>
                        <Text style={{fontWeight:'400',fontSize:16,color:'#141c33'}}>{item.name}</Text>
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