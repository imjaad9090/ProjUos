//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button,FlatList,Image,TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';

// create a component
class Users extends Component {
constructor(){
    super()
    this.state={
        store:[]
    }

}

showUsers(){
    let currentComponent = this.state;

    let newC = this.setState;
    var store =[]
        var userR = firebase.database().ref('Accounts/');
        var user = firebase.auth().currentUser;

        userR.on('value', function(snapshot) {
            snapshot.forEach((child)=>{
                if(child.val().email != user.email)

              //var childData = childSnapshot.val();
              currentComponent.store.push({
                name: child.val().name,
                email: child.val().email,
                role:  child.val().role,
                id: child.val().uid,
                image: child.val().image
              })

              //console.log(this.state.store)
              
            });
            console.log(currentComponent.store)
            console.log(currentComponent.store.length)

            
        });      
}

showImage(props){
   
    return <Image source={{uri: props}} style={{width:50,height:50,resizeMode:'contain'}} />

}
    componentWillMount(){
        this.showUsers()
  

        
    }

    componentDidMount(){
    }


    render() {
        let currentComponent = this.state;

        return (
            <View style={styles.container}>
            <Text>Total Pals : 0</Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.store}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('chat',{name:item.name,goid:item.id,gomail:item.email,goimage:item.image})}>
                <View style={{width:'100%',height:90,marginVertical:6,borderColor:'#000',borderRadius:3,borderWidth:2,height:150,padding:5}}>

                {this.showImage(item.image)}

                <Text>Name : {item.name}</Text>

                <Text>Email : {item.email}</Text>
                <Text>Role : {item.role}</Text>
                <Text>User id : {item.id}</Text>
 
                </View>
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
        padding:10,
        backgroundColor: '#eee',
    },
});

//make this component available to the app
export default Users;
