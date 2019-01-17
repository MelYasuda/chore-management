import {
  ADD_CHORES,
  DELETE_CHORE,
} from "../actions/actionTypes";
import { SQLite } from 'expo';
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
  let p = new Promise (
    function (resolve, reject) {
      firebase.database().ref('ChoreData/').on('value', function (snapshot) {
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
    p.then(iterate = () => {
      if(dataArray){
        dataArray.forEach( data => {
          initialState.choreList[data.categoryId].data.push(data);
        });
      }
    });
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
    let choreRef = firebase.database().ref('ChoreData/' + deletingId);
    choreRef.remove();
    newState = state;
    newState.choreList[deletingCategoryId].data.splice(deletingIndex, 1);
    return newState;
    default:
      return state;
  }
};

export default reducer;