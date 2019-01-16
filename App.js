import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chores from './src/components/Chores.js';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Details from './src/components/Details.js';

import Loading from './src/components/Auth/Loading.js';
import LoginPage from './src/components/Auth/LoginPage.js';
import SignupPage from './src/components/Auth/SignupPage.js';
import ForgotPassword from './src/components/Auth/ForgotPassword.js';

const store = configureStore();


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainAppContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const MainAppNavigator = createStackNavigator(
  {
    Chores: Chores,
    Details: Details,
    Loading: Loading,
    SignupPage: SignupPage,
    LoginPage: LoginPage,
    ForgotPassword: ForgotPassword
  },
  {
    initialRouteName: "Loading"
  }
);

const MainAppContainer = createAppContainer(MainAppNavigator);
