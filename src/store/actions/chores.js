import { ADD_CHORE, DELETE_CHORE } from './actionTypes';

export const addChore = (choreName) => {
    return {
        type: ADD_CHORE,
        placeName: choreName
    };
};

export const deleteChore = () => {
    return {
        type: DELETE_CHORE
    };
};