/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,ActivityIndicator
} from 'react-native';
import Authloading from './screens/Authloading';
import { SwitchNavigator,StackNavigator,TabNavigator,DrawerNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';
import sidebar from './screens/sidebar';
import Home from './screens/Home';
import Users from './screens/Users';
import Groups from './screens/Groups';
import Login from './screens/Login';
import Register from './screens/Register';
import Location from './screens/Location';
import Profile from './screens/Profile';
import Forget from './screens/Forget';
import Chat from './screens/Chat';
import Public from './screens/Public';
import CS from './screens/CS';
import PT from './screens/PT';
import BD from './screens/BD';
//import {AuthStack} from "./config/routes";
//import {AppStack} from './config/routes';
import { fromLeft,fromTop,fadeIn,zoomIn,zoomOut,flipY,flipX } from 'react-navigation-transitions';




const TabStack = TabNavigator(
    {
    Home : {
        screen : Profile,
        navigationOptions:(navigation)=> ({
            title:'Home',
            
            headerLeft: (
                <View><Icon name="bars" size={26} color="#0F3057" onPress={()=>navigation.navigate('DrawerOpen')}/></View>
            ),
            headerTitleStyle:{
                color:'white',
                fontWeight:'400'
            },
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => <Icon name='account-circle' size={25} color={tintColor} />
        })
    },
    Friends : {
        screen : Users,
        navigationOptions: {
            headerTitle:'Friends',
            tabBarLabel: 'Users',
            headerTitleStyle:{
                color:'white',
                fontWeight:'400'
            },
            tabBarIcon: ({ tintColor }) => <Icon name="people" size={25} color={tintColor} />
        }
    },
    Groups : { 
        screen : Groups,
        navigationOptions: {
            headerTitle:'Groups',
            tabBarLabel: 'Groups',
            headerTitleStyle:{
                color:'white',
                fontWeight:'400'
            },
            tabBarIcon: ({ tintColor }) => <Icon name="account-balance" size={25} color={tintColor} />
        }
    },
    Public : {
        screen : Public,
        navigationOptions: {

            //headerTitle:"Public",
            tabBarLabel: "Public",
            tabBarIcon: ({ tintColor }) => <Icon name="chat-bubble" size={25} color={tintColor} />
        }
    },

},{
    
    swipeEnabled:true,
    tabBarPosition:"bottom",
    tabBarOptions: {
        indicatorStyle: {
            opacity: 0
          },
        lazy: true,
        showIcon:true,
        upperCaseLabel:false,
        inactiveTintColor:'#E6E6E6',
        activeTintColor: '#1CA2BB',
        labelStyle: {
            margin:0,
          fontSize: 12,
          color:'white'
        },
        style: {
          backgroundColor: '#212121',
        },
      }
})


const SemiAppStack = StackNavigator(
    
    {  

  tabs : {screen: TabNavigator(
    {
    
    
    Home : {
        screen : Profile,
        navigationOptions:(navigation)=> ({
            title:'Profile',
            //headerLeft:(<View><Icon name="bookmark" size={26} color="#0F3057" onPress={()=>this.props.navigation.navigate('DrawerOpen')}/></View>),
            tabBarLabel: 'Home',
            headerTitleStyle:{
                color:'white',
                fontWeight:'400'
            },
            headerStyle:{
                backgroundColor:'#2A3963'
            },
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={25} color={tintColor} />
        })
    },
    Friends : {
        screen : Users,
        navigationOptions: {
            headerTitle:'Friends',
            tabBarLabel: 'Users',
            headerTitleStyle:{
                color:'white',
                fontWeight:'400'
            },
            headerStyle:{
                backgroundColor:'#2A3963'
            },
            tabBarIcon: ({ tintColor }) => <Icon name="people" size={25} color={tintColor} />
        }
    },
    Groups : { 
        screen : Groups,
        navigationOptions: {
            headerTitle:'Groups',
            tabBarLabel: 'Groups',
            headerTitleStyle:{
                color:'white',
                fontWeight:'400'
            },
            headerStyle:{
                backgroundColor:'#2A3963'
            },
            tabBarIcon: ({ tintColor }) => <Icon name="account-balance" size={25} color={tintColor} />
        }
    },
    Public : {
        screen : Public,
        navigationOptions: {
            headerTitle:"Public",
            tabBarLabel: "Public",
            headerStyle:{
                backgroundColor:'#2A3963',
                alignItems:'center',
            },
            headerTitleStyle:{
                color:'white',
                fontWeight:'400',
                textAlign:'center'
            },
            tabBarIcon: ({ tintColor }) => <Icon name="chat-bubble" size={23} color={tintColor} />
        }
    }

},{
    
    swipeEnabled:true,
    tabBarPosition:"bottom",
    tabBarOptions: {
        indicatorStyle: {
            opacity: 0
          },
        lazy: true,
        showIcon:true,
        upperCaseLabel:false,
        inactiveTintColor:'#7695a1',
        activeTintColor: '#fff',
        labelStyle: {
            margin:0,
          fontSize: 12,
          color:'white'
        },
        style: {
          backgroundColor: '#2A3963',
        },
      }
})
},
loo:{screen:Home},
chat : {screen : Chat},
cs : {screen : CS},
pt : {screen : PT},
bd : {screen : BD},
Home :{screen : Profile},

},
);


const AppStack = DrawerNavigator({
    
    All : {screen : SemiAppStack},
},{
    contentComponent:sidebar
});


const AuthStack = StackNavigator({ 
  login : {screen : Login},
  register : {screen : Register},
  location : {screen : Location},
  forget : {screen : Forget} 
},{
    transitionConfig: () => fadeIn(400),

});




export default App= SwitchNavigator(
  {
    AuthLoading: Authloading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    transitionConfig: () => fadeIn(400),

  }
);


  