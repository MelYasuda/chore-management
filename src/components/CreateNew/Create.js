import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateFormInput from './CreateFormInput';
import DropdownChoice from './DropDown';
import { connect } from 'react-redux';

class Create extends React.Component {
  _handleSubmit = (values) => {
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
  }

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
      <View style={styles.container}>
        <Formik 
        initialValues={{ desc: '', assignedName: '', priority: '', note: '', categoryId: 0 }}
        onSubmit={this._handleSubmit}
        render={({
          values,
          handleSubmit,
          setFieldValue,
          }) => (
            <React.Fragment>
              <CreateFormInput
                label='Chore Description'
                value={values.desc}
                onChange={setFieldValue}
                name='desc'
                />
              <DropdownChoice
                label='Choose Day'
                data={this.dayData}
                value={values.categoryId}
                onChange={setFieldValue}
                name='categoryId'
               />
               <DropdownChoice
                label='Person assigned to'
                data={this.assignedNameData}
                value={values.assignedName}
                onChange={setFieldValue}
                name='assignedName'
               />
               <DropdownChoice
                label='Prioriy'
                data={this.priorityData}
                value={values.priority}
                onChange={setFieldValue}
                name='priority'
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

export default connect()(Create); 