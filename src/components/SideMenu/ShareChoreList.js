import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInputField from '../CreateNew/TextInput';
import DropdownChoice from '../CreateNew/DropDownInput';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';

class ShareChoreList extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dropdownValue: null
    }
  }

  componentDidMount(){
    let choreListId;
    const getUsersChoreListId = () => {
      return new Promise ((resolve, reject) => {
        const currentUid = firebase.auth().currentUser.uid;
        firebase.database().ref(`users/${currentUid}/`).child('choreLists').on('value', snapshot => {
          choreListId = snapshot.val();
          console.log(choreListId)
          resolve()
        })
      })
    }

    const setDropdownValue = () => {
      let valueArray = []
      let valObj = {}
      valObj['value'] = choreListId
      valObj['label'] = 'List 1'
      valueArray.push(valObj)
      this.setState({
        isLoading: false,
        dropdownValue: valueArray
      })
      console.log(choreListId)
    }

    getUsersChoreListId().then(setDropdownValue)
  }

  _handleSubmit = (values) => {
    console.log(values)
  }

  choreListData = [{
    value: 0,
    label: "List 1"
  }, {
    value: 1,
    label: "List 2"
  }, {
    value: 2,
    label: "List 3"
  }, ];

  render(){
    if(this.state.isLoading) return <Text>Loading</Text>
    return(
      <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}>
        <Formik 
        initialValues={{ choreListId: '', email: ''}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          choreListId: Yup.string().required('Chore to share needs to be chosen'),
          email: Yup.string().required('Email needs to be provided')
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
              <DropdownChoice
                label='Choose Chore List To Share'
                data={this.state.dropdownValue}
                value={values.choreListId}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='choreListId'
                error={touched.choreListId && errors.choreListId}
               />
              <FormInputField
                autoCapitalize="none"
                label='Email'
                value={values.email}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='email'
                error={touched.email && errors.email}
                />
              <Button
              buttonStyle={styles.button}
              title="Submit"
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


export default ShareChoreList;