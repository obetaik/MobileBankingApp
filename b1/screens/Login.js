import React, { Component } from 'react'
import { View,
    Text,
     TouchableOpacity,
      TextInput, 
      StyleSheet,
      Alert, 
   Dimensions,
 } from 'react-native'
 import { inject, observer } from 'mobx-react';
   
const accountListArray = [];

@inject('LocalStore')
@observer
class Login extends Component {
   
   constructor(props) {
      super(props)
      this.state = {
         storedName: ''
      }
  }
   state = {
      userId: '',
      userIdErr:'',
      oldPin: '',
      pin: '',
      pinErr:'',
   }
 
   state = {
      userListArray:[],
      fetchedUserId: '',
      fetchedPin:'',
      fetchedName:'',
      };

   handleUserId = (text) => {
      this.setState({ userId: text })
      this.setState({ userIdErr: "" });
   }
   handlePin = (text) => {
      this.setState({ pin: text });
     // alert(' password: ' + text);
     this.setState({ pinErr: "" });
   }

    
    login = async (userId, pin) => {
       if (userId === '' ){
         Alert.alert("User Id must be provided") ;
         this.setState({ userIdErr: "User Id must be provided" });
         return null;
      }
      if (pin===''){
         Alert.alert(" PIN must be provided") ;
         this.setState({ pinErr: " PIN must be provided" });
         return null;
      }
let result = '';
   console.log('User to log in :'+this.state.userId)
    const response =   await fetch('http://412c-77-102-46-44.ngrok.io/api/user/'+this.state.userId, {
         //await fetch('http://08ff-86-187-169-87.ngrok.io/api/transaction', {
               method: 'GET',
               headers: { 
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache, no-store, must-revalidate',
                  'Pragma': 'no-cache',
                  'Expires': 0,
                  'Last-Modified': (new Date()).toUTCString()
                },
              
             })
 .then(response => response.json())
 .then(json => {
 this.setState({
 userListArray:json
 //userListArray:data
 })
 //console.log('----------'+this.state.userListArray.data)
 if(this.state.userListArray.data !== null){
   console.log('----------'+this.state.userListArray.data.userId)
 let userId = this.state.userListArray.data.userId;
let name = this.state.userListArray.data.name;
let pin = this.state.userListArray.data.pin;
   console.log("User exist")
   console.log(userId);
console.log(name);
console.log(pin);

this.setState({
   fetchedUserId:userId,
   fetchedPin:pin,
   fetchedName:name,
   })
 
   console.log(this.state.fetchedName)
   //this.setState({ storedName: '' })
   //this.setState({ storedName: this.state.fetchedName })
   const { LocalStore } = this.props
   LocalStore.addUserData(this.state.fetchedUserId,this.state.fetchedPin,this.state.fetchedName)
}else{
   console.log("User DOES NOT exist")
   //this.setState({ storedName: '' })
                const { LocalStore } = this.props
                LocalStore.addUserData('','','')
     return null;
}

 }).catch((error) => {
    
   // Handle the error
   console.warn(error);
 });
  
           if( (userId === this.state.fetchedUserId) && (pin ===this.state.fetchedPin) ){
            //Alert.alert(this.state.fetchedName);
            this.props.navigation.navigate("HomeScreen",{accountListArray}) 
          }
          else{
            Alert.alert("Invalid user Id or pin.")
          }
      
   
   }
  
  
   
    componentDidMount() {
    //  this.fetchAccounts()
    this.state.userId='';
    this.state.pin='';
    const { LocalStore } = this.props
    LocalStore.addUserData('','','')
      }
   
   render() { 
      return ( 
         <View style={styles.containerInner}> 
         <View >
         <View> 
          
         </View>
            <TextInput style = {styles.input}
                placeholder = "User Id"
               placeholderTextColor = "blue"
               autoCapitalize = "none"
               value= {this.state.userId}
               onChangeText = {this.handleUserId}/>
            <Text style={styles.errorText}>{this.state.userIdErr}</Text>
            <TextInput style = {styles.input}
                placeholder = "PIN"
               placeholderTextColor = "blue"
               autoCapitalize = "none"
               secureTextEntry={true}
               value= {this.state.pin}
               keyboardType="number-pad"
               onChangeText = {this.handlePin}/>
            <Text style={styles.errorText}>{this.state.pinErr}</Text>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.userId, this.state.pin )
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
         </View>
      ) 
   }
}

const styles = StyleSheet.create({
 
   input: {
      marginBottom: 5,
      width: 150,
      marginLeft:  Dimensions.get("window").width - 280, 
      alignItems: "center",
      height: 20,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      paddingLeft: 50,
      marginLeft:  Dimensions.get("window").width - 280,
      //justifyContent: 'center',
      alignContent: 'center',
     // marginLeft: 25,
      height: 20,
      width: 150
     },
   submitButtonText:{
      color: 'white'
   },
   errorText: {
      color: "red", 
      marginLeft:  Dimensions.get("window").width - 280, 
      marginTop: 1, 
      height: 30,
      justifyContent: "center" 
   },
   bankname: {
     marginLeft: Dimensions.get("window").width - 280, 
     color: 'red', 
     fontWeight: 'bold',
     paddingBottom: 55,
    // paddingLeft: 22,
     justifyContent:"center",
     alignContent: "center"
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
})

//export default inject("LocalStore")(observer(Login));
export default Login

