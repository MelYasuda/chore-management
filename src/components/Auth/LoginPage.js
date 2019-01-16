import React from "react";
import { StyleSheet, Text, View } from "react-native";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  render(){
    return(
      <View>
        <Text>Login Page</Text>
      </View>
    );
  }
}

export default LoginPage;