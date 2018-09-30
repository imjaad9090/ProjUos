//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView,Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from "react-native-vector-icons/Feather";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
// create a component
class Groups extends Component {

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


                        <Text style={styles.headerText}>Groups</Text>
                        


                    </View>
                </View>
            <View style={{flex: 1,
        padding:9,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: this.props.colors.background,}}>
            
                <LinearGradient  colors={['#07a585','#076585']} style={{width:'100%',height:140,alignItems:'center',justifyContent:'center',borderColor:'rgba(0,0,0,0.2)',borderWidth:2}}>
                <Text style={{color:'white',fontSize:17,fontWeight:"bold",alignSelf:'center',marginVertical:6}}>Computer Science</Text>
                <Text onPress={()=>this.props.navigation.navigate('cs')} style={{color:'white',alignSelf:'center'}}>Tap to join computer science chat.</Text>
            </LinearGradient>

            <LinearGradient colors={['#ad5389','#3c1053']} style={{width:'100%',height:140,alignItems:'center',justifyContent:'center',borderColor:'rgba(0,0,0,0.2)',borderWidth:2}}>
                <Text style={{color:'white',fontSize:17,fontWeight:"bold",alignSelf:'center',marginVertical:6}}>Physical Therapy</Text>
                <Text onPress={()=>this.props.navigation.navigate('pt')} style={{color:'white',alignSelf:'center'}}>Tap to join physical therapy chat.</Text>
            </LinearGradient>

            <LinearGradient colors={['#e1eec3','#f05053']} style={{width:'100%',height:140,alignItems:'center',justifyContent:'center',borderColor:'rgba(0,0,0,0.2)',borderWidth:2}}>
                <Text style={{color:'white',fontSize:17,fontWeight:"bold",alignSelf:'center',marginVertical:6}}>Business Department</Text>
                <Text onPress={()=>this.props.navigation.navigate('bd')} style={{color:'white',alignSelf:'center'}}>Tap to join this chat.</Text>
            </LinearGradient>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Groups);
  