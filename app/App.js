
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
import Home from './screens/tabnavigation/Home';
import Users from './screens/tabnavigation/Users';
import Groups from './screens/tabnavigation/Groups';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Location from './screens/Location';
import Profile from './screens/Profile';
import Forget from './screens/auth/Forget';
import Chat from './screens/Chat';
import Public from './screens/tabnavigation/Public';
import CS from './screens/groups/CS';
import PT from './screens/groups/PT';
import BD from './screens/groups/BD';
import Report from './screens/Report';
import { Provider } from 'react-redux';
import store from '../store';
//import {AuthStack} from "./config/routes";
//import {AppStack} from './config/routes';
import { fromLeft,fromTop,fadeIn,zoomIn,zoomOut,flipY,flipX } from 'react-navigation-transitions';
import Settings from './screens/Settings';



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
            },
            headerTitleStyle:{
                color:'white',
                fontWeight:'400',
                textAlign:'center'
            },
            tabBarIcon: ({ tintColor }) => <Icon name="chat-bubble" size={23} color={tintColor} />
        }
    },
   /*  Home : {
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
    }, */

},{
    headerMode:'none',
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
Report :{screen : Report},
Settings : {screen : Settings},

},{
    headerMode:'none'
}
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
    transitionConfig: () => fromLeft(500),

});




const Body= SwitchNavigator(
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

export default class App extends Component{
    constructor(props){
        super(props)
        
    }
    render(){
        return(
            <Provider store={store}>
            <Body />
      </Provider>
        )
    }
}
