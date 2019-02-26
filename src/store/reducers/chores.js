import {
  ADD_CHORES,
  DELETE_CHORE,
} from "../actions/actionTypes";
import FirebaseConfig from '../../../constants/FirebaseConfig.js';
import * as firebase from 'firebase';

firebase.initializeApp(FirebaseConfig);

const initialState = {
  choreList: [
  {
    title: "Sunday",
    data: []
  },
  {
    title: "Monday",
    data: []
  },
  {
    title: "Tuesday",
    data: []
  },
  {
    title: "Wednesday",
    data: []
  },
  {
    title: "Thursday",
    data: []
  },
  {
    title: "Friday",
    data: []
  },
  {
    title: "Saturday",
    data: []
  }
]
}

displayTable = () => {
  let dataArray;

  const getUsersChoreListId = () => {
    return new Promise ((resolve, reject) => {
      firebase.auth().onAuthStateChanged( user => {
        if(user){
          const currentUid = user.uid;
          firebase.database().ref(`users/${currentUid}/`).child('choreLists').on('value', snapshot => {
            const choreListId = snapshot.val();
            console.log(choreListId)
            resolve(choreListId)
          })
        }
      })
    })
  }

  const getUsersChores = (choreListId) => {
    return new Promise (
      function (resolve, reject) {
        firebase.database().ref(`choreLists/${choreListId}/chores/`).on('value', function (snapshot) {
            const value = snapshot.val();
            let valuesArray;
            if(value){
              const keyArray = Object.keys(value);
                    valuesArray = Object.values(value);
              for(i = 0; i < keyArray.length; i++){
                valuesArray[i].id = keyArray[i]
               }
            }
            dataArray = valuesArray;   
            resolve(dataArray);
      });
      }
    )
  }

  const pushToReduxChoreList = (dataArray) => {
    if(dataArray){
      dataArray.forEach( data => {
        initialState.choreList[data.categoryId].data.push(data);
      });
    }
  }

  getUsersChoreListId().then(getUsersChores).then(pushToReduxChoreList)

};

displayTable();

const reducer = (state = initialState, action) => {
  let newState;
  const { desc, assignedName, priority, note, categoryId} = action;
  switch (action.type) {
    case ADD_CHORES:
    newState = state;
    newState.choreList[categoryId].data.push(
      {
        desc: desc,
        assignedName: assignedName,
        priority: priority,
        note: note,
        categoryId: categoryId,
        id: null
      }
    );
    return newState;
    case DELETE_CHORE:
    const {deletingCategoryId, deletingIndex, deletingId} = action;
    // let choreRef = firebase.database().ref('chore-lists/' + deletingId);
    // choreRef.remove();
    newState = state;
    newState.choreList[deletingCategoryId].data.splice(deletingIndex, 1);
    return newState;
    default:
      return state;
  }
};

export default reducer;