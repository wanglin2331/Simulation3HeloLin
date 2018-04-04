import axios from 'axios';

const initialState = {
    posts: []
}

export default function posts(state = initialState, action){
    switch (action.type) {
        case 'GETALLPOSTS_FULFILLED':
            return {posts: action.payload.data}
        case 'GETOWNPOSTS':
            return {posts: action.payload.data}
        default:
            return state;
    }
};

export function getPosts(){
    return {
        type: 'GETALLPOSTS',
        payload: axios.get('/api/allposts')
    }
};

export function getOwnPosts(userid){
    return {
        type: 'GETOWNPOSTS',
        payload: axios.get('/api/ownposts', userid)
    }
};
