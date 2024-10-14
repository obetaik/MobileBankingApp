import * as React from 'react';
import {Text, 
   View,
  StyleSheet, 
  Dimensions,
  FlatList,
  TouchableHighlight
} from 'react-native';
 

import {  StackedBarChart,} from 'react-native-chart-kit';
import { inject, observer } from 'mobx-react';


const screenWidth = Dimensions.get('window').width;
  
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
 export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
        this.state = {
         storedUserId: '',
         storedPin: '',
         storedName: '',
         storedAccountString: '',
        } 
}

  state = {
    accountListArray:[],
    fetchedName: '',
    };


    async fetchAccounts(){
     
     //fetch('http://08ff-86-187-169-87.ngrok.io/api/accounts')
      await fetch('http://2a02-77-102-46-44.ngrok.io/api/accounts/'+this.state.storedUserId, {
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
      console.log(JSON.stringify(json))
      //JSON.stringify(json)
      const { LocalStore } = this.props
   LocalStore.addAccounts(JSON.stringify(json))

      this.setState({
      accountListArray:json
      })
      })
      }
      
     
     async componentDidMount() {
      const { LocalStore } = this.props;
      LocalStore.getUserData();
      const {storedName , storedUserId} =  this.props.LocalStore
      this.state.storedUserId = storedUserId;
      console.log("User Id :"+this.state.storedUserId)
      this.fetchAccounts()
     //const { LocalStore } = this.props;
      //LocalStore.getUserData();
      LocalStore.getAccounts();
      
      const { storedAccountString } =  this.props.LocalStore
     console.log('00000000000000000=====000000000000000000000');
     //console.log(storedAccountString) 
     let acct = await JSON.parse(storedAccountString);
   console.log(acct);
   this.state.accountListArray = await acct;

   console.log("Dashboard Accounts :"+this.state.accountListArray)
     //replacing double quotes from the store value
        this.state.fetchedName =  storedName.replace (/(^")|("$)/g, '');

      }
      
    render(){
      
      return (
 <View style={{marginLeft:10}} >
 
    <View> 
    <Text style={{color: 'blue', fontSize:22, height: 33}}>Welcome! {this.state.fetchedName}</Text>
      <Text style={{color: 'blue', paddingLeft:33, fontSize:15, height: 33}}> My Statistics for this month</Text>
    </View>
    <FlatList
horizontal
showsHorizontalScrollIndicator = {true}
style={{flexGrow: 0}}
contentContainerStyle={{paddingLeft:0}} 
  data={this.state.accountListArray}
  //data={dataList}
  renderItem={({ item, index, separators }) => (
    <TouchableHighlight
      key={item.key} >
      <View style={{ backgroundColor: 'lightgreen', width: 330, marginLeft: 0 }}>
        <Text style={{fontWeight: 'bold', fontSize: 22, paddingLeft: 80, alignItems: 'center'}}>
        {item.accountNumber}
        </Text>
        <View style={{ backgroundColor: 'lightgreen', width: 350, marginLeft: 20 }}>
        <StackedBarChart
          data={data}
          width={300}
          height={420}
          strokeWidth={16}
          radius={20}
           chartConfig={{
            backgroundColor: "#218838",
            backgroundGradientFrom: "#e2e2e2",
            backgroundGradientTo: "#e2e2e2",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#218838"
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          hideLegend={false}
        />
        </View>
      </View>
    </TouchableHighlight>
  )}
/>

     </View>
  ); 
}
}

const styles = StyleSheet.create({
 
  dashboardText: {     
    fontWeight: '400',
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
  },

  dashboardGrid: {
    marginTop: 2,
    width: 145,  
    backgroundColor: 'yellow',  
    paddingStart: '6%',
    paddingEnd: 1,
    paddingTop: 2,
    marginRight: 10,
    marginLeft: 11,
    marginBottom: 22,
    paddingBottom: 22,
    borderRadius: 22,
  },
 paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerInner: {
    // flex: 1,
    width: '93%',
    marginLeft:15,
    borderRadius: 10,
     justifyContent: 'center',
    backgroundColor: 'white',
   },
});
