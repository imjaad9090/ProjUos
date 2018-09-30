//import liraries
import React, { Component } from "react";
import themereducer from '../../store';
import PropTypes from 'prop-types';

import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  PushNotificationIOS,
  AsyncStorage,
  TextInput,
  StatusBar
} from "react-native";
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
import { CheckBox } from 'react-native-elements'
import * as Actions from '../../actions';
var db = 'https://unichatio-f63db.firebaseio.com/Accounts/'
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

   drawerLockMode : 'locked-closed'

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
      visible: true,
      online: "#44bd32",
      checked1:false,
      checked2:false,
      checked3:false,
      background:'white',
      modalVisible: false,
      filterText: '',
      store: [],
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
   componentDidMount() {
     
  }

  componentWillUnmount() {
    console.log("unmounted");
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
                location: child.val().location
              });
            } else {
              console.log("not one of us");
            }
            console.log(mid);
            //console.log(this.state.store)
          });
          this.setState({ store: mid, visible: false});
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
          source={require("./Images/online.png")}
          style={{ width: 10, height: 10, resizeMode: "contain" }}
        />
      );
    } else if (props == "false") {
      return (
        <Image
          source={require("./Images/offline.png")}
          style={{ width: 10, height: 10, resizeMode: "contain" }}
        />
      );
    }
  }
  
_onChangeFilterText = (filterText) => {
    this.setState({filterText});
  };
  checked1(props){
      if(props == 'abusive'){
          this.setState({checked1:true,checked2:false,checked3:false,reportReason:props})
      }
      else if(props == 'harassment'){
        this.setState({checked1:false,checked2:true,checked3:false,reportReason:props})
    }
    else if(props == 'spam'){
        this.setState({checked1:false,checked2:false,checked3:true,reportReason:props})
    }
  }
  reportUser(){
    var user = firebase.auth().currentUser;
    console.log(user)
    firebase.database().ref().child('Complaints').child(Math.floor(Math.random() * 238927874) + 1).set({
        byUser: user.uid,
        against: this.state.inmateID,
        reason: this.state.reportReason,
        
    }).then(()=>{
        this.setState({modalVisible:false})
        alert('User reported to admin successfully.')
    }).catch(()=>{
        this.setState({modalVisible:false})
        alert('An error occured, please try again.')
    })
  }
  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (
      filterRegex.test(item.name) 
    );
    const filteredData = this.state.store.filter(filter);

    return (
          <View style={{flex:1,backgroundColor:'red'}}>
            <View style={styles.header}>
                        <View style={styles.headerInner}>
    
    
                        <Icon name="arrow-left" size={26} onPress={()=>this.props.navigation.navigate('DrawerOpen')} color={'white'} />
                            <Text style={styles.headerText}>Report</Text>
                        </View>
                    </View>
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
                  borderColor: "#c23616",
                  borderWidth: 3
                }}
              >
                <View style={styles.headerPop}>
                <Text style={styles.headerTextPop}>Sorry</Text>
    
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
    
                  <Text style={{ fontSize: 17,textAlign:'center',color: "#0b2441" }}>
                    Why do you think this user should not be here ..?
                  </Text>

                  <CheckBox
  center
  title='Abusive Behavior'
  checked={this.state.checked1}
  onPress={()=>this.checked1('abusive')}
/>
<CheckBox
  center
  title='Harassing Other People'
  checked={this.state.checked2}
  onPress={()=>this.checked1('harassment')}

/>
<CheckBox
  center
  title='Spamming the Chat'
  checked={this.state.checked3}
  onPress={()=>this.checked1('spam')}

/>
                </View>
    
                <TouchableOpacity
                  onPress={() => this.reportUser()}
                  activeOpacity={0.9}
                  style={{
                    position: "absolute",
                    width: "100%",
                    paddingVertical: 10,
                    backgroundColor: "#c23616",
                    alignItems: "center",
                    justifyContent: "center",
                    bottom: 0
                  }}
                >
                  <Text style={{ color: "white" }}>REPORT</Text>
                </TouchableOpacity>
              </View>
            </Modal>
                    <View style={{backgroundColor:'#c23616',
                 padding:5,
           borderRadius:2,height:50,justifyContent:'center',}}>
       
       <TextInput  
        
        //autoFocus={true}
        placeholder="Search"
        
      selectionColor="#a5b1c2"
      returnKeyType="search"
      textBreakStrategy="highQuality"
       underlineColorAndroid='transparent'
       autoCorrect={false}
       blurOnSubmit={true}
       //onSubmitEditing={()=>this.onSubmit()}
       //autoCapitalize='none'
       placeholderTextColor="#bfbfbf"
       onChangeText={this._onChangeFilterText}
       placeholder='Search..'
       style={{height:'100%',
       justifyContent:'center',
           textDecorationLine:'none',
           textDecorationColor:'transparent',
           backgroundColor:'white',
           paddingHorizontal:16,
           borderRadius:7,
           color:'#2e3131',
           fontWeight:'400',
           alignItems:'center',
           width:'100%',
           //position:'relative',
           fontStyle:'normal',
           fontSize:14,
              
       }} />
       </View>         
        <View style={{ flex: 1,
    padding: 2,
    backgroundColor: this.props.colors.background}}>
            <StatusBar backgroundColor="#0b2441" barStyle="light-content" />
    
            
    
            <Spinner visible={this.state.visible} />
    
           
            <View>
              <FlatList
                  extraData={this.props}
                keyExtractor={(item, index) => index.toString()}
                data={filteredData}
                 showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      this.setState({modalVisible:true,inmateID:item.id})
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
                      </View>
                      
                      
                    </View>
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
    flex: 0.9,
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
  return { colors: state.theme.appTheme };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
