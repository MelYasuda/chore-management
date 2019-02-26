import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as firebase from 'firebase';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';


class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null }
    this._handleLogout = this._handleLogout.bind(this);
  }

  componentDidMount() {
    const { email } = firebase.auth().currentUser;
    this.setState({ currentUser: email })
}

_handleLogout = () => {
  firebase.auth().signOut().then(()=> {
    const {dispatch} = this.props;
    dispatch({type: 'USER_LOGOUT'})
    console.log("logged out");
  }).catch(function(error) {
    Alert.alert(error)
  });
}

  render(){
    const { currentUser } = this.state;
    return(
      <View style={styles.container}>
        <Text>{currentUser}</Text>
        <Button
              buttonStyle={styles.button}
              title="Log Out"
              onPress={this._handleLogout}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default connect()(User);