import React from 'react';  
import { View, StyleSheet, Text, Dimensions } from 'react-native';  

import { inject, observer } from 'mobx-react';

 
@inject('LocalStore')
@observer
export default class LogoutMsg extends React.Component {  
    constructor(props) {
        super(props)
            this.state = {
             storedName: '',
            },

            this.state = {
                fetchedName: ''
                };

          
    }
     
    componentWillMount() {
      
       const { LocalStore } = this.props;
       LocalStore.reset();
        LocalStore.getUserData();
        const {storedName } =  this.props.LocalStore
       console.log('====Will return null since user has logged out by calling reset================='+storedName);
        }

        render(){
      
            return (
       
           <View>     
        <Text style = {styles.input}>You have logged out successfully</Text>
            
        
               
         
        </View>
        ); 
      }
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: "#e5e5e5"  
    },  
  
    input: {
        marginBottom: 100,
        marginBottom: 100,
        fontWeight: 'bold',
        marginLeft:  Dimensions.get("window").width - 320, 
        alignItems: "center",
        justifyContent: 'center',
        fontSize: 15,
        height: 33,
        color: 'red',
     },
}); 