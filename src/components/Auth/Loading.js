import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import NavigationService from '../../../NavigationService';


class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const resetAction =StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate( { routeName: 'Chores'})],
        })
        this.props.navigation.dispatch(resetAction);
      } else {
        console.log(user)
        // NavigationService.reset('LoginPage')
        const resetAction =StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate( { routeName: 'LoginPage'})],
        })
        this.props.navigation.dispatch(resetAction);
      }
    });
  }

  render(){
    return(
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}

export default Loading;