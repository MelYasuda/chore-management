import { ADD_CHORE, DELETE_CHORE, STORED_CHORES } from './actionTypes';

export const storedChores = (dataArray) => {
    return {
        type: STORED_CHORES,
        dataArray: dataArray
    }
}

export const addChore = (choreDesc, assignedName, priority, note, categoryId) => {
    return {
        type: ADD_CHORE,
        choreDesc: choreDesc,
        assignedName: assignedName,
        priority: priority,
        note: note,
        categoryId: categoryId
    };
};

export const deleteChore = () => {
    return {
        type: DELETE_CHORE
    };
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}