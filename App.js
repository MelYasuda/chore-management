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
import User from './src/components/User.js';
import NavigationService from './NavigationService';


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
          <MainAppContainer
          ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);}}
          />
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
    Chores:  {
      screen: Chores,
      navigationOptions: {
          header: null // Will hide header for HomePage
      }
  },
    Details: Details,
    Loading: Loading,
    SignupPage: {
      screen: SignupPage,
      navigationOptions: {
          headerTitle: 'Sing Up',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: '#4f63d6',
          },
          headerTintColor: '#fff'
      }
  },
    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        headerTitle: 'Log In',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerStyle: {
          backgroundColor: '#4f63d6',
        },
        headerTintColor: '#fff'
      }
  },
    ForgotPassword: ForgotPassword,
    User: User,
  },
  {
    initialRouteName: "Loading"
  }
);

const MainAppContainer = createAppContainer(MainAppNavigator);