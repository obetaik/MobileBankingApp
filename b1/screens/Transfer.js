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
} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

import { inject, observer } from 'mobx-react';

//import {Picker} from '@react-native-picker/picker'; // uninstalled when picker is taking selected value 

@inject('LocalStore')
@observer
class Transfer extends Component {
    
  constructor(props) {
    super(props)
        this.state = {
         storedName: '',
         storedAccountString: '',
         fetchedName: '',
         accountListArray:[],

         tranResponseValues:[],
        selectedValue:'',

         fromAccount: '',
        toAccount: '',
      transactionAmount: '',
    transactionDesc: '',
    transactionCurrency: 'GBP',

    txnAddress: '',
         ready: false,  
         location: '',
         locationArray: [],
         error: null ,

        }

}
 
handleFromAccount = (text) => {
  this.setState({ fromAccount: text });
  alert(' fromAccount: ' + text);
}
handleToAccount = (text) => {
  this.setState({ toAccount: text });
 // alert(' toAccount: ' + text);
}
handleTransactionDesc = (text) => {
  this.setState({ transactionDesc: text });
 // alert(' password: ' + text);
}
  
handleTransactionAmount = (transactionAmount) =>
{
  //Alert.alert('amt chng.');

  //const decimal= new RegExp(/^[-+]?[0-9]+\.[0-9]+$/);   
  
    const _transactionAmountRegEx = new RegExp(/^\s*-?(\d+(\.\d{ 1, 2 })?|\.\d{ 1, 2 })\s*$/)
  if (_transactionAmountRegEx.test(transactionAmount)) 
  {
  this.setState({ transactionAmount : transactionAmount });
  //Alert.alert('amount ok');
  } else{
    
    //  Alert.alert('amount not ok..'); 
    this.setState({ transactionAmount : '' });
    
  }
}

  transferTran = async (fromAccount, toAccount, tranDesc, amount)=> {
    //Alert.alert("Txfer"+fromAccount);
    //console.warn("Select Account Number");
   // return null;
   if (fromAccount === undefined) {
      Alert.alert("Select Account Number."); 
     return null;
    }  
  if (toAccount === undefined) {
    this.setState({ toAccount : '' });
    alert('Please Enter Recipient Account');
    return;
  }

   // Alert.alert(transactionAmount === '' );
    if (this.state.transactionAmount === undefined) {
      Alert.alert("Enter  Amount");
      return null;
    }  

    if(this.state.transactionDesc=== undefined) {
      Alert.alert("Enter Txn Description");
      return null;
    }  
    
try{
  const response =await fetch('http://999m.ngrok.io/api/transaction', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': 0,
          'Last-Modified': (new Date()).toUTCString()
        },
        body: JSON.stringify({
    
          fromAccount: this.state.fromAccount,
          toAccount: this.state.toAccount,
          transactionAmount: this.state.transactionAmount,
          transactionDesc: this.state.transactionDesc,
          transactionAddress: this.state.txnAddress,
          transactionCurrency: 'GBP',
          transactionCurrency: 'GBP'
        })
        
      });
      const msg = await response.json();
   // this.setState({ postId: data.id });
      console.log(msg.message)
       
      this.props.navigation.navigate("ResultScreen",{resultMsg:msg.message}) 
    }
    catch (error) {
        console.error(error);
        this.props.navigation.navigate("ResultScreen",{resultMsg:"Transaction Failed!"}) 
    }
  };
  
   
    
  gotoHome = () => {
    this.props.navigation.navigate("Dashboard")
  };
  
async fetchAccountsFromStore() { 
  const { LocalStore } = this.props;
  await LocalStore.getAccounts(); //Fetch Account details from store
  const { storedAccountString } =  this.props.LocalStore
let acct = await JSON.parse(storedAccountString);
 this.setState({accountListArray: acct })
 // console.log(' acct :'+acct);
   this.state.accountListArray = await acct;
  console.log("txfer Accounts :"+this.state.accountListArray)
  return
}
  
