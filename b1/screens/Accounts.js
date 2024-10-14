import React from 'react';  
import { View, 
  FlatList, 
  StyleSheet, 
  Text,
  Alert,
  ScrollView,
 } from 'react-native';  

import { inject, observer } from 'mobx-react';

const data = {
    labels: ["Prev Mnth", "This Mnth"],
    legend: ["Debit", "Credit",],
    data: [
      [ 200,  500],
      [30, 60]
    ],
    barColors: ["red", "green"]
  };

@inject('LocalStore')
@observer
export default class Accounts extends React.Component {  
    constructor(props) {
        super(props)
            this.state = {
             storedName: '',
             storedAccountString: '',
             storedTransactionString: '',
             fetchedName: '',
             accountListArray:[],
             transactionListArray: [],
            }
 
    }
     
    listTransaction = () => {
        this.props.navigation.navigate("Transaction")
      };

    
      async showAccountTransactions (acctData) {  
        const { LocalStore } = this.props
       //await LocalStore.clearTransactions('')
         
        //  Alert.alert("Account: "+acctData.accountNumber+'\n  Balance '+acctData.balance+''); 
          
           //Alert('Acct ');
     // Alert('Acct :'+acctData.accountNumber);
      
       //fetch('http://08ff-86-187-169-87.ngrok.io/api/accounts')
      //await  fetch('http://2a02-77-102-46-44.ngrok.io/api/transaction', {
            await  fetch('http://2a02-77-102-46-44.ngrok.io/api/transaction/'+acctData.accountNumber, {
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
      
         //console.log(JSON.stringify(json))
           //JSON.stringify(json)
           //const { LocalStore } = this.props
           // LocalStore.clearTransactions('')
         LocalStore.addTransactions(JSON.stringify(json))
        
        this.setState({
        transactionListArray:json
        })
        
       // console.log(json.length)
        this.props.navigation.navigate("Transaction")
         
     //+++++
        })
     
      }  

      fetchAccount = (acctData) => {
      //Alert('Acct ');
     // Alert('Acct :'+acctData.accountNumber);
      
       //fetch('http://08ff-86-187-169-87.ngrok.io/api/accounts')
      //await  fetch('http://2a02-77-102-46-44.ngrok.io/api/transaction', {
         fetch('http://2a02-77-102-46-44.ngrok.io/api/transaction/'+acctData.accountNumber, {
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
      
     //console.log(JSON.stringify(json))
           //JSON.stringify(json)
           console.log("start")
           const { LocalStore } = this.props
        LocalStore.addTransactions(JSON.stringify(json))
        console.log("Done")
        this.setState({
        transactionListArray:json
        })
        
        console.log(json.length)
        
         
     //+++++
        })
     
       
        }
    showAccountDetails = (acctData) => {  
      let acctDetail = "Account: "+acctData.accountNumber;
      acctDetail = acctDetail +'\n  Balance '+acctData.balance;
      acctDetail = acctDetail + '\n Acct Name: '+acctData.accountName;
      acctDetail = acctDetail+ ' \n Status :'+acctData.accountStatus;
      acctDetail = acctDetail + '\n Currency: '+acctData.accountCurrency;
       // Alert.alert("Account: "+acctData.accountNumber+'\n  Balance '+acctData.balance+''); 
        
        Alert.alert(
            //title
            //"Account: "+acctData.accountNumber,
            'Account Details',
            //body
            //' Balance '+acctData.balance+'',
            acctDetail,
            [
              {
                text: 'List Txn',
               //onPress: () => this.props.navigation.navigate("Transaction")
              },
              {
                text: 'Home',
                onPress: () =>  this.props.navigation.navigate("Dashboard")
              },
               
            ],
            {cancelable: true},
            //Out side click of alert to cancel
          );
    }  

    renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
                }}  
            />  
        );  
    };  

    //UNSAFE_componentWillMount() {
      componentDidMount() {
       const { LocalStore } = this.props;
        LocalStore.getUserData(); //Fetch user details from store
        LocalStore.getAccounts(); //Fetch Account details from store
        const {storedName, storedAccountString } =  this.props.LocalStore
       console.log('=====Name from Store is ========='+storedName);
      let acct =  JSON.parse(storedAccountString);
        this.setState({accountListArray: acct, fetchedName:storedName })
       //replacing double quotes from the store value
          this.state.fetchedName =  storedName.replace (/(^")|("$)/g, '');

        }

        render(){
       
            return (
       <View style={{marginLeft:10}} >
     <ScrollView style={{ height: 320,  width:'98%', 
    backgroundColor: '#E7E6E1' }}>
          <FlatList       
      style={{flexGrow: 0}}
      contentContainerStyle={{paddingLeft:0}} 
        data={this.state.accountListArray}
        //data={dataList}
        renderItem={({item}) =>  
                        <Text style={styles.item}  
                              onPress={this.showAccountDetails.bind(this, item)}  onLongPress={this.showAccountTransactions.bind(this, item)} >{item.accountNumber+''}</Text>}  
                    ItemSeparatorComponent={this.renderSeparator}  
                
      />
      </ScrollView>
           </View>
        ); 
      }
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: "#e5e5e5"  
    },  
    separator: {  
        height: 0.5, width: "100%", backgroundColor: "#000"  
    }, 
    item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
    },   
    listContainer: {  
        flex: 1,  
        paddingRight: 15,  
        paddingTop: 13,  
        paddingBottom: 13,  
        borderBottomWidth: 0.5,  
        borderColor: '#c9c9c9',  
        flexDirection: 'row',  
        alignItems: 'center',  
        fontSize: 20,  
        marginLeft: 10,  
    },  
}); 