import { API_BASE_URL } from '../../config';

export const ORG_POSTS_REQUEST = 'ORG_POSTS_REQUEST'
export const fetchOrgPostsRequest = () =>({
    type: ORG_POSTS_REQUEST
})

export const ORG_POSTS_SUCCESS = 'ORG_POSTS_SUCCESS'
export const fetchOrgPostsSuccess = (orgPosts) =>({
    type: ORG_POSTS_SUCCESS,
    orgPosts
})

export const ORG_POSTS_SEARCH_REQUEST = 'ORG_POSTS_SEARCH_REQUEST'
export const fetchOrgPostsSearchRequest = () =>({
    type: ORG_POSTS_SEARCH_REQUEST
})

export const ORG_POSTS_SEARCH_SUCCESS = 'ORG_POSTS_SEARCH_SUCCESS'
export const fetchOrgPostsSearchSuccess = (orgPosts) =>({
    type: ORG_POSTS_SEARCH_SUCCESS,
    orgPosts
})

export const ADD_EMPTY_ORG_ENTRY = 'ADD_EMPTY_ORG_ENTRY'
export const addEmptyOrgEntry = () =>({
    type: ADD_EMPTY_ORG_ENTRY,
    activeOrgPost: {}
})

export const GET_ACTIVE_ORG_POST_REQUEST = 'GET_ACTIVE_ORG_POST_REQUEST'
export const getActiveOrgPostRequest = () => ({
    type: GET_ACTIVE_ORG_POST_REQUEST
})

export const GET_ACTIVE_ORG_POST_SUCCESS = 'GET_ACTIVE_ORG_POST_SUCCESS'
export const getActiveOrgPostSuccess = (activeOrgPost) => ({
    type: GET_ACTIVE_ORG_POST_SUCCESS,
    activeOrgPost
})

export const getActiveOrgPost = (id) => dispatch =>{
    dispatch(getActiveOrgPostRequest())
    fetch(`${API_BASE_URL}/api/organization/${id}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(getActiveOrgPostSuccess(res)))
}

export const EDIT_ORG_POST_REQUEST = 'EDIT_ORG_POST_REQUEST'
export const editOrgPostRequest = () =>({
    type: EDIT_ORG_POST_REQUEST
})

export const EDIT_ORG_POST_SUCCESS = 'EDIT_ORG_POST_SUCCESS'
export const editOrgPostSuccess = (orgPost) => ({
    type: EDIT_ORG_POST_SUCCESS,
    orgPost
})

export const ADD_ORG_POST_REQUEST = 'ADD_ORG_POST_REQUEST'
export const addOrgPostRequest = () =>({
    type: ADD_ORG_POST_REQUEST
})

export const ADD_ORG_POST_SUCCESS = 'ADD_ORG_POST_SUCCESS'
export const addOrgPostSuccess = () => ({
    type: ADD_ORG_POST_SUCCESS
})

export const DELETE_ORG_POST_REQUEST = 'DELETE_ORG_POST_REQUEST'
export const deleteOrgPostRequest = () =>({
    type: DELETE_ORG_POST_REQUEST
})

export const DELETE_ORG_POST_SUCCESS = 'DELETE_ORG_POST_SUCCESS'
export const deleteOrgPostSuccess = () => ({
    type: DELETE_ORG_POST_SUCCESS
})

export const UPLOAD_ORG_IMAGE_REQUEST = 'UPLOAD_ORG_IMAGE_REQUEST'
export const uploadOrgImageRequest = () => ({
    type: UPLOAD_ORG_IMAGE_REQUEST
})

export const UPLOAD_ORG_IMAGE_SUCCESS = 'UPLOAD_ORG_IMAGE_SUCCESS'
export const uploadOrgImageSuccess = (imgUrl) => ({
    type: UPLOAD_ORG_IMAGE_SUCCESS,
    imgUrl
})

export const uploadOrgImage = (file) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    // console.log(file)
    dispatch(uploadOrgImageRequest())
    return fetch(`${API_BASE_URL}/api/organization/img/`, {
        method: 'POST',
        body: file,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(uploadOrgImageSuccess(res)))
}

export const fetchOrgPosts = () => dispatch =>{
    dispatch(fetchOrgPostsRequest())
    fetch(`${API_BASE_URL}/api/organization/`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchOrgPostsSuccess(res)))
}

export const fecthOrgPostsSearch = (term, filter) => dispatch => {
    dispatch(fetchOrgPostsSearchRequest())
    fetch(`${API_BASE_URL}/api/organization/search?term=${encodeURIComponent(term)}&filter=${encodeURIComponent(filter)}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchOrgPostsSearchSuccess(res)))
}

export const editOrgPost = (id, values) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(editOrgPostRequest())
    fetch(`${API_BASE_URL}/api/organization/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => {dispatch(editOrgPostSuccess(res))})
    .then(res => dispatch(fetchOrgPosts()))
}

export const addOrgPost = (values) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(addOrgPostRequest())
    fetch(`${API_BASE_URL}/api/organization/`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(addOrgPostSuccess()))
    .then(res => dispatch(fetchOrgPosts()))
}

export const deleteOrgPost = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(deleteOrgPostRequest())
    fetch(`${API_BASE_URL}/api/organization/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(deleteOrgPostSuccess()))
    .then(res => dispatch(fetchOrgPosts()))
}

export const ORG_SET_EDIT = 'ORG_SET_EDIT'
export const orgSetEdit = (bool) => ({
    type: ORG_SET_EDIT,
    editing: bool
})

export const ORG_SET_EXPANDED = 'ORG_SET_EXPANDED'
export const orgSetExpanded = (id) => ({
    type: ORG_SET_EXPANDED,
    expanded: id
})

export const ORG_SET_IMG_URL = 'ORG_SET_IMG_URL'
export const orgSetImgUrl = (url) => ({
    type: ORG_SET_IMG_URL,
    imgUrl: url
})