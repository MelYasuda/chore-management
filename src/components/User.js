import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from 'firebase';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null }
  }

  componentDidMount() {
    const { email } = firebase.auth().currentUser;
    this.setState({ currentUser: email })
}

  render(){
    const { currentUser } = this.state;
    console.log(currentUser);
    return(
      <View>
        <Text>{currentUser}</Text>
      </View>
    );
  }
}

export default User;