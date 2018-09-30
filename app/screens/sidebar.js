//import liraries
import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,Text,AsyncStorage,TouchableOpacity,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { Container, Thumbnail,Header, Content, List,Button, ListItem,H3,H2,Left, Body, Right, Switch } from 'native-base';
import firebase from 'react-native-firebase';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// create a component
class sidebar extends Component {

  constructor(props){
    super(props)
    this.state={
      iamge:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      name:'',
      email:''
    }
    
  }
  async componentDidMount(){
    await this.fetchUser();
      console.log(this.props.user)

  }
  confirmLogout(){
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

  logout(){

    Alert.alert(
      'Are you sure',
      'Do you want to sign out from application',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.confirmLogout()},
      ],
      { cancelable: false }
    )
      
          
  }
fetchUser(){
  firebase.auth().onAuthStateChanged( user => {
    if(user){
     console.log(user._user.uid) 
     
     var database = firebase.database();
     database.ref('Accounts/'+user.uid).on('value',(snap) => {
      var user = {
        image:snap.val().image,
        name:snap.val().name,
        email:snap.val().email
      }
      this.setState({image:snap.val().image,
        name:snap.val().name,
        email:snap.val().email})
       this.props.saveUser(user);

  });

    }});

}

  async changecolors(){

    var payload = {
    colorprimary:'#2A3963',
    colorsecondary:'#0b2441',
    textlight:'yellow',
    textdark:'white',
    background:'#0b2441',
    chatbackground:'#F2F9FF'
  }
 await this.props.changeTheme(payload)
  
}
async changecolorslite(){
  var payload = {
    colorprimary:'#2A3963',
    colorsecondary:'#0b2441',
    textlight:'yellow',
    textdark:'#0b2441',
    background:'#F8F9FC',
    chatbackground:'#F2F9FF'
  }
 await this.props.changeTheme(payload)
  
}

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                <Content>
<View style={{backgroundColor:'#0F3057',width:'100%',height:150,flexDirection:'row',padding:10,alignItems:'center'}}>
<Image style={{alignSelf:'center',borderRadius:50,width:60,height:60}} source={{uri:this.state.image}} />

<View style={{justifyContent:'center',left:10}}>
<Text style={{color:'white',fontSize:18,fontWeight:"800"}}>{this.state.name}</Text>
<Text style={{color:'white',fontSize:12}}>{this.state.email}</Text>

</View>
</View>

          <List style={{marginRight:6,top:8}}>
          <ListItem icon onPress={()=>this.props.navigation.navigate('Home')}  >
              <Left>
                <Icon name="user" size={21} color="#0F3057"/>
              </Left>
              <Body>
                <Text>My Profile</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>


            <ListItem icon>
              <Left>
                <Icon name="star" size={21} color="#0F3057"/>
              </Left>
              <Body>
                <Text>Starred Messages</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>

              <ListItem icon>
              <Left>
                <Icon name="settings" size={21} color="#0F3057" />
              </Left>
              <Body>
                <Text>Settings</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>

            <ListItem>
              <Left>
              <Text>Color Theme</Text>
              </Left>
              <Body style={{flexDirection:'row'}}>
            
              <TouchableOpacity onPress={()=>this.changecolorslite()} activeOpacity={0.9} style={{backgroundColor:'#F2F9FF',width:30,height:30,borderRadius:15,padding:8}} />
              <TouchableOpacity onPress={()=>this.changecolors()} activeOpacity={0.9} style={{marginHorizontal:13,backgroundColor:'#0F3057',width:30,height:30,borderRadius:15,padding:8}} />



              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>


            <ListItem  onPress={()=>this.props.navigation.navigate('Report')} icon>
              <Left>
                <Icon name="flag" size={21} color="#0F3057"/>
              </Left>
              <Body>
                <Text>Report</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>



            



            

        <ListItem onPress={()=>this.logout()} icon>
              <Left>
                <Icon name="log-out" size={21} color="#0F3057" />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>

            </List>
            </Content>
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

//make this component available to the app
function mapStateToProps(state,props){
  console.log(state)
  return { colors: state.theme.appTheme,user:state.theme.user };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(sidebar);
