import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInputField from './TextInput';
import DropdownChoice from './DropDownInput';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';


class Create extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      usernames: null,
      choreListId: null
    }
  }

  componentDidMount() {
    let choreListId;
    const getUsersChoreListId = () => {
      return new Promise ((resolve, reject) => {
        const currentUid = firebase.auth().currentUser.uid;
        firebase.database().ref(`users/${currentUid}/`).child('choreLists').on('value', snapshot => {
          choreListId = snapshot.val();
          resolve()
        })
      })
    }

    const getUserIdsWithChoreListId = () => {
      return new Promise ((resolve, reject) => {
      firebase.database().ref('/').child('users').orderByChild('choreLists').equalTo(choreListId).on('value', snapshot => {
        const userIdsWithChoreListId = snapshot.val()
       resolve(userIdsWithChoreListId)
      })
    })
    }

    const setDropdownUsernames = (userIdsWithChoreListId) => {

        // dropdown value has to be this shape
        // [{value: username}]
        const dropdownUsernames = []

        for(const userId in userIdsWithChoreListId){
          const username = userIdsWithChoreListId[userId].username
          const dropdownUsernameValue = {}
          dropdownUsernameValue['value'] = username
          dropdownUsernames.push(dropdownUsernameValue)
        }
        this.setState({
          isLoading: false,
          dropdownUsernames: dropdownUsernames,
          choreListId: choreListId
        })
    }

    getUsersChoreListId().then(getUserIdsWithChoreListId).then(setDropdownUsernames)

}

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

    // const getUsersChoreListId = () => {
    //   return new Promise ((resolve, reject) => {
    //     const currentUid = firebase.auth().currentUser.uid;
    //     firebase.database().ref(`users/${currentUid}/`).child('choreLists').on('value', snapshot => {
    //       const choreListId = snapshot.val();
    //       console.log(choreListId)
    //       resolve(choreListId)
    //     })
    //   })
    // }

    const addNewChore = () => {
        firebase.database().ref(`choreLists/${this.state.choreListId}/chores`).push({
          desc,
          assignedName,
          priority,
          note,
          categoryId
      }).then(test = () => {
        resetForm();
        this.props.navigation.navigate('Chores', {
          categoryIdAddedTo: categoryId,
        });
      }).catch((error)=>{
          console.log('error ' , error)
      })
    }

    addNewChore()

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



  render(){
    if(this.state.isLoading) return <Text>Loadind</Text>
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
              <FormInputField
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
                data={this.state.dropdownUsernames}
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
              <FormInputField 
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