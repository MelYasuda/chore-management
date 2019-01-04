import {
  ADD_CHORES,
  DELETE_CHORE,
} from "../actions/actionTypes";

const initialState = {
  choreList: [
  {
    title: "Sunday",
    data: [
      {
        desc: "Laundry",
        assignedName: "A",
        priority: "High",
        note: "Use dry sheet",
        categoryId: 0
      },
      {
        desc: "Doing the dishes",
        assignedName: "B",
        priority: "Medium",
        note: "Use pods",
        categoryId: 0
      }
    ]
  },
  {
    title: "Monday",
    data: [
      {
        desc: "Grocery Shopping",
        assignedName: "A",
        priority: "High",
        note: "Make it yummy",
        categoryId: 1
      },
      {
        desc: "Take down xmas tree",
        assignedName: "A",
        priority: "High",
        note: "Use dry sheet",
        categoryId: 1
      },
      {
        desc: "Put away xmas stuff",
        assignedName: "B",
        priority: "Medium",
        note: "Use pods",
        categoryId: 1
      }
    ]
  },
  {
    title: "Tuesday",
    data: [
      {
        desc: "Clean bathroom",
        assignedName: "A",
        priority: "Low",
        note: "Do it",
        categoryId: 2
      },
      {
        desc: "Throw away expired stuff",
        assignedName: "B",
        priority: "High",
        note: "Use dry sheet",
        categoryId: 2
      }
    ]
  },
  {
    title: "Wednesday",
    data: [
      {
        desc: "Pay bills",
        assignedName: "A",
        priority: "Low",
        note: "Make it yummy",
        categoryId: 3
      }
    ]
  },
  {
    title: "Thursday",
    data: [
      {
        desc: "Vacuum",
        assignedName: "A",
        priority: "Medium",
        note: "Make it yummy",
        categoryId: 4
      }
    ]
  },
  {
    title: "Friday",
    data: [
      {
        desc: "Dust",
        assignedName: "A",
        priority: "High",
        note: "Make it yummy",
        categoryId: 5
      }
    ]
  },
  {
    title: "Saturday",
    data: [
      {
        desc: "Meal prep",
        assignedName: "A",
        priority: "Low",
        note: "Make it yummy",
        categoryId: 6
      }
    ]
  }
]
}

const reducer = (state = initialState, action) => {
  let newState;
  const { desc, assignedName, priority, note, categoryId} = action;
  switch (action.type) {
    case ADD_CHORES:
    console.log("add")
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
    const {deletingCategoryId, deletingIndex} = action;
    newState = state;
    newState.choreList[deletingCategoryId].data.splice(deletingIndex, 1);
    return newState;
    default:
      return state;
  }
};

export default reducer;