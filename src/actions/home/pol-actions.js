import { API_BASE_URL } from '../../config';

export const POL_POSTS_REQUEST = 'POL_POSTS_REQUEST'
export const fetchPolPostsRequest = () =>({
    type: POL_POSTS_REQUEST
})

export const POL_POSTS_SUCCESS = 'POL_POSTS_SUCCESS'
export const fetchPolPostsSuccess = (polPosts) =>({
    type: POL_POSTS_SUCCESS,
    polPosts
})

export const POL_POSTS_SEARCH_REQUEST = 'POL_POSTS_SEARCH_REQUEST'
export const fetchPolPostsSearchRequest = () =>({
    type: POL_POSTS_SEARCH_REQUEST
})

export const POL_POSTS_SEARCH_SUCCESS = 'POL_POSTS_SEARCH_SUCCESS'
export const fetchPolPostsSearchSuccess = (polPosts) =>({
    type: POL_POSTS_SEARCH_SUCCESS,
    polPosts
})

export const ADD_EMPTY_POL_ENTRY = 'ADD_EMPTY_POL_ENTRY'
export const addEmptyPolEntry = () =>({
    type: ADD_EMPTY_POL_ENTRY,
    activePolPost: {}
})

export const GET_ACTIVE_POL_POST_REQUEST = 'GET_ACTIVE_POL_POST_REQUEST'
export const getActivePolPostRequest = () => ({
    type: GET_ACTIVE_POL_POST_REQUEST
})

export const GET_ACTIVE_POL_POST_SUCCESS = 'GET_ACTIVE_POL_POST_SUCCESS'
export const getActivePolPostSuccess = (activePolPost) => ({
    type: GET_ACTIVE_POL_POST_SUCCESS,
    activePolPost
})

export const getActivePolPost = (id) => dispatch =>{
    dispatch(getActivePolPostRequest())
    fetch(`${API_BASE_URL}/api/politician/${id}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(getActivePolPostSuccess(res)))
}

export const EDIT_POL_POST_REQUEST = 'EDIT_POL_POST_REQUEST'
export const editPolPostRequest = () =>({
    type: EDIT_POL_POST_REQUEST
})

export const EDIT_POL_POST_SUCCESS = 'EDIT_POL_POST_SUCCESS'
export const editPolPostSuccess = (polPost) => ({
    type: EDIT_POL_POST_SUCCESS,
    polPost
})

export const ADD_POL_POST_REQUEST = 'ADD_POL_POST_REQUEST'
export const addPolPostRequest = () =>({
    type: ADD_POL_POST_REQUEST
})

export const ADD_POL_POST_SUCCESS = 'ADD_POL_POST_SUCCESS'
export const addPolPostSuccess = () => ({
    type: ADD_POL_POST_SUCCESS
})

export const DELETE_POL_POST_REQUEST = 'DELETE_POL_POST_REQUEST'
export const deletePolPostRequest = () =>({
    type: DELETE_POL_POST_REQUEST
})

export const DELETE_POL_POST_SUCCESS = 'DELETE_POL_POST_SUCCESS'
export const deletePolPostSuccess = () => ({
    type: DELETE_POL_POST_SUCCESS
})

export const UPLOAD_POL_IMAGE_REQUEST = 'UPLOAD_POL_IMAGE_REQUEST'
export const uploadPolImageRequest = () => ({
    type: UPLOAD_POL_IMAGE_REQUEST
})

export const UPLOAD_POL_IMAGE_SUCCESS = 'UPLOAD_POL_IMAGE_SUCCESS'
export const uploadPolImageSuccess = (imgUrl) => ({
    type: UPLOAD_POL_IMAGE_SUCCESS,
    imgUrl
})

export const uploadPolImage = (file) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    //console.log(file)
    dispatch(uploadPolImageRequest())
    return fetch(`${API_BASE_URL}/api/politician/img/`, {
        method: 'POST',
        body: file,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(uploadPolImageSuccess(res)))
}

export const fetchPolPosts = () => dispatch =>{
    dispatch(fetchPolPostsRequest())
    fetch(`${API_BASE_URL}/api/politician/`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchPolPostsSuccess(res)))
}

export const fetchPolPostsSearch = (term) => dispatch => {
    dispatch(fetchPolPostsSearchRequest())
    fetch(`${API_BASE_URL}/api/politician/search/${term}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchPolPostsSearchSuccess(res)))
}

export const editPolPost = (id, values) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(editPolPostRequest())
    fetch(`${API_BASE_URL}/api/politician/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => {dispatch(editPolPostSuccess(res))})
    .then(res => dispatch(fetchPolPosts()))
}

export const addPolPost = (values) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(addPolPostRequest())
    fetch(`${API_BASE_URL}/api/politician/`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(addPolPostSuccess()))
    .then(res => dispatch(fetchPolPosts()))
}

export const deletePolPost = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(deletePolPostRequest())
    fetch(`${API_BASE_URL}/api/politician/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(deletePolPostSuccess()))
    .then(res => dispatch(fetchPolPosts()))
}

export const POL_SET_EDIT = 'POL_SET_EDIT'
export const polSetEdit = (bool) => ({
    type: POL_SET_EDIT,
    editing: bool
})

export const POL_SET_EXPANDED = 'POL_SET_EXPANDED'
export const polSetExpanded = (id) => ({
    type: POL_SET_EXPANDED,
    expanded: id
})

export const POL_SET_IMG_URL = 'POL_SET_IMG_URL'
export const polSetImgUrl = (url) => ({
    type: POL_SET_IMG_URL,
    imgUrl: url
})