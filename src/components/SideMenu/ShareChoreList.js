import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ShareChoreList = () => {
  return <View><Text>ShareChoreList</Text></View>
}

ShareChoreList.navigationOptions = {
  drawer: {
    icon: () => (
      <Icon name={"ios-arrow-up"} size={30}
      />
    )}
}

export default ShareChoreList;