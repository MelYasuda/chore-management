import {
  ADD_CHORES,
  DELETE_CHORES,
} from "../actions/actionTypes";

const initialState = {
  categoryList: {
    "Sunday":0,
    "Monday":1,
    "Tuesday":2,
    "Wednesday":3,
    "Thursday":4,
    "Friday":5,
    "Saturday":6
  },
  choreList: [
  {
    title: "Sunday",
    data: [
      {
        desc: "Laundry",
        assignedName: "Meguru",
        priority: "High",
        note: "Use dry sheet",
        categoryId: 0
      },
      {
        desc: "Doing the dishes",
        assignedName: "Elton",
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
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy",
        categoryId: 1
      },
      {
        desc: "Take down xmas tree",
        assignedName: "Meguru",
        priority: "High",
        note: "Use dry sheet",
        categoryId: 1
      },
      {
        desc: "Put away xmas stuff",
        assignedName: "Elton",
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
        assignedName: "Meguru",
        priority: "Low",
        note: "Do it",
        categoryId: 2
      },
      {
        desc: "Throw away expired stuff",
        assignedName: "Elton",
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
        assignedName: "Meguru",
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
        assignedName: "Meguru",
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
        assignedName: "Meguru",
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
        assignedName: "Meguru",
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
  const { desc, assignedName, priority, note, categoryId } = action;
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
    console.log(newState);
    return newState;
    case DELETE_CHORES:
    return state;
    default:
      return state;
  }
};

export default reducer;