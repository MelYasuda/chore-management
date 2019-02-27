import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as firebase from 'firebase';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormInputField from '../CreateNew/TextInput';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null
    }
  }

  handleSignup = (values, {resetForm}) => {
    const {username, email, password} = values;
    const signUpWithEmailPassword = () => {
      return new Promise ((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        })
        resolve()
      })
    }

    const getSignedupUser = () => {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged( user => {
          if(user){
            resolve(user)
          }
        })
      })
    }    

    const createUserAccount = (user) => {
      return new Promise ((resolve, reject) => {
        const uid = user.uid;
        if(uid){
        firebase.database().ref(`users/${uid}`).set({
          email: email,
          username: username
        })
        resolve(user)
      } else{
        reject(Error('Failed to create a user'))
        }
      })
    }

    const createChoreList = (user) => {
      return new Promise ((resolve, reject) => {
        if(user){
        const ref = firebase.database().ref('choreLists/');
        const choreListId = ref.push();
        firebase.database().ref(`users/${user.uid}`).update({
          choreLists:choreListId.key
        })
        resolve()
      } else {
        reject(Error('Failed to create a chore list'))
      }
      })
    }

    signUpWithEmailPassword().then(getSignedupUser).then(createUserAccount).then(createChoreList);    

  }

  render(){
    return(
      <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}>
        <Formik 
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={this.handleSignup}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
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
                label='Username'
                value={values.username}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='username'
                error={touched.username && errors.username}
                />
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
              title="Sign Up"
              onPress={handleSubmit}
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

export default SignupPage;