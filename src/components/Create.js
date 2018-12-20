import React from "react";
import { Text, View, FlatList } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

export default class Create extends React.Component {
  render(){
    return(
      <View>
        <FormLabel>Chore description</FormLabel>
        <FormInput/>
        <FormLabel>Assigned to</FormLabel>
        <FormInput/>
        <FormLabel>Priority</FormLabel>
        <FormInput/>
        <FormLabel>Notes</FormLabel>
        <FormInput/>
        <Button
        title='ADD' />
      </View>
    );
  }
}