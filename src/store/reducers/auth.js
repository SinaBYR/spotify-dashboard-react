import * as actionTypes from '../actions/actionTypes';

const initialState = {
    accessToken: null,
    expirationDate: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN: {
            console.log(action.accessToken);
            return {
                ...state,
                accessToken: action.accessToken,
                expirationDate: action.expirationDate
            }
        }
        default: return state;
    }
}

export default reducer;