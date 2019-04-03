import {
    CELEB_POSTS_REQUEST,
    CELEB_POSTS_SUCCESS,
    CELEB_POSTS_SEARCH_REQUEST,
    CELEB_POSTS_SEARCH_SUCCESS,
    ADD_EMPTY_CELEB_ENTRY,
    GET_ACTIVE_CELEB_POST_REQUEST,
    GET_ACTIVE_CELEB_POST_SUCCESS,
    EDIT_CELEB_POST_REQUEST,
    EDIT_CELEB_POST_SUCCESS,
    ADD_CELEB_POST_REQUEST,
    ADD_CELEB_POST_SUCCESS,
    DELETE_CELEB_POST_REQUEST,
    DELETE_CELEB_POST_SUCCESS,
    CELEB_SET_EDIT,
    CELEB_SET_EXPANDED,
    UPLOAD_CELEB_IMAGE_REQUEST,
    UPLOAD_CELEB_IMAGE_SUCCESS,
    CELEB_SET_IMG_URL
}   from '../../actions/home/celeb-actions'

const initialState = {
    celebPosts: [],
    editing: false,
    expanded: "none",
    loading: false,
    editLoading: false,
    imgUrl: '',
    activeCelebPost: {},
    activeCelebPostLoading: false
}

export default function reducer(state = initialState, action) {
    if (action.type === CELEB_POSTS_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === CELEB_POSTS_SUCCESS) {
        return {...state, celebPosts: action.celebPosts, loading: false}
    }
    else if (action.type === CELEB_POSTS_SEARCH_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === CELEB_POSTS_SEARCH_SUCCESS) {
        return {...state, celebPosts: action.celebPosts, loading: false}
    }
    else if (action.type === GET_ACTIVE_CELEB_POST_REQUEST){
        return {...state, activeCelebPostLoading: true}
    }
    else if (action.type === GET_ACTIVE_CELEB_POST_SUCCESS){
        return {...state, activeCelebPost: action.activeCelebPost, activeCelebPostLoading: false}
    }
    else if (action.type === EDIT_CELEB_POST_REQUEST) {
        return {...state, editLoading: true}
    }
    else if (action.type === EDIT_CELEB_POST_SUCCESS) {
        return {...state, editLoading: false, celebPosts: state.celebPosts.map((x, index)=>{
            // console.log(action.index)
            if(index === action.index){
                return action.celebPost
            }
            return x
        })} 
    }
    else if (action.type === ADD_CELEB_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === ADD_CELEB_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === DELETE_CELEB_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === DELETE_CELEB_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === ADD_EMPTY_CELEB_ENTRY) {
        return {...state, activeCelebPost: action.activeCelebPost}
    }
    else if (action.type === CELEB_SET_EDIT) {
        return {...state, editing: action.editing}
    }
    else if (action.type === CELEB_SET_EXPANDED) {
        return {...state, expanded: action.expanded}
    }
    else if (action.type === UPLOAD_CELEB_IMAGE_REQUEST) {
        return {...state}
    }
    else if (action.type === UPLOAD_CELEB_IMAGE_SUCCESS) {
        // console.log(action.imgUrl)
        return {...state, imgUrl: action.imgUrl.url}
    }
    else if (action.type === CELEB_SET_IMG_URL) {
        return {...state, imgUrl: action.imgUrl}
    }

    return state
}