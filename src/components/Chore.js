import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';

class Chore extends Component {
  constructor(props) {
    super(props);   
    this.state = {
        activeRowKey: null
    };          
}

_handleDelete = () => {
  const { dispatch } = this.props;
  const deletingCategoryId = this.props.categoryId;
  const deletingIndex = this.props.index;
  const deletingId = this.props.id;
  console.log(deletingId);
  const action = {
    type: 'DELETE_CHORE',
    deletingCategoryId: deletingCategoryId,
    deletingIndex: deletingIndex,
    deletingId: deletingId
  }
  dispatch(action);
}

  render(){
    const swipeSettings = {
      left: [
        { 
            onPress: () => {    
                Alert.alert(
                    'Alert',
                    'Are you sure you want to delete ?',
                    [                              
                      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'Yes', onPress: () => {      
                          this._handleDelete()
                      }},
                    ],
                    { cancelable: true }
                  ); 
            }, 
            text: 'Done', type: 'primary' 
        }
    ],
      autoClose: true,
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

export default connect()(Chore); 