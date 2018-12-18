import {
  ADD_CHORES,
  DELETE_CHORES,
} from "../actions/actionTypes";

const initialState = [
  {
    title: "Sunday",
    data: [
      {
        desc: "Laundry",
        assignedName: "Meguru",
        priority: "High",
        note: "Use dry sheet"
      },
      {
        desc: "Doing the dishes",
        assignedName: "Elton",
        priority: "Medium",
        note: "Use pods"
      }
    ]
  },
  {
    title: "Monday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      },
      {
        desc: "Laundry",
        assignedName: "Meguru",
        priority: "High",
        note: "Use dry sheet"
      },
      {
        desc: "Doing the dishes",
        assignedName: "Elton",
        priority: "Medium",
        note: "Use pods"
      }
    ]
  },
  {
    title: "Tuesday",
    data: [
      {
        desc: "Clean",
        assignedName: "Meguru",
        priority: "High",
        note: "Do it"
      },
      {
        desc: "Laundry",
        assignedName: "Meguru",
        priority: "High",
        note: "Use dry sheet"
      }
    ]
  },
  {
    title: "Wednesday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      }
    ]
  },
  {
    title: "Thursday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      }
    ]
  },
  {
    title: "Friday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      }
    ]
  },
  {
    title: "Saturday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      }
    ]
  }
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHORES:
      return state;
    case DELETE_CHORES:
    return state;
    default:
      return state;
  }
};

export default reducer;