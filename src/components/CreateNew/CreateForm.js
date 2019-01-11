import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateFormInput from './TextInput';
import DropdownChoice from './DropDownInput';
import { connect } from 'react-redux';
import { db } from '../../store/reducers/chores.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Create extends React.Component {
  _handleSubmit = (values, {resetForm}) => {
    // dispatch action to redux store
    const { dispatch } = this.props;
    const { desc, assignedName, priority, note, categoryId } = values;
    const action = {
      type: 'ADD_CHORES',
      desc: desc,
      assignedName: assignedName,
      priority: priority,
      note: note,
      categoryId: categoryId
    }
    dispatch(action);
    // store new chore in database and do other things if it succees
    let p = new Promise(
      function (resolve, reject){
        db.transaction(tx => {
          tx.executeSql('insert into chores (desc, assignedName, priority, note, categoryId) values (?, ?, ?, ?, ?)', [desc, assignedName, priority, note, categoryId]);
          resolve(categoryId)
        })
      }
    )
    p.then(test = () => {
      resetForm();
      this.props.navigation.navigate('Chores', {
        categoryIdAddedTo: categoryId,
      });
    })
  };

  dayData = [{
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

  priorityData = [{
    value: "High"
  }, {
    value: "Medium"
  }, {
    value: "Low"
  }
];

  assignedNameData = [{
    value: "Meguru"
  },{
    value: "Elton"
  }]

  render(){

    return(
      <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}>
        <Formik 
        initialValues={{ desc: '', assignedName: '', priority: '', note: '', categoryId: '' }}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          desc: Yup.string().required('Chore description is required'),
          categoryId: Yup.number().required('Day needs to be chosen')
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
              <CreateFormInput
                label='Chore Description'
                value={values.desc}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='desc'
                error={touched.desc && errors.desc}
                />
              <DropdownChoice
                label='Choose Day'
                data={this.dayData}
                value={values.categoryId}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='categoryId'
                error={touched.categoryId && errors.categoryId}
               />
               <DropdownChoice
                label='Person assigned to'
                data={this.assignedNameData}
                value={values.assignedName}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='assignedName'
               />
               <DropdownChoice
                label='Prioriy'
                data={this.priorityData}
                value={values.priority}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name='priority'
               />
              <CreateFormInput 
              label='Note'
              value={values.note}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
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

export default connect()(Create); 