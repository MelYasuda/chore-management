import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-material-dropdown";


export default class DropdownChoice extends React.Component {
  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  render(){

    const { label, data, ...rest } = this.props;
    return(
      <View style={styles.root}>
        <Dropdown
          label={label}
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