import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateFormInput from './CreateFormInput';

export default class Create extends React.Component {
  _handleSubmit = values => {
    console.log(JSON.stringify(values))
  }

  render(){
    return(
      <View style={styles.container}>
        <Formik 
        initialValues={{ desc: '', assignedName: '', priority: '', note: '', day: '' }}
        onSubmit={this._handleSubmit}
        render={({
          values,
          handleSubmit,
          setFieldValue
          }) => (
            <React.Fragment>
              <CreateFormInput
                label='Chore Description'
                value={values.desc}
                onChange={setFieldValue}
                name='desc'
                />
              <CreateFormInput
                label='Assigned to'
                value={values.assignedName}
                onChange={setFieldValue}
                name='assignedName'
                />
              <CreateFormInput 
                label='Priority'
                value={values.priority}
                onChange={setFieldValue}
                name='priority'
                />
              <CreateFormInput 
                label='Day'
                value={values.day}
                onChange={setFieldValue}
                name='day'
                />
              <CreateFormInput 
              label='Note'
              value={values.note}
              onChange={setFieldValue}
              name='note'
              />
              <Button
              buttonStyle={styles.button}
              title="Submit"
              onPress={handleSubmit}
            />
            </React.Fragment>
          )}
        />
      </View>
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