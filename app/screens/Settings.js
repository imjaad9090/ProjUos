//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView,Platform,Linking,Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from "react-native-vector-icons/Feather";
import { CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";


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
        this.state={
            checked:false,
            switch:false,
            switch2:false,
            modalVisible:false
        }

    }

    //changesortBy
    changeType(props){
        if(props == 'name'){
            this.props.changesortBy('name')
            this.setState({switch1:true,switch2:false})
        }
        else if(props == 'role') {
            this.props.changesortBy('role')
            this.setState({switch1:false,switch2:true})
        }
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
                  height: "50%",
                  backgroundColor: "white",
                  borderColor: "#576574",
                  borderWidth: 3
                }}
              >
                <View style={styles.headerPop}>
    
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
                    Devs can be contacted at this contact email.
                    unichat.team@gmail.com
                  </Text>

   
                </View>
    
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible:false})}
                  activeOpacity={0.9}
                  style={{
                    position: "absolute",
                    width: "100%",
                    paddingVertical: 10,
                    backgroundColor: "#576574",
                    alignItems: "center",
                    justifyContent: "center",
                    bottom: 0
                  }}
                >
                  <Text style={{ color: "white" }}>Done</Text>
                </TouchableOpacity>
              </View>
            </Modal>












            <View style={{flex: 1,
        padding:9,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',}}> 
        
       
        <ScrollView style={{width:'100%',height:'100%', padding:9,
        backgroundColor: '#f5f5f5',}}>
        
        <Text style={{color:'#576574',fontSize:15,fontWeight:'500'}}>Contact and Support</Text>

            <TouchableOpacity activeOpacity={0.9} onPress={()=>this.setState({modalVisible:true})}  style={{marginVertical:7,shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},width:'100%',
                alignItems:'center',justifyContent:'center',paddingVertical:8,backgroundColor:'white',borderRadius:3}}>
                <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>Contact</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('Report')}  style={{marginVertical:7,shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},width:'100%',
                alignItems:'center',justifyContent:'center',paddingVertical:8,backgroundColor:'white',borderRadius:3}}>
                <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} onPress={()=>Linking.openURL('https://github.com/imjaad9090/ProjUos/blob/master/app/Privacy.txt')}  style={{marginVertical:7,shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},width:'100%',
                alignItems:'center',justifyContent:'center',paddingVertical:8,backgroundColor:'white',borderRadius:3}}>
                <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>Privacy Policy</Text>
            </TouchableOpacity>

                        
        <Text style={{color:'purple',fontSize:15,fontWeight:'500'}}>General</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={()=>console.log('th')}  style={{marginVertical:7,shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},width:'100%',alignItems:'flex-start', paddingVertical:8,backgroundColor:'white',borderRadius:3}}>
               

               
                <Text style={{color:'#576574',fontSize:15,fontWeight:'400',margin:5}}>Sort User List</Text>
            
                    <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:8}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                    <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>By role</Text>

                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                    <Switch
                    style={{width:60}}
                    tintColor='#0b2441'
                    thumbTintColor='white'
                    value={this.state.switch1}
                    onValueChange={()=>this.changeType('name')}
                    
                    
                    />                    
                    </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:8}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                    <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>By name</Text>

                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                    <Switch
                    style={{width:60}}
                    tintColor='#0b2441'
                    thumbTintColor='white'
                    value={this.state.switch2}
                    onValueChange={()=>this.changeType('role')}
                    
                    
                    />                    
                    </View>
                    </View>

            </TouchableOpacity>

                    <Text style={{color:'#10ac84',fontSize:15,fontWeight:'500'}}>Rate Application</Text>
                
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>Linking.openURL('https://play.google.com/store?hl=en')}  style={{marginVertical:7,shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 1},width:'100%',
                alignItems:'center',justifyContent:'center',paddingVertical:8,backgroundColor:'white',borderRadius:3}}>
                <Text style={{color:'#576574',fontSize:15,fontWeight:'400'}}>Rate Application</Text>
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
  