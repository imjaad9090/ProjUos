//import liraries
import React, { Component } from 'react';
import { View, StyleSheet,Button,FlatList,Image,TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, Card, CardItem, Thumbnail,Text, Left, Body, Right } from 'native-base';


// create a component
class Users extends React.Component {
constructor(){
    super()
    this.state={
        visible: true,
        store:[]
    }
    this.userR = firebase.database().ref('Accounts/');
        this.user = firebase.auth().currentUser;

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
    var userR = firebase.database().ref('Accounts/');
       var user = firebase.auth().currentUser;

       userR.on('value', (snap) =>{
        var mid =[];

        snap.forEach((child)=>{
            if(child.val().email != user.email)
          //var childData = childSnapshot.val();
          mid.push({
            name: child.val().name,
            email: child.val().email,
            role:  child.val().role,
            id: child.val().uid,
            image: child.val().image
          })


          //console.log(this.state.store)
          
        });
        this.setState({store:mid,visible:false})

        
    });  

}


componentDidMount(){
    
}




     async componentWillMount(){
       console.log('will mount ran')
       this.getData()
 
    }

    


    render() {
        let currentComponent = this.state;

        return (
            <View style={styles.container}>
                     <Spinner visible={this.state.visible}/>

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.store}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('chat',{name:item.name,goid:item.id,gomail:item.email,goimage:item.image})}>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: item.image}} />
                <Body>
                  <Text>{item.name}</Text>
                  <Text note>{item.role}</Text>
                </Body>
              </Left>
            </CardItem>
            </Card>
                </TouchableOpacity>
              )}
            />            
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:2,
        backgroundColor: '#08415C',
    },
});

//make this component available to the app
export default Users;
