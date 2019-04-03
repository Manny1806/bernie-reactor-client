import {
    ORG_POSTS_REQUEST,
    ORG_POSTS_SUCCESS,
    ORG_POSTS_SEARCH_REQUEST,
    ORG_POSTS_SEARCH_SUCCESS,
    ADD_EMPTY_ORG_ENTRY,
    GET_ACTIVE_ORG_POST_REQUEST,
    GET_ACTIVE_ORG_POST_SUCCESS,
    EDIT_ORG_POST_REQUEST,
    EDIT_ORG_POST_SUCCESS,
    ADD_ORG_POST_REQUEST,
    ADD_ORG_POST_SUCCESS,
    DELETE_ORG_POST_REQUEST,
    DELETE_ORG_POST_SUCCESS,
    ORG_SET_EDIT,
    ORG_SET_EXPANDED,
    UPLOAD_ORG_IMAGE_REQUEST,
    UPLOAD_ORG_IMAGE_SUCCESS,
    ORG_SET_IMG_URL,
    // ORG_POSTS_SEARCH_REQUEST
}   from '../../actions/home/org-actions'

const initialState = {
    orgPosts: [],
    editing: false,
    expanded: "none",
    loading: false,
    editLoading: false,
    imgUrl: '',
    activeOrgPost: {},
    activeOrgPostLoading: false
}

export default function reducer(state = initialState, action) {
    if (action.type === ORG_POSTS_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === ORG_POSTS_SUCCESS) {
        return {...state, orgPosts: action.orgPosts, loading: false}
    }
    else if (action.type === ORG_POSTS_SEARCH_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === ORG_POSTS_SEARCH_SUCCESS) {
        return {...state, orgPosts: action.orgPosts, loading: false}
    }
    else if (action.type === GET_ACTIVE_ORG_POST_REQUEST){
        return {...state, activeOrgPostLoading: true}
    }
    else if (action.type === GET_ACTIVE_ORG_POST_SUCCESS){
        return {...state, activeOrgPost: action.activeOrgPost, activeOrgPostLoading: false}
    }
    else if (action.type === EDIT_ORG_POST_REQUEST) {
        return {...state, editLoading: true}
    }
    else if (action.type === EDIT_ORG_POST_SUCCESS) {
        return {...state, editLoading: false, orgPosts: state.orgPosts.map((x, index)=>{
            // console.log(action.index)
            if(index === action.index){
                return action.orgPost
            }
            return x
        })} 
    }
    else if (action.type === ADD_ORG_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === ADD_ORG_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === DELETE_ORG_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === DELETE_ORG_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === ADD_EMPTY_ORG_ENTRY) {
        return {...state, activeOrgPost: action.activeOrgPost}
    }
    else if (action.type === ORG_SET_EDIT) {
        return {...state, editing: action.editing}
    }
    else if (action.type === ORG_SET_EXPANDED) {
        return {...state, expanded: action.expanded}
    }
    else if (action.type === UPLOAD_ORG_IMAGE_REQUEST) {
        return {...state}
    }
    else if (action.type === UPLOAD_ORG_IMAGE_SUCCESS) {
        // console.log(action.imgUrl)
        return {...state, imgUrl: action.imgUrl.url}
    }
    else if (action.type === ORG_SET_IMG_URL) {
        return {...state, imgUrl: action.imgUrl}
    }

    return state
}