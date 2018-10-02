//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import firebase from 'react-native-firebase';

// create a component
class Home extends Component {


    static navigationOptions ={
    }

    componentDidMount(){

    }

    render() {
        return (
            <View style={styles.container}>
            

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Home;
