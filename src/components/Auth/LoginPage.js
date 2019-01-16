import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as firebase from 'firebase';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormInputField from '../CreateNew/TextInput';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null
    }
    this._handleSignupPageNav = this._handleSignupPageNav.bind(this);
  }

  handleLogin = (values, {resetForm}) => {
    const {email, password} = values;
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) =>   {
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    })
  }

  _handleSignupPageNav = () => {
    this.props.navigation.navigate('SignupPage');
  }

  render(){
    return(
      <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}>
        <Formik 
        initialValues={{ email: '', password: '' }}
        onSubmit={this.handleLogin}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Email address is required'),
          password: Yup.string().required('Password needs to be provided')
        })}
        render={({
          values,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          errors,
          touched,
          }) => (
            <React.Fragment>
              <FormInputField
                label='Email'
                value={values.email}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                autoCapitalize="none"
                name='email'
                error={touched.email && errors.email}
                />
              <FormInputField
                label='Password'
                value={values.password}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                autoCapitalize="none"
                name='password'
                error={touched.password && errors.password}
                />
              <Button
              buttonStyle={styles.button}
              title="Log In"
              onPress={handleSubmit}
            />

            <Text>Or</Text>

            <Button
              buttonStyle={styles.button}
              title="Sign Up"
              onPress={this._handleSignupPageNav}
            />
            </React.Fragment>
          )}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default LoginPage;