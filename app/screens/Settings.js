//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView,Platform,Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from "react-native-vector-icons/Feather";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
// create a component
class Settings extends Component {

    static navigationOptions =({ navigation }) =>{
       /*  title:'Groups'
        
        headerStyle:{
        backgroundColor:'#2A3963'
        } */
        header:null
        
    }


    constructor(){
        super()

    }


    componentDidMount(){
    }

    render() {
        return (
            <View style={{flex:1}}>
            <View style={styles.header}>
            <View style={styles.headerInner}>
            <Icon name="arrow-left" size={26} onPress={()=>this.props.navigation.pop()} color={'white'} />
            <Text style={styles.headerText}>Settings</Text>
            </View>
            </View>
            <View style={{flex: 1,
        padding:9,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',}}> 
        
       
        <ScrollView style={{width:'100%',height:'100%', padding:9,
        backgroundColor: '#f5f5f5',}}>
        
        <Text style={{color:'#576574',fontSize:15,fontWeight:'500'}}>Contact and Support</Text>

            <TouchableOpacity activeOpacity={0.9} onPress={()=>console.log('contact')}  style={{marginVertical:7,shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},width:'100%',
                alignItems:'center',justifyContent:'center',paddingVertical:8,backgroundColor:'white',borderRadius:3}}>
                <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>Contact</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('Report')}  style={{marginVertical:7,shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},width:'100%',
                alignItems:'center',justifyContent:'center',paddingVertical:8,backgroundColor:'white',borderRadius:3}}>
                <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} onPress={()=>Linking.openURL('https://play.google.com/store?hl=en')}  style={{marginVertical:7,shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},width:'100%',
                alignItems:'center',justifyContent:'center',paddingVertical:8,backgroundColor:'white',borderRadius:3}}>
                <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>Rate Application</Text>
            </TouchableOpacity>

                        
        <Text style={{color:'purple',fontSize:15,fontWeight:'500'}}>General</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={()=>Linking.openURL('https://play.google.com/store?hl=en')}  style={{marginVertical:7,shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},width:'100%',alignItems:'flex-start', paddingVertical:8,backgroundColor:'white',borderRadius:3}}>
               

               
                <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>Show User Mode</Text>
            </TouchableOpacity>



        </ScrollView>


        </View>


            
            
            
            </View>
           

        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:9,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
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
    headerText: {
        flexDirection: 'row',
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontSize: 19,
        color: 'white',
        fontWeight: '400'
    },
});

//make this component available to the app
const mapStateToProps = (state) => {
    return { colors: state.theme.appTheme };
  }
  
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Settings);
  