import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout';

class Chore extends Component {
  constructor(props) {
    super(props);   
    this.state = {
        activeRowKey: null
    };          
}
  render(){
    const swipeSettings = {
      sensitivity: 1,
      scroll: event => console.log('scroll event'),
      left: [
        { 
            onPress: () => {    
                const deletingRow = this.state.activeRowKey;          
                Alert.alert(
                    'Alert',
                    'Are you sure you want to delete ?',
                    [                              
                      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'Yes', onPress: () => {        

                      }},
                    ],
                    { cancelable: true }
                  ); 
            }, 
            text: 'Delete', type: 'delete' 
        }
    ],
      autoClose: true,
      onClose: (secId, rowId, direction) => {
          if(this.state.activeRowKey != null) {
              this.setState({ activeRowKey: null });
          }              
      },          
      onOpen: (secId, rowId, direction) => {
          this.setState({ activeRowKey: this.props.index });
      },  
      // rowId: this.props.index, 
      // sectionId: 0
  }; 

    return(
      <Swipeout {...swipeSettings}>
        <View style={{
                  flex: 1,
                  flexDirection:'column',
                  }}>
          <View style={{
                    flex: 1,
                    flexDirection:'row',             backgroundColor: 'mediumseagreen'
            }}>
            <View style={{
                flex: 1,
                flexDirection:'column',   
                height: 100                 
            }}> 
            <Text
            onPress={() => this.props.toDetail()}>
            {this.props.item} 
            </Text>
            <Text>
            {this.props.assignedName}
            </Text>
            </View>
          </View>
          <View style={{
                        height: 1,
                        backgroundColor:'white'                            
                    }}>
                
                    </View>
        </View>
      </Swipeout>
    );
  }
}

export default Chore;