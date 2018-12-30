import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { FormLabel, FormValidationMessage } from 'react-native-elements'


export default class DropdownChoice extends React.Component {
  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  _handleTouch = () => {
    this.props.onTouch(this.props.name);
  }

  render(){

    const { label, data, error, ...rest } = this.props;
    return(
      <View style={styles.root}>
        <Dropdown
          label={label}
          data={data}
          onChangeText={this._handleChange}
          onBlur={this._handleTouch}
          {...rest}
        />
        {error && <FormValidationMessage>{error}</FormValidationMessage>}
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