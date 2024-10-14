import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Picker,
} from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('LocalStore')
@observer
class AccountOpening extends Component {
  constructor(props) {
    super(props)
        this.state = {
          userId: '',
          firstname: '',
          lastname: '',
          dateOfBirth: '',
          gender: '',
          maritalStatus: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          postCode: '',
          country: '',
          nationality: '',
          phonenumber: '',
          email: '',
          nextofKinLastname: '',
          nextOfKinFirstname: '',
          nextOfKinPhonenumber: '',
        }
      }

  handleFirstname = (text) => {
    this.setState({ firstname: text });
  };
  handleLastname = (text) => {
    this.setState({ lastname: text });
    // alert(' password: ' + text);
  };
  handleDateOfBirth = (text) => {
    this.setState({ dateOfBirth: text });
  };
  handleGender = (text) => {
    this.setState({ gender: text });
    // alert(' password: ' + text);
  };
  handleMaritalStatus = (text) => {
    this.setState({ maritalStatus: text });
  };
  handleAddressLine1 = (text) => {
    this.setState({ addressLine1: text });
    // alert(' password: ' + text);
  };
  handleAddressLine2 = (text) => {
    this.setState({addressLine2 : text });
  };

  handleCity = (text) => {
    this.setState({ city: text });
  };
  handlePostCode = (text) => {
    this.setState({ postCode: text });
    // alert(' password: ' + text);
  };
  handleCountry = (text) => {
    this.setState({country : text });
  };
  handleNationality = (text) => {
    this.setState({ nationality: text });
    // alert(' password: ' + text);
  };

  handlePhonenumber = (text) => {
    this.setState({ phonenumber: text });
  };
  handleEmail = (text) => {
    this.setState({ email: text });
    // alert(' password: ' + text);
  };
  handleNextOfKinFirstname = (text) => {
    this.setState({ nextOfKinFirstname: text });
    // alert(' password: ' + text);
  };
  handleNextOfKinLastname = (text) => {
    this.setState({ nextOfKinLastname: text });
  };
  handleNextOfKinPhonenumber = (text) => {
    this.setState({ nextOfKinPhonenumber: text });
    // alert(' password: ' + text);
  };
    
    
  gotoHome = () => {
    this.props.navigation.navigate("Dashboard")
  };
  
 
  createAccount = async ()=> {
   
     if(this.state.toAccount== "" ) {
       Alert.alert("Enter Recipient Account Number");
     }  
      
 
 try{
  //const response =await fetch('http://08ff-86-187-169-87.ngrok.io/api/accounts', {
   const response =await fetch('http://2a02-77-102-46-44.ngrok.io/api/accounts', {
         method: 'POST',
         headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': 0,
          'Last-Modified': (new Date()).toUTCString()
        },
         body: JSON.stringify({
           firstname: this.state.firstname,
          lastname: this.state.lastname,
           gender: this.state.gender,
           maritalStatus: this.state.maritalStatus,
           customerId: this.state.userId,
           dateOfBirth: this.state.dateOfBirth,
           addressLine1: this.state.addressLine1,
           addressLine2: this.state.addressLine2,
           city: this.state.city,
          postCode: this.state.postCode,
          country: this.state.country,
          nationality: this.state.nationality,
          phonenumber: this.state.phonenumber,
          email: this.state.email,
          nextOfkinFirstname: this.state.nextOfkinFirstname,
          nextOfkinLastname: this.state.nextOfkinLastname,
          nextOfkinPhonenumber: this.state.nextOfkinPhonenumber,
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
   

   UNSAFE_componentWillMount() {

    const { LocalStore } = this.props;
     LocalStore.getUserData(); //Fetch user details from store
     const {storedUserId } =  this.props.LocalStore
   let u_id = storedUserId;
    // this.setState({userId, storedUserId })
   console.log(u_id);
   this.state.userId =  storedUserId;
    //replacing double quotes from the store value
    console.log('storedUserId '+this.state.userId)

     }

  render() {
    return (
      <View style={{ borderWidth: 1, height: '100%', backgroundColor:'red', borderColor: 'red',justifyContent: "center" }}>
         <View style={{ borderWidth: 1, height: '99%', backgroundColor:'lightblue', borderColor: 'red',justifyContent: "center" }}>

        <Text style={{ borderWidth: 1,fontWeight: 'bold', fontSize: 22, height: 30, paddingTop: 3, paddingLeft:77 }}> Account Opening Form</Text>
        
       
        <TextInput
          style={styles.input}
          placeholder="firstname"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleFirstname}
        />

        <TextInput
          style={styles.input}
          placeholder="lastname"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleLastname}
        />

        <TextInput
          style={styles.input}
          placeholder="dateOfBirth"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleDateOfBirth}
        />


<View style={{ borderWidth: 1,marginBottom: 5, height: 20, marginLeft: 20, width: 180, borderColor: '7a42f4', borderRadius: 20  }}>
          {<Picker style={styles.pickerStyle}
              gender={this.state.gender}
                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})} >
                <Picker.Item label="Select Gender" value=""  />
                 <Picker.Item label="Male" value="Male"  />
                  <Picker.Item label="Female" value="Female"  />
                   <Picker.Item label="Others" value="Others"  /> 
              </Picker>}
</View>

<View style={{ borderWidth: 1, marginBottom: 5, height: 20, marginLeft: 20, width: 180, borderColor: '7a42f4', borderRadius: 20  }}>
          {<Picker style={styles.pickerStyle}
                          maritalStatus={this.state.maritalStatus}
                onValueChange={(itemValue, itemIndex) => this.setState({maritalStatus: itemValue})} >
                <Picker.Item label="Select Status" value=""  />
                 <Picker.Item label="Single" value="Single"  />
                  <Picker.Item label="Married" value="Married"  />
                   <Picker.Item label="Divorced" value="Divorced"  /> 
                    <Picker.Item label="Others" value="Others"  />
              </Picker>}
</View>
        <TextInput
          style={styles.input}
          placeholder="addressLine1"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleAddressLine1}
        />
         <TextInput
          style={styles.input}
          placeholder="addressLine2"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleAddressLine2}
        />
         <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleCity}
        />
         <TextInput
          style={styles.input}
          placeholder="postCode"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handlePostCode}
        />
         <TextInput
          style={styles.input}
          placeholder="country"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleCountry}
        />
         <TextInput
          style={styles.input}
          placeholder="nationality"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleNationality}
        />
         <TextInput
          style={styles.input}
          placeholder="phonenumber"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handlePhonenumber}
        />
         <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
         <TextInput
          style={styles.input}
          placeholder="nextOfKinFirstname"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleNextOfKinFirstname}
        />
         <TextInput
          style={styles.input}
          placeholder="nextofKinLastname"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleNextofKinLastname}
        />
         <TextInput
          style={styles.input}
          placeholder="nextOfKinPhonenumber"
          placeholderTextColor="blue"
          autoCapitalize="none"
          onChangeText={this.handleNextOfKinPhonenumber}
        />
<View style={{ position: 'relative', flexDirection: "row",}}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.createAccount()}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.gotoHome()}>
          <Text style={styles.submitButtonText}> Cancel </Text>
        </TouchableOpacity>
</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom:5,
    height: 20,
    borderColor: 'blue',
    borderWidth: 1,
    width:'50%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    marginLeft: 20,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    margin: 15,
    height: 40,
    width:'30%', 
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
  },
  pickerStyle: {
    marginBottom:5,
    height: 20,
    borderColor: 'blue',
    borderWidth: 1,
    width:'100%',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    color: 'blue',
    borderRadius: 10
  },
  containerInner: {
    // flex: 1,
   // height: '55%',
    //width: '93%',
    marginLeft:15,
    borderRadius: 10,
    // justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    backgroundColor: 'white',
   },
});

export default AccountOpening;
