import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-material-dropdown";


export default class DropdownChoice extends React.Component {
  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  render(){
    let data = [{
      value: 0,
      label: "Sunday"
    }, {
      value: 1,
      label: "Monday"
    }, {
      value: 2,
      label: "Tuesday"
    }, {
      value: 3,
      label: "Wednesday"
    }, {
      value: 4,
      label: "Thursday"
    }, {
      value: 5,
      label: "Friday"
    }, {
      value: 6,
      label: "Saturday"
    }, ];

    const { label, ...rest } = this.props;
    return(
      <View style={styles.root}>
        <Dropdown
          label='Choose Day'
          data={data}
          onChangeText={this._handleChange}
          {...rest}
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