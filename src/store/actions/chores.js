import { ADD_CHORE, DELETE_CHORE } from './actionTypes';

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