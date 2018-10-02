//import liraries
import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  AsyncStorage,
  TextInput,
  StatusBar,
  AppState
} from "react-native";
import { DeviceEventEmitter } from 'react-native'
var _ = require('lodash')

import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
import { PermissionsAndroid } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";
const MSG1 = 'Your location could not be verified, please get back in the zone.';
const MSG2 = 'Could not find location, make sure GPS is enabled.'
import {Text} from "native-base";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../actions';
function geoFence(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

// create a component
 class Users extends React.Component {
  static navigationOptions = ({ navigation }) => {
   header:null
    /*  title: "Friends";

    headerStyle: {
      backgroundColor: "#2A3963";
    } */
  };

  constructor(props) {
    super(props);


    this.state = {
      isFetching:false,
      colors:this.props.colors,
      filterText: '',
      visible: true,
      online: "#44bd32",
      background:'white',
      modalVisible: false,
      openSearch:false,
      store: [],
      appState: AppState.currentState,
      message: MSG1
    };
    this.userR = firebase.database().ref("Accounts/");
    this.user = firebase.auth().currentUser;
  }
  updateState = () => {
    this.setState({
      colors:store.getState().appTheme,

    });
  }


async updateStatus(){
  await firebase.auth().onAuthStateChanged(user => {
  if (user) {
        var user = firebase.auth().currentUser;
        var database = firebase.database();
                database.ref('Accounts/'+user.uid).update({
                    online : true
                  });

                }})
    }
   
  
    async updateStatusFalse(){
      await firebase.auth().onAuthStateChanged(user => {
      if (user) {
            var user = firebase.auth().currentUser;
            var database = firebase.database();
                    database.ref('Accounts/'+user.uid).update({
                        online : false
                      });
    
                    }})
        }
       


    componentDidMount() {
      console.log(this.props.sortby)
     this.updateStatus()
        this.interval = setInterval(() => {
      this.checkLocation();
    }, 120000);
    
   if(Platform.os == 'android')
    {
      DeviceEventEmitter.addListener(
      'ON_HOME_BUTTON_PRESSED',
      async () => {
        console.log('You tapped the home button!')
        var user = firebase.auth().currentUser;
        console.log(user)
            await firebase.database().ref('Accounts/'+user.uid).update({
                online : false
              });
     })
    }
   

    this.props.navigation.addListener('willBlur', (route) => { 
      this.updateStatusFalse();

              
              })
  
                this.props.navigation.addListener('willFocus', (route) => { 
                  this.updateStatus(); 

               })
   
              }

  _onChangeFilterText = (filterText) => {
    this.setState({filterText});
  };
  checkLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        if (position) {
          console.log(position);
          var distance = geoFence(
            31.415634,
            74.175616,
            position.coords.latitude,
            position.coords.longitude
          ).toFixed(5);
          if (distance <= 1) {
            console.log("inside the campus");
          } else {
            console.log("Outside campus");
            this.setState({ message:MSG1,modalVisible: true });
          }
        } else {
          console.log("position undefined");
        }
      },
      error => {
        this.setState({modalVisible:true,message:MSG2})
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 25000 }
    );
  }

 
  componentWillUnmount() {
    console.log("unmounted");
    var user = firebase.auth().currentUser;
    var database = firebase.database();
            database.ref('Accounts/'+user.uid).update({
                online : false
              });

  }

  roleChip(role){
    if(role == 'Teacher'){
      return <View style={{left:13,flexDirection:'row',alignSelf:'flex-start',backgroundColor:'#0abde3',padding:3,borderRadius:4}}>
          <Text style={{ color: "#fff", fontSize: 12 }}>
                    Teacher
          </Text>
          </View>
    }
    else if(role == 'Student')  {
      return <View style={{left:13,flexDirection:'row',alignSelf:'flex-start',backgroundColor:'#1abc9c',padding:3,borderRadius:4}}> 
      <Text style={{ color: "#fff", fontSize: 12 }}>
                    Student
                  </Text>
                  </View>
      
    }
    else if(role == 'Management') {
      return <View style={{left:13,flexDirection:'row',alignSelf:'flex-start',backgroundColor:'#ffb142',padding:3,borderRadius:4}}> 
      <Text style={{ color: "#fff", fontSize: 12 }}>
                    Management
                  </Text>
                  </View>
      
    }

  }

  showUsers() {
    let currentComponent = this.state;

    let newC = this.setState;
    var store = [];
    var userR = firebase.database().ref("Accounts/");
    var user = firebase.auth().currentUser;

    //console.log(store);
    this.setState({ store: store });
  }

  showImage(props) {
    return (
      <Image
        source={{ uri: props }}
        style={{ alignSelf: "center", borderRadius: 50, width: 50, height: 50 }}
      />
    );
  }

  getData() {
    this.setState({ visible: true });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var userR = firebase.database().ref("Accounts/");
        var user = firebase.auth().currentUser;

        userR.on("value", snap => {
          var mid = [];

          snap.forEach(child => {
            if (child.val().uid != user.uid) {
              //console.log(child);
              //var childData = childSnapshot.val();
              mid.push({
                name: child.val().name,
                email: child.val().email,
                role: child.val().role,
                id: child.val().uid,
                image: child.val().image,
                status: child.val().online,
                location: child.val().location,
                bio: child.val().bio
              });
            } else {
              console.log("not one of us");
            }
            console.log(mid);
            //console.log(this.state.store)
          });

          var dataSorted =  _.sortBy(mid, this.props.sortby);

          this.setState({ store: dataSorted, visible: false});
        });
      }
    });
  }

  async componentWillMount() {
    var user = firebase.auth().currentUser;
    var database = firebase.database();

    console.log("will mount ran");
    var mymail = await AsyncStorage.getItem("myEmail");

    this.setState({ thismail: JSON.parse(mymail) });
    this.getData();
  }

  onlineStatus(props) {
    console.log(props);
    if (props == "true") {
      return (
        <Image
          source={require("../Images/online.png")}
          style={{ width: 10, height: 10, resizeMode: "contain" }}
        />
      );
    } else if (props == "false") {
      return (
        <Image
          source={require("../Images/offline.png")}
          style={{ width: 10, height: 10, resizeMode: "contain" }}
        />
      );
    }
  }
  formatBio(props){
    if(props.length < 40){
                    return    <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 14,
                          color: "#8395a7"
                        }}
                      >
                        {props}
                      </Text>
    }
    else {
      var res = props.slice(0, 40);
        var final = res.concat('..')
        return    <Text
        style={{
          fontWeight: "400",
          fontSize: 14,
          color: "#8395a7"
        }}
      >
        {final}
      </Text>

    }
  }
  

async onRefresh() {
  this.setState({ isFetching: true });
  await this.getData();
  this.setState({ isFetching: false });

}
  change = () => {
    this.setState({ online: "#00b894" });
  };
  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (
      filterRegex.test(item.name) 
    );
    const filteredData = this.state.store.filter(filter);
    return (
          <View style={{flex:1,backgroundColor:'red'}}>
            <View style={styles.header}>
                       {this.state.openSearch ?  
                        <TextInput  
        
                        autoFocus={true}
                        placeholder="Search"                        
                      selectionColor="#a5b1c2"
                      returnKeyType="search"
                      textBreakStrategy="highQuality"
                       underlineColorAndroid='transparent'
                       autoCorrect={false}
                       blurOnSubmit={true}
                       //onSubmitEditing={()=>this.onSubmit()}
                       //autoCapitalize='none'
                       placeholderTextColor="#fefefe"
                       onChangeText={this._onChangeFilterText}
                       placeholder='Search..'
                       style={{height:'80%',
                       justifyContent:'center',
                           textDecorationLine:'none',
                           textDecorationColor:'transparent',
                           backgroundColor:'transparent',
                           paddingHorizontal:16,
                           marginHorizontal:10,
                           borderRadius:7,
                           color:'#fff',
                           fontWeight:'400',
                           alignItems:'center',
                           width:'80%',
                           //position:'relative',
                           fontStyle:'normal',
                           fontSize:15,
                              
                       }} />
                        
                        
                       : 
                       <View style={styles.headerInner}>
    
    
                        <Icon name="menu" size={26} onPress={()=>this.props.navigation.navigate('DrawerOpen')} color={'white'} />
         
                            <Text style={styles.headerText}>Friends</Text>
                            
    
    
                        </View>
                       }
                        <View>
                        <Icon name="search" size={24} onPress={()=>this.setState({openSearch:!this.state.openSearch})} color={'white'} />
                        </View>
                    </View>
          <View style={{ flex: 1,
    padding: 2,
    backgroundColor: this.props.colors.background}}>
            <StatusBar backgroundColor="#0b2441" barStyle="light-content" />
    
            <Modal
              isVisible={this.state.modalVisible}
              //avoidKeyboard={true}
              onBackButtonPress={() => this.setState({ modalVisible: false })}
              onBackdropPress={() => this.setState({ modalVisible: false })}
            >
              <View
                style={{
                  alignSelf: "center",
                  width: "95%",
                  height: "60%",
                  backgroundColor: "white",
                  borderColor: "#0b2441",
                  borderWidth: 3
                }}
              >
                <View style={styles.headerPop}>
                  <Icon name="map-pin" size={35} color="#0b2441" />
    
                </View>
    
                <View
                  style={{
                    width: "85%",
                    paddingVertical: 3,
                    flexDirection: "column",
                    top: 10,
                    alignSelf: "center"
                  }}
                >
                  <Text style={styles.headerTextPop}>Sorry</Text>
    
                  <Text style={{ fontSize: 22,textAlign:'center',color: "#0b2441" }}>
                    {this.state.message}
                  </Text>
                </View>
    
                <TouchableOpacity
                  onPress={() => this.setState({ modalVisible: false })}
                  activeOpacity={0.9}
                  style={{
                    position: "absolute",
                    width: "100%",
                    paddingVertical: 10,
                    backgroundColor: "#0b2441",
                    alignItems: "center",
                    justifyContent: "center",
                    bottom: 0
                  }}
                >
                  <Text style={{ color: "white" }}>TRY AGAIN</Text>
                </TouchableOpacity>
              </View>
            </Modal>
    
            <Spinner visible={this.state.visible} />
    
            
            <View>
              <FlatList
                  extraData={this.props}
                keyExtractor={(item, index) => index.toString()}
                data={filteredData}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      this.props.navigation.navigate("chat", {
                        name: item.name,
                        goid: item.id,
                        gomail: item.email,
                        goimage: item.image,
                        online:item.status
                      })
                    }
                    style={{
                      padding: 4,
                      flexDirection: "row",
                      top: 3,
                      backgroundColor: "transparent",
                      height: 80,
                      shadowOffset: { width: 10, height: 10 },
                      marginHorizontal: 5,
                      shadowColor: "black",
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={[
                        styles.iconBorder,
                        { backgroundColor: item.status ? "#1abc9c" : "#dfe4ea" }
                      ]}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                      />
                    </View>
                    <View>
                    <View style={{left:13}}>
                      <View>
                        <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 15,
                          color: this.props.colors.textdark,}}>
                        {item.name}
                      </Text>

                      {this.formatBio(item.bio)} 
                      </View>
                      {/* <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 16,
                          color: "#141c33"
                        }}
                      >
                        {item.location.latitude}
                      </Text> */}
                      
                    </View>
                    {this.roleChip(item.role)}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          </View>
  
     
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: "#F8F9FC"
  },
  iconBorder: {
    width: 55,
    height: 55,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    height: 50,
    paddingHorizontal: 13,
    alignItems: 'center',
    //justifyContent: 'center',
    marginTop: Platform.OS == "ios" ? 20 : 0,
    flexDirection: 'row',

    backgroundColor: '#0b2441'
},
headerInner: {
  flex: 1,
  backgroundColor: 'transparent',
  flexDirection: 'row'
},
  headerTextPop: {
    alignSelf:'center',
    marginHorizontal: 5,
    paddingVertical:7,
    backgroundColor: "transparent",
    fontSize: 25,
    color: "#222f3e",
    fontWeight: "400"
  },
  break3: {
    width: "80%",
    alignSelf: "center",
    borderColor: "#1bab9a",
    borderBottomWidth: 1
  },
  headerText: {
    flexDirection: 'row',
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 19,
    color: 'white',
    fontWeight: '400'
},
  headerPop: {
    height: 60,
    paddingHorizontal: 13,
    alignItems: "center",

    justifyContent: "center",
    marginTop: Platform.OS == "ios" ? 20 : 0,
    flexDirection: "row",

    backgroundColor: "white"
  }
});

//make this component available to the app
Users.propTypes = {
  navigation: PropTypes.object.isRequired
};

Users.defaultProps = {
  user: null,
};
const mapStateToProps = (state) => {
  return { colors: state.theme.appTheme,sortby:state.theme.sortType };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
