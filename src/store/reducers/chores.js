import {
  ADD_CHORES,
  DELETE_CHORE,
} from "../actions/actionTypes";
import { SQLite } from 'expo';

export const db = SQLite.openDatabase('db.db');

createTable =() => {
  db.transaction(tx => {
    tx.executeSql(
      'create table if not exists chores (id integer primary key not null, desc text, assignedName text, priority text, note text, categoryId int);'
    );
  });
};

createTable();

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
      db.transaction(tx => {
        tx.executeSql('select * from chores', [], (_, { rows }) =>
        {
         dataArray = rows._array;
         resolve(dataArray)
        }
      );
      });
    }
  )
    p.then(iterate = () => {
      dataArray.forEach( data => {
        initialState.choreList[data.categoryId].data.push(data);
      });
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
        categoryId: categoryId
      }
    );
    return newState;
    case DELETE_CHORE:
    const {deletingCategoryId, deletingIndex, deletingId} = action;
    db.transaction(tx => {
      tx.executeSql(`delete from chores where id = ?;`, [deletingId]);
    });
    newState = state;
    newState.choreList[deletingCategoryId].data.splice(deletingIndex, 1);
    return newState;
    default:
      return state;
  }
};

export default reducer;