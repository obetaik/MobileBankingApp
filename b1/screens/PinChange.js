import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Picker,
  YellowBox,
  Dimensions,
} from 'react-native';

import { inject, observer } from 'mobx-react';
//import {Picker} from '@react-native-picker/picker'; // uninstalled when picker is taking selected value

@inject('LocalStore')
@observer
 export default class PinChange extends React.Component {
  constructor(props) {
    super(props)
        this.state = {
         storedUserId: '',
         storedPin: '',
         storedName: '',
        } 
}

state={
  userId: '',
  pin: '',
  pinErr: '',
  oldPin: '',
  oldPinErr: '',
  confirmPin: '',
  confirmPinErr: '',
  fetchedPin: '',
}
  handleOldPin = (text) => {
    this.setState({ oldPin: text })
    this.setState({ oldPinErr: "" });
 }
 handlePin = (text) => {
  // Alert.alert(text);
    this.setState({ pin: text });
   this.setState({ pinErr: "" });
 }
 handleConfirmPin = (text) => {
  this.setState({ confirmPin: text })
  this.setState({ confirmPinErr: "" });
}
   updatePin = async (oldPin, pin, confirmPin) => {
    const { LocalStore } = this.props;
    LocalStore.getUserData();
     const {storedUserId, storedPin, storedName } =  this.props.LocalStore

    //replacing double quotes from the store value
       this.state.fetchedPin =  storedPin.replace (/(^")|("$)/g, '');
       this.state.userId =  storedUserId.replace (/(^")|("$)/g, '');
    
    //Alert.alert(this.state.fetchedPin);
     
   if(pin===''){
      Alert.alert("PIN must be provided") ;
      this.setState({ pinErr: "PIN must be provided" });
      return null;
   } 
   if(oldPin===''){
    Alert.alert("Old PIN must be provided") ;
    this.setState({ oldPinErr: "Old PIN must be provided" });
    return null;
 } 
   if(confirmPin === '' ){
    Alert.alert("Confirm Pin must be provided") ;
    this.setState({ confirmPinErr: "User Id must be provided" });
    return null;
 }
 if(oldPin !== this.state.fetchedPin)  {
  Alert.alert("Old Pin and New Pin must match"+oldPin +':'+this.state.fetchedPin) ;
  this.setState({ oldPinErr: "Old Pin and New Pin must match" });
  return null;
 }
 
   if(pin !== confirmPin)  {
    Alert.alert("New Pin  and Confirm Pin must match") ;
    this.setState({ confirmPinErr: "New Pin  and Confirm Pin must match" });
    return null;
   }

//try{
  Alert.alert(this.state.userId);
  //const response =await fetch('hhttp://08ff-86-187-169-87.ngrok.io/api/changePin', {
    const response =await fetch('http://2a02-77-102-46-44.ngrok.io/api/user/'+this.state.userId, {
    
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': 0,
          'Last-Modified': (new Date()).toUTCString()
        },
        body: JSON.stringify({
        userId: this.state.userId,
          pin: this.state.pin,
        })
        
      });
      const msg = await response.json();
      console.log(msg.message)
       
      this.props.navigation.navigate("ResultScreen",{resultMsg:msg.message}) 
    }
 /*   catch (error) {
        console.error(error);
        this.props.navigation.navigate("ResultScreen",{resultMsg:"Pin Change Failed!"}) 
    }
  };
 */ 
   
    
  gotoHome = () => {
    this.props.navigation.navigate("Dashboard")
  };
  componentDidMount() {
    //  const { LocalStore } = this.props
    const { LocalStore } = this.props;
    LocalStore.getUserData();
   // const {storedUserId, storedPin, storedName } = this.props.LocalStore
    }


  
  render() {
   // const {storedUserId, storedPin, storedName } = this.props.LocalStore
     // Alert.alert('..stored Pin..2 ... '+storedPin);
   // YellowBox.ignoreWarnings([
   //   'Picker has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from \'@react-native-picker/picker\' instead of \'react-native',
   // ]);
    return (
      <View>
       <Text style={{ borderWidth: 0, fontWeight: 'bold', fontSize: 22, height: 30, paddingTop: 3, marginBottom: 35, 
       paddingLeft:77 }}>Pin Change Form.</Text>
        <TextInput
          style={styles.input}
          placeholder="oldPin"
          placeholderTextColor="blue"
          autoCapitalize="none"
          secureTextEntry={true}
          keyboardType="number-pad"
          onChangeText = {this.handleOldPin}
        />
      <Text style={styles.errorText}>{this.state.oldPinErr}</Text>
        <TextInput
          style={styles.input}
          placeholder="Pin"
          placeholderTextColor="blue"
          autoCapitalize="none"
          secureTextEntry={true}
          keyboardType="number-pad"
          onChangeText = {this.handlePin}
        />
      <Text style={styles.errorText}>{this.state.pinErr}</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Pin"
          placeholderTextColor="blue"
          autoCapitalize="none"
          secureTextEntry={true}
          keyboardType='numeric'
          onChangeText={this.handleConfirmPin}
        />
       <Text style={styles.errorText}>{this.state.confirmPinErr}</Text>
        <View style={{ position: 'relative', flexDirection: "row",}}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.updatePin(this.state.oldPin, this.state.pin,this.state.confirmPin)}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.gotoHome()}>
          <Text style={styles.submitButtonText}> Cancel </Text>
        </TouchableOpacity>
      </View>
</View>
    );
  }
 }

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginLeft: 30,
    height: 30,
    borderColor: '#7a42f4',
    borderWidth: 1,
    width: '70%',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    marginLeft: 55,
  },
  submitButtonText: {
    color: 'white',
  },
  pickerStyle: {
    height: 150,
    width: '70%',
    color: 'blue',
    textDecorationColor: 'green',
    justifyContent: 'center',
  },
  containerInner: {
    // flex: 1,
   // height: '55%',
    //width: '93%',
    marginLeft:15,
    borderRadius: 10,
     justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    backgroundColor: 'white',
   },
   errorText: {
    color: "red", 
    marginLeft:  Dimensions.get("window").width - 280, 
    marginTop: 1, 
    height: 30,
    justifyContent: "center" 
 },
});