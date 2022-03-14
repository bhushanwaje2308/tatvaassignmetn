import {GET_USER_SUCCESS,GET_USER_ERROR} from '../constatnt/home'

const initialState = {
    users: [],
    totalRecords: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
     case GET_USER_SUCCESS:{
         return {
             ...state,
            users: action.payload
         }
     }

      // eslint-disable-next-line no-duplicate-case
      case GET_USER_ERROR:
        return {
            ...state,
            users: [],
        }
     default:
      return state
    }
   }