import axios from 'axios';

const initialState = {
    id: null,
    name: null,
    email: null
}

export default function user(state=initialState, action){
    switch (action.type){

        case 'GETUSERINFO':
            return Object.assign({},state,action.payload.data)

    default:
        return state
    }
};

export function getUserinfo() {
    return {
        type: 'GETUSERINFO',
        payload:axios.get('/login/me')
    }
}