import {GET_USER_SUCCESS,GET_USER_ERROR} from '../constatnt/home'
import axios from "axios";

export const ongetAllUsers = () => (dispatch) => {
    axios.get('https://randomuser.me/api/?results=5000')
    .then(function(response){
        console.log(response.data)
        if(response.data){
            dispatch({
                type: GET_USER_SUCCESS,
                payload: response.data
               })   
        }
        else{
            dispatch({
                type: GET_USER_ERROR,
                payload: response.data
               })   
        }
    }).catch((error)=>{
        console.log(error);
        dispatch({
            type: GET_USER_ERROR,
            payload:error
           })

    })

    
}