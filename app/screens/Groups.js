//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
                <Text>Groups</Text>
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
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Groups;