async findCoordinates (){
  console.log('========Finding current location  ========================')


  let { status } = await Location.requestForegroundPermissionsAsync();
  console.log('Permission :'+status);
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }
  console.log('After Permission ');
  let loc = await Location.getCurrentPositionAsync({});
  this.state.location = await loc;
  //this.setState({location: loc })
  console.log(' LOC :'+this.state.location);

    let lat = JSON.stringify(this.state.location.coords.latitude);
    //this.state.locationArray = this.state.location;
    console.log(' lat :'+lat);
    let long = JSON.stringify(this.state.location.coords.longitude);
    //this.state.locationArray = this.state.location;
    console.log(' latitude :'+lat +' Longitude :'+long);
   // let coord_Address = await this.getAddressFromCoordinates(lat, long);
   await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=52.4455281,-1.9293932&key=7777777777777', {
    method: 'GET',
    headers: { 
       'Content-Type': 'application/json',
       'Cache-Control': 'no-cache, no-store, must-revalidate',
       'Pragma': 'no-cache',
       'Expires': 0,
       'Last-Modified': (new Date()).toUTCString()
     },
   
  })
.then(response =>  response.json())
.then(json => {
 //console.log(JSON.stringify(json))
//JSON.stringify(json)
this.state.txnAddress =   json;
this.setState({txnAddress:' latitude :'+lat +' Longitude :'+long+ ': '+this.state.txnAddress.results[0].formatted_address })
})
 
    console.log(' The txn is originated from:'+this.state.txnAddress.results[0].formatted_address);
    this.state.txnAddress =' The txn is originated from:'+this.state.txnAddress.results[0].formatted_address;
};
 //componentDidMount() {
  UNSAFE_componentWillMount(){
//this.fetchAccounts()
this.fetchAccountsFromStore();
 
this.findCoordinates();
 
}  
  render() {
    //this.fetchAccounts() 
    console.log('accountListArray render ---:'+this.state.accountListArray)
    console.log('txnAddress render ---:'+this.state.txnAddress)
    YellowBox.ignoreWarnings([
      'Picker has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from \'@react-native-picker/picker\' instead of \'react-native',
    ]);
    return (
      <View>
       <Text style={{ borderWidth: 0,fontWeight: 'bold', fontSize: 22, height: 30, paddingTop: 3,marginBottom:1, 
       paddingLeft:77 }}> Transfer Form.</Text>

       
<Text style={{ borderWidth: 0,fontWeight: 'italic', fontSize: 10, height: 30, paddingTop: 3,marginBottom:1, 
       paddingLeft:77 }}> {this.state.txnAddress}</Text>

        <View style={{marginLeft: 30, borderWidth: 1, height: 30, marginTop: 50, borderColor: 'blue',justifyContent: "center",width: '70%', }}>
          {<Picker style={{ color: "blue", fontSize:17 , justifyContent: "center"}} 
                onValueChange={(itemValue, itemIndex) => this.setState({fromAccount: itemValue})} >
                <Picker.Item label="Select Account" value=""  /> 
                { this.state.accountListArray.map((item, key)=>
                  <Picker.Item label={item.accountNumber+''} value={item.accountNumber} key={key}  />
                )}
              </Picker>}
       </View>
  

        <TextInput
          style={styles.input}
          placeholder="Recipient Account"
          placeholderTextColor="blue"
          autoCapitalize="none"
          keyboardType="number-pad"
          onChangeText = {this.handleToAccount}
        />
 

        <TextInput
          style={styles.input}
          placeholder="transactionAmount"
          placeholderTextColor="blue"
          autoCapitalize="none"
          keyboardType='numeric'
          onChangeText={this.handleTransactionAmount}
        />

        
<TextInput
          style={styles.input}
          placeholder="transactionDesc"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText = {this.handleTransactionDesc}
        />

<TextInput
          style={styles.input}
          placeholder="transactionCurrency"
          placeholderTextColor="blue"
          autoCapitalize="none"
          value="GBP"
          editable={false}
        />
<View style={{marginLeft:33, position: 'relative', flexDirection: "row",}}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.transferTran(this.state.fromAccount, this.state.toAccount,this.state.transactionDesc, this.state.transactionAmount)}>
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
});

export default Transfer;
