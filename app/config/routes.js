import React from 'react';
import { StackNavigator,TabNavigator,DrawerNavigator } from 'react-navigation';
import {SwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Home';
import Users from '../screens/Users';
import Groups from '../screens/Groups';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Location from '../screens/Location';
import Profile from '../screens/Profile';
import Forget from '../screens/Forget';
import Chat from '../screens/Chat';
import Public from '../screens/Public';
import CS from '../screens/CS';
import PT from '../screens/PT';
import BD from '../screens/BD';
import Authloading from '../screens/Authloading';


export const AppStack = StackNavigator({
    tabs : {screen: TabNavigator(
        {
        Home : {
            screen : Profile,
            navigationOptions: {
                title:'Home',
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => <Icon name="music" size={25} color={tintColor} />
            }
        },
        Friends : {
            screen : Users,
            navigationOptions: {
                headerTitle:'Friends',
                tabBarLabel: 'Users',
                tabBarIcon: ({ tintColor }) => <Icon name="comments" size={25} color={tintColor} />
            }
        },
        Groups : { 
            screen : Groups,
            navigationOptions: {
                headerTitle:'Groups',
                tabBarLabel: 'Groups',
                tabBarIcon: ({ tintColor }) => <Icon name="phone" size={25} color={tintColor} />
            }
        },
        Public : {
            screen : Public,
            navigationOptions: {
                headerTitle:"Public",
                tabBarLabel: "Public",
                tabBarIcon: ({ tintColor }) => <Icon name="globe" size={25} color={tintColor} />
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
            inactiveTintColor:'#E6E6E6',
            activeTintColor: '#1CA2BB',
            labelStyle: {
              fontSize: 12,
              color:'white'
            },
            style: {
              backgroundColor: '#212121',
            },
          }
    })
},
loo:{screen:Home},
chat : {screen : Chat},
cs : {screen : CS},
pt : {screen : PT},
bd : {screen : BD}
});

   export const AuthStack = StackNavigator({
       login : {screen : Login},
       register : {screen : Register},
       location : {screen : Location},
       forget : {screen : Forget}
   }, 
  )

   