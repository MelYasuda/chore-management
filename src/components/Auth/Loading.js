import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FirebaseConfig from '../../../constants/FirebaseConfig.js';
import * as firebase from 'firebase';



class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    firebase.initializeApp(FirebaseConfig);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Chores' : 'SignupPage')
    })
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