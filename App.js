import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chores from './src/components/Chores.js';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Details from './src/components/Details.js';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
         <AppContainer />
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

const AppNavigator = createStackNavigator(
  {
    Chores: Chores,
    Details: Details
  },
  {
    initialRouteName: "Chores"
  }
);

const AppContainer = createAppContainer(AppNavigator);