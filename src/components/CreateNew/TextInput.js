import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class CreateFormInput extends React.Component {
  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  _handleTouch = () => {
    this.props.onTouch(this.props.name);
  }

  render(){
    const { label, error, ...rest } = this.props;
    return(
      <View style={styles.root}>
        <FormLabel>{label}</FormLabel>
        <FormInput
        onChangeText={this._handleChange}
        onBlur={this._handleTouch}
        placeholder={label}
        {...rest}
        />
        {error && <FormValidationMessage>{error}</FormValidationMessage>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: '90%',
    alignSelf: 'center',
  },
});