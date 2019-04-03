import {
    POL_POSTS_REQUEST,
    POL_POSTS_SUCCESS,
    POL_POSTS_SEARCH_REQUEST,
    POL_POSTS_SEARCH_SUCCESS,
    ADD_EMPTY_POL_ENTRY,
    GET_ACTIVE_POL_POST_REQUEST,
    GET_ACTIVE_POL_POST_SUCCESS,
    EDIT_POL_POST_REQUEST,
    EDIT_POL_POST_SUCCESS,
    ADD_POL_POST_REQUEST,
    ADD_POL_POST_SUCCESS,
    DELETE_POL_POST_REQUEST,
    DELETE_POL_POST_SUCCESS,
    POL_SET_EDIT,
    POL_SET_EXPANDED,
    UPLOAD_POL_IMAGE_REQUEST,
    UPLOAD_POL_IMAGE_SUCCESS,
    POL_SET_IMG_URL
}   from '../../actions/home/pol-actions'

const initialState = {
    polPosts: [],
    editing: false,
    expanded: "none",
    loading: false,
    editLoading: false,
    imgUrl: '',
    activePolPost: {},
    activePolPostLoading: false
}

export default function reducer(state = initialState, action) {
    if (action.type === POL_POSTS_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === POL_POSTS_SUCCESS) {
        return {...state, polPosts: action.polPosts, loading: false}
    }
    else if (action.type === POL_POSTS_SEARCH_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === POL_POSTS_SEARCH_SUCCESS) {
        return {...state, polPosts: action.polPosts, loading: false}
    }
    else if (action.type === GET_ACTIVE_POL_POST_REQUEST){
        return {...state, activePolPostLoading: true}
    }
    else if (action.type === GET_ACTIVE_POL_POST_SUCCESS){
        return {...state, activePolPost: action.activePolPost, activePolPostLoading: false}
    }
    else if (action.type === EDIT_POL_POST_REQUEST) {
        return {...state, editLoading: true}
    }
    else if (action.type === EDIT_POL_POST_SUCCESS) {
        return {...state, editLoading: false, polPosts: state.polPosts.map((x, index)=>{
            // Polsole.log(action.index)
            if(index === action.index){
                return action.polPost
            }
            return x
        })} 
    }
    else if (action.type === ADD_POL_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === ADD_POL_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === DELETE_POL_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === DELETE_POL_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === ADD_EMPTY_POL_ENTRY) {
        return {...state, activePolPost: action.activePolPost}
    }
    else if (action.type === POL_SET_EDIT) {
        return {...state, editing: action.editing}
    }
    else if (action.type === POL_SET_EXPANDED) {
        return {...state, expanded: action.expanded}
    }
    else if (action.type === UPLOAD_POL_IMAGE_REQUEST) {
        return {...state}
    }
    else if (action.type === UPLOAD_POL_IMAGE_SUCCESS) {
        // polsole.log(action.imgUrl)
        return {...state, imgUrl: action.imgUrl.url}
    }
    else if (action.type === POL_SET_IMG_URL) {
        return {...state, imgUrl: action.imgUrl}
    }

    return state
}