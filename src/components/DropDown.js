import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-material-dropdown";


export default class DropdownChoice extends React.Component {
  render(){
    let data = [{
      value: 'Sunday',
    }, {
      value: 'Monday',
    }, {
      value: 'Tuesday',
    }, {
      value: 'Wednesday',
    }, {
      value: 'Thursday',
    }, {
      value: 'Friday',
    }, {
      value: 'Saturday',
    }, ];

    const { label, ...rest } = this.props;
    return(
      <View style={styles.root}>
        <Dropdown
          label='Due on'
          data={data}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: '80%',
    alignSelf: 'center',
  },
});