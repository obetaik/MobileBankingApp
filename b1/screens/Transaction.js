import React, { Component } from 'react';
import { View,
   StyleSheet,
     ScrollView 
    } 
    from 'react-native';

    import TimerMixin from 'react-timer-mixin';

import { Table, Row, } from 'react-native-table-component';
import { inject, observer } from 'mobx-react';



@inject('LocalStore')
@observer
export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Acct No.', 'Txn Id', 'Txn Type', 'Txn Amt', 'Txn Desc', 'Txn Date'],
      widthArr: [100, 100, 100, 100, 180, 220], // width of each column
      tempDataArray: [],
      transactionListArray:[],
 
      tableData: [],
       rowData: [],
    }
  
  }
  
async fetchTransactions(){
 
  //fetch('http://08ff-86-187-169-87.ngrok.io/api/accounts')
 await  fetch('http://2a02-77-102-46-44.ngrok.io/api/transaction', {
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
   transactionListArray:json
   })
   
   console.log(json.length)
      this.state.tableData = [];

    //Iterate through the transaction json and populate an array for display
    for (let j = 0; j < json.length; j += 1) {
      const rowData = [];
       rowData.push(`${this.state.transactionListArray[j].accountNumber}`);
    rowData.push(`${this.state.transactionListArray[j].transactionId}`);
    rowData.push(`${this.state.transactionListArray[j].transactionType}`);
    rowData.push(`${this.state.transactionListArray[j].transactionAmount}`);
    rowData.push(`${this.state.transactionListArray[j].transactionDesc}`);
    rowData.push(`${this.state.transactionListArray[j].transactionDate}`);
    //  }
  
       this.state.tableData.push(rowData);
    }
//+++++
   })

  
   }
  
   async fetchStoredTransactions(){
 
 
    const { LocalStore } = this.props;
         //LocalStore.getUserData();
         await LocalStore.getTransactions();
         const {storedTransactionString } =  await this.props.LocalStore
         console.log('00000000000000000===txn==000000000000000000000');
        console.log(storedTransactionString)
        let txns = await JSON.parse(storedTransactionString).transaction;
       console.log(txns);
       console.log("1..")
       this.state.transactionListArray = await txns;
       await console.log(" array ;length: "+this.state.transactionListArray.length)
      await console.log("here..")
   await  console.log("Txn Array :"+this.state.transactionListArray[0].accountNumber)
    
   //this.state.transactionListArray =  await this.getList(txns.transaction);
        this.state.tableData = [];
         console.log("here. 3.")
          console.log("Txn Array :"+this.state.transactionListArray.length)
       //Iterate through the transaction json and populate an array for display
        for (let j = 0; j < this.state.transactionListArray.length; j += 1) {
         const rowData = [];
          rowData.push(`${this.state.transactionListArray[j].accountNumber}`);
       rowData.push(`${this.state.transactionListArray[j].transactionId}`);
       rowData.push(`${this.state.transactionListArray[j].transactionType}`);
       rowData.push(`${this.state.transactionListArray[j].transactionAmount}`);
       rowData.push(`${this.state.transactionListArray[j].transactionDesc}`);
       rowData.push(`${this.state.transactionListArray[j].transactionDate}`);
       //  }
     
          this.state.tableData.push(rowData);
       }
       this.setState({
        transactionListArray:  this.state.tableData
        });
      }

       getList(txns){
        console.log(" ::::"+txns[0].accountNumber);
        this.state.transactionListArray =  txns;
       // console.log(" array ;length: "+this.state.transactionListArray.length)
    //  await console.log("here..")
  // await  console.log("Txn Array :"+this.state.transactionListArray[0].accountNumber)
        return  this.state.transactionListArray;
      }
   componentDidMount() {
   // UNSAFE_componentWillMount(){
  // this.fetchTransactions();
  // set timer for updating state
  TimerMixin.setTimeout.call(this, async () =>{ 
    
     this.fetchStoredTransactions();
    await console.log('firing...5 seconds before updating component');
     
    this.setState({
      transactionListArray:  this.state.tableData
      })
    console.log('firing...done: ');
},5000);

 
   // this.fetchStoredTransactions();
   }
 
 
  //=======================================================
  render() 
  {
   // this.state.tableData.push('');
    //this.fetchTransactions();
    //this.fetchStoredTransactions();
   
      const rowData = [];
         rowData.push(`${0}${0}`);
    
    console.log('+++++++++++++==')
    const state = this.state
    return(
    <View style={styles.container}>
    <ScrollView horizontal={true}>
      <View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            {
              state.tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData} 
                  widthArr={state.widthArr}
                  style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                  textStyle={styles.text}
                />
              ))
            }
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  </View>
    )}


  //++++++++++++++++++++++++++++++++++++++++++++++

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40,  width:'100%', 
    backgroundColor: '#E7E6E1' }  ,

  
});