//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// create a component
class Groups extends Component {

    constructor(){
        super()

    }


    componentDidMount(){
    }

    render() {
        return (
            <View style={styles.container}>
            
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
});

//make this component available to the app
export default Groups;
