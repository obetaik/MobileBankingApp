import {  observable, action, makeObservable } from "mobx";
import { AsyncStorage } from 'react-native';

class LocalStore {
    @observable storedUserId = '';
    @observable storedPin = '';
    @observable storedName = '';
    @observable storedAccountString = '';
    @observable storedAccountList = [];
    @observable storedAccountJSON = [];
    @observable storedTransactionList = [];
  

  constructor() {
    makeObservable(this)
}

// to clear data
@action reset = () => {
  this.storedUserId = null;
  this.storedPin = null;
  this.storedName = null;
  this.storedAccountString = null;
  this.storedTransactionString = null;
  this.storedAccountList = [];
  this.storedTransactionList = []; 
 // AsyncStorage.clear();
}
  // action to save User data
  @action addUserData = async(userId, pin, name) => {
    this.storedUserId = userId;
    this.storedPin = pin;
    this.storedName = name;
    await AsyncStorage.setItem('storedUserId', JSON.stringify(this.storedUserId))
    await AsyncStorage.setItem('storedPin', JSON.stringify(this.storedPin))
    await AsyncStorage.setItem('storedName', JSON.stringify(this.storedName))
  };


// action to fetch User data
@action getUserData = async() => {  
    this.storedUserId = await AsyncStorage.getItem('storedUserId');
    this.storedPin = await AsyncStorage.getItem('storedPin');
    this.storedName = await AsyncStorage.getItem('storedName');
  };

 /* 
// action to save Accounts data
@action addAccountsJSON = async(inputJson) => {
  
 // this.storedAccountJSON.push({inputJson});
await AsyncStorage.setItem('storedAccountJSON', JSON.stringify(this.storedAccountJSON))
};

// action to fetch Accounts data
@action getAccountsJSON = async() => {  
  this.storedAccountJSON = await AsyncStorage.getItem('storedAccountJSON');
};
*/
//--------------------------------------------------------------------------

// action to save Accounts data
@action addAccounts = async(stringData) => {
  
  // this.storedAccountJSON.push({inputJson});
 await AsyncStorage.setItem('storedAccountString', stringData)
 };
 
 // action to fetch Accounts data
 @action getAccounts = async() => {  
   this.storedAccountString = await AsyncStorage.getItem('storedAccountString');
 };

 
//=====================================================================================
   // action to save Txns data
   @action addTransactions = async(stringData) => {
    //this.storedTransactionString = await " ";
    // this.storedAccountJSON.push({inputJson});
   await AsyncStorage.setItem('storedTransactionString', stringData)
   };
   
   // action to fetch Txns data
   @action getTransactions = async() => {  
     this.storedTransactionString = await AsyncStorage.getItem('storedTransactionString');
   };

    
/*
// action to save Accounts data
@action addAccountsData = async(accountNumber, accountName, customerId, balance, accountCurrency, accountStatus,accountType) => {
  
  this.storedAccountList.push({
    _id: accountNumber,
    accountNumber: accountNumber,
    accountName: accountName,
    customerId: customerId,
    balance: balance,
    accountCurrency: accountCurrency,
    accountStatus: accountStatus,
    accountType: accountType
});
await AsyncStorage.setItem('storedAccountList', JSON.stringify(this.storedAccountList))
};


// action to fetch Accounts data
@action getAccountsData = async() => {  
  this.storedAccountList = await AsyncStorage.getItem('storedAccountList');
};
*/



} //class
export default new LocalStore();