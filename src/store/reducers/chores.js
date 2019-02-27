import {
  ADD_CHORES,
  DELETE_CHORE,
  STORED_CHORES
} from "../actions/actionTypes";

get_INITIAL_STATE = () => {
  return {
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
}

const reducer = (state = get_INITIAL_STATE(), action) => {

  let newState = Object.assign({}, state);

  const { desc, assignedName, priority, note, categoryId} = action;
  switch (action.type) {
    case STORED_CHORES:
    const { dataArray } = action;
    dataArray.forEach( data => {
      newState.choreList[data.categoryId].data.push(data);
    });
    return newState;
    case ADD_CHORES:
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
    newState.choreList[deletingCategoryId].data.splice(deletingIndex, 1);
    return newState;
    default:
      console.log(state)
      return state;
  }
};

export default reducer;