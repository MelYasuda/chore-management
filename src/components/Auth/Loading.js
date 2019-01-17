import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FirebaseConfig from '../../../constants/FirebaseConfig.js';
import * as firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate( user ? { routeName: 'Chores'} : { routeName: 'LoginPage' }),
        ],
      });
      
      this.props.navigation.dispatch(resetAction);
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