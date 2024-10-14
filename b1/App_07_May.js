import React, {useState, useEffect }  from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  //AsyncStorage,
  TouchableOpacity,
  LogBox,
  YellowBox ,
  ScrollView,
  ImageBackground,
  Dimensions
} from 'react-native';

import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Provider } from 'mobx-react';
//import { Provider, inject, observer } from "mobx-react";
import * as Location from 'expo-location';


import LocalStore from './store/LocalStore';

import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import Index from './screens/Index'
import Transfer from './screens/Transfer'
import ChangePin from './screens/PinChange'
import AccountOpening from './screens/AccountOpening'
import Accounts from './screens/Accounts'
import Transaction from './screens/Transaction'
import LogoutMsg from './screens/LogoutMsg'

LogBox.ignoreAllLogs();

YellowBox.ignoreWarnings([
  'Animated: `useNativeDriver` was not specified.',
]);

function InitialLoadingScreen({ navigation }) {
  let checkDim = 'portrait'
 // const { LocalStore } = this.props;
//       LocalStore.reset();
//  Dimensions.addEventListener('change', () => {
      //this.setOrientation({
     //   orientation: isPortrait() ? 'portrait' : 'landscape'
     // });
     if (isPortrait() ) {
   
      checkDim = 'portrait'
     }else{
     // console.log("LANDSCAPE.,.")
        checkDim = 'landscape'
     }
   // });
    console.log(checkDim)
    return (
    <Provider LocalStore={LocalStore}>
    <SafeAreaView style={styles.container}>
      <Index navigation={ navigation}/>
       
    </SafeAreaView>
    </Provider>
      
  );
}
function ChangePinScreen({ navigation }) {
  return ( 
    <SafeAreaView style={styles.container}>
    <Text style={styles.bankname}>
            BCU BANKING APP
         </Text>
         <Provider LocalStore={LocalStore}>
      <ChangePin navigation={ navigation}/>
        </Provider>  
      
    </SafeAreaView>
  );
}
  function ListAccountScreen({ navigation }) {
    return ( 
      <SafeAreaView style={styles.container}>
      <Text style={styles.bankname}>
              BCU BANKING APP
           </Text>
           <Provider LocalStore={LocalStore}>
        <Accounts navigation={ navigation}/>
        </Provider>    
        
      </SafeAreaView>
    );
  }

  function ListTransactionScreen({ navigation, route }) {
    return ( 
      <SafeAreaView style={styles.container}>
      <Text style={styles.bankname}>
              BCU BANKING APP 
           </Text>
           <Provider LocalStore={LocalStore}>
        <Transaction navigation={ navigation}/>
        </Provider>    
        
      </SafeAreaView>
    );
  }
function LoginScreen({ navigation }) {
  return ( 
    <Provider LocalStore={LocalStore}>
    <SafeAreaView style={styles.container}>
    <ImageBackground source = {{uri:'http://img.itc.cn/photo/j8xeRC9O6Ft'}}  
                             style={{width: '98%',marginLeft: '2%',marginTop: '5%', height: '98%', alignContent: 'center', justifyContent: 'center'}}> 
    <Text style={styles.bankname}>
            BCU BANKING APP
         </Text>
    <View style={styles.containerInner}> 
      <Login navigation={ navigation}/>
      </View>
      </ImageBackground>
    </SafeAreaView>
    </Provider>
  );
}
function AccountOpeningScreen({ navigation }) {
  return ( 
    <SafeAreaView style={styles.container}>
    <Text style={styles.bankname}>
            BCU BANKING APP
         </Text>
    <ScrollView>
    <Provider LocalStore={LocalStore}> 
      <AccountOpening navigation={ navigation}/>
      </Provider>
          </ScrollView>
      
    </SafeAreaView>
  );
}
function TransferScreen({ navigation }) {

  return ( 
    <SafeAreaView style={styles.container}>
    <Text style={styles.bankname}>
            BCU BANKING APP
         </Text>
         <Provider LocalStore={LocalStore}>
          <Transfer navigation={ navigation} />
          </Provider>
      
    </SafeAreaView>
  );
}


function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground source = {{uri:'http://img.itc.cn/photo/j8xeRC9O6Ft'}}  
                             style={{width: '100%', height: '100%'}}> 
    <Text style={styles.bankname}>
            BCU BANKING APP
         </Text>
         
    <View >
    <Provider LocalStore={LocalStore}>
      <Dashboard navigation={ navigation}/>
      </Provider>
          
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

function ResultScreen ({ route, navigation }) {
  //console.warn(route.params.resultMsg)
return ( 
  <SafeAreaView style={styles.container}>
 
 <View >
     <View> 
     <Text style={styles.bankname}>
        BCU BANKING APP
     </Text>
     </View>
        
        <Text style = {styles.input}>{route.params.resultMsg}</Text>
            
        
               
              <View style={{ position: 'relative', flexDirection: "row",}}>
                      
                      <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => navigation.navigate("Dashboard")}>
                      <Text style={styles.submitButtonText}> OK. </Text>
                      </TouchableOpacity>
              </View>
     </View>
        
    
  </SafeAreaView>
);
}


function LogoutScreen ({ route, navigation }) {
  //console.warn(route.params.resultMsg)
return ( 
  <SafeAreaView style={styles.container}>
  <ImageBackground source = {{uri:'http://img.itc.cn/photo/j8xeRC9O6Ft'}}  
                             style={{width: '100%', height: '100%'}}> 
  
 <View >
     <View> 
     <Text style={styles.bankname}>
        BCU BANKING APP
     </Text>
     </View>
     <Provider LocalStore={LocalStore}>
        <LogoutMsg  navigation={ navigation}/>
         </Provider>
     </View>
     <View style={{ position: 'relative', flexDirection: "row",}}>
                      
                      <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => navigation.navigate("InitialLoadingScreen")}>
                      <Text style={styles.submitButtonText}> OK. </Text>
                      </TouchableOpacity>
              </View>
   </ImageBackground> 
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   // backgroundColor: '#ecf0f1',
   backgroundColor: 'lightblue',
   // padding: 8,
   borderRadius: 10,
   margin: 10,
   marginTop: 30
//paddingTop: (Platform.OS) === 'ios' ? 20 : 0
//paddingTop: (Platform.OS) === 'ios' ? Dimensions.get("window").height - 600 :  Dimensions.get("window").height - 600
  },
  containerInner: {
   // flex: 1,
   height: '45%',
   width: '90%',
   marginLeft:15,
   borderRadius: 10,
    justifyContent: 'center',
   // backgroundColor: '#ecf0f1',
   backgroundColor: 'white',
   // padding: 8,
  // margin: 10,
//paddingTop: (Platform.OS) === 'ios' ? 20 : 0
//paddingTop: (Platform.OS) === 'ios' ? Dimensions.get("window").height - 600 :  Dimensions.get("window").height - 600
  },
 
   submitButtonText:{
      color: 'white',
      height: 33,
      backgroundColor: "green",
      fontWeight: 'bold'
   },
   input: {
    marginBottom: 100,
    marginBottom: 100,
    fontWeight: 'bold',
    marginLeft:  Dimensions.get("window").width - 320, 
    alignItems: "center",
    justifyContent: 'center',
    height: 30,
 },
 submitButton: {
    backgroundColor: '#7a42f4',
    paddingLeft: 40,
    marginLeft:  Dimensions.get("window").width - 250,
    //justifyContent: 'center',
    alignContent: 'center',
   // marginLeft: 25,
    height: 40,
    width: 100
   },
 submitButtonText:{
    color: 'white'
 },
 bankname: {
   marginLeft: Dimensions.get("window").width - 250, 
   color: 'red', 
   fontWeight: 'bold',
   paddingBottom: 100,
  // paddingLeft: 22,
   justifyContent:"center",
   alignContent: "center"
   }
});

 


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

 
const HomeScreen = () => (
  <Drawer.Navigator initialRouteName="DashboardScreens2" >
        <Drawer.Screen name="Dashboard" component={DashboardScreen}  options={{unmountOnBlur:true}} />
        <Drawer.Screen name="Accounts" component={ListAccountScreen}  options={{unmountOnBlur:true}} />
        <Drawer.Screen name="Transfer" component={TransferScreen} options={{unmountOnBlur:true}} />
        <Drawer.Screen name="Transaction" component={ListTransactionScreen} options={{unmountOnBlur:true}}  />
        <Drawer.Screen name="Open Account" component={AccountOpeningScreen} options={{unmountOnBlur:true}} />
        <Drawer.Screen name="Change Pin" component={ChangePinScreen} options={{unmountOnBlur:true}} />
        <Drawer.Screen name="Log Out" component={LogoutScreen} options={{unmountOnBlur:true}} />
      </Drawer.Navigator>
);


 

      const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    //this.state = {
   //   orientation: isPortrait() ? 'portrait' : 'landscape'
   // };
  // Event Listener for orientation changes
  /*  Dimensions.addEventListener('change', () => {
      //this.setOrientation({
     //   orientation: isPortrait() ? 'portrait' : 'landscape'
     // });
     if (isPortrait() ) {
   
   //  console.log("PORTRAIT..")
     }else{
   //   console.log("LANDSCAPE..")
     }
    });

     */

 

function App(props) {
      return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="InitialLoadingScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InitialLoadingScreen" component={InitialLoadingScreen}  />
        <Stack.Screen name="Login" component={LoginScreen}  />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="Log Out" component={LogoutScreen}  />
      </Stack.Navigator> 
    </NavigationContainer>
    ); 
    }
    
  

export default App;
