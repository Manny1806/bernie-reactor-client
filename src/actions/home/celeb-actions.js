import { API_BASE_URL } from '../../config';

export const CELEB_POSTS_REQUEST = 'CELEB_POSTS_REQUEST'
export const fetchCelebPostsRequest = () =>({
    type: CELEB_POSTS_REQUEST
})

export const CELEB_POSTS_SUCCESS = 'CELEB_POSTS_SUCCESS'
export const fetchCelebPostsSuccess = (celebPosts) =>({
    type: CELEB_POSTS_SUCCESS,
    celebPosts
})

export const CELEB_POSTS_SEARCH_REQUEST = 'CELEB_POSTS_SEARCH_REQUEST'
export const fetchCelebPostsSearchRequest = () =>({
    type: CELEB_POSTS_SEARCH_REQUEST
})

export const CELEB_POSTS_SEARCH_SUCCESS = 'CELEB_POSTS_SEARCH_SUCCESS'
export const fetchCelebPostsSearchSuccess = (celebPosts) =>({
    type: CELEB_POSTS_SEARCH_SUCCESS,
    celebPosts
})

export const ADD_EMPTY_CELEB_ENTRY = 'ADD_EMPTY_CELEB_ENTRY'
export const addEmptyCelebEntry = () =>({
    type: ADD_EMPTY_CELEB_ENTRY,
    activeCelebPost: {}
})

export const GET_ACTIVE_CELEB_POST_REQUEST = 'GET_ACTIVE_CELEB_POST_REQUEST'
export const getActiveCelebPostRequest = () => ({
    type: GET_ACTIVE_CELEB_POST_REQUEST
})

export const GET_ACTIVE_CELEB_POST_SUCCESS = 'GET_ACTIVE_CELEB_POST_SUCCESS'
export const getActiveCelebPostSuccess = (activeCelebPost) => ({
    type: GET_ACTIVE_CELEB_POST_SUCCESS,
    activeCelebPost
})

export const getActiveCelebPost = (id) => dispatch =>{
    dispatch(getActiveCelebPostRequest())
    fetch(`${API_BASE_URL}/api/celebrity/${id}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(getActiveCelebPostSuccess(res)))
}

export const EDIT_CELEB_POST_REQUEST = 'EDIT_CELEB_POST_REQUEST'
export const editCelebPostRequest = () =>({
    type: EDIT_CELEB_POST_REQUEST
})

export const EDIT_CELEB_POST_SUCCESS = 'EDIT_CELEB_POST_SUCCESS'
export const editCelebPostSuccess = (celebPost) => ({
    type: EDIT_CELEB_POST_SUCCESS,
    celebPost
})

export const ADD_CELEB_POST_REQUEST = 'ADD_CELEB_POST_REQUEST'
export const addCelebPostRequest = () =>({
    type: ADD_CELEB_POST_REQUEST
})

export const ADD_CELEB_POST_SUCCESS = 'ADD_CELEB_POST_SUCCESS'
export const addCelebPostSuccess = () => ({
    type: ADD_CELEB_POST_SUCCESS
})

export const DELETE_CELEB_POST_REQUEST = 'DELETE_CELEB_POST_REQUEST'
export const deleteCelebPostRequest = () =>({
    type: DELETE_CELEB_POST_REQUEST
})

export const DELETE_CELEB_POST_SUCCESS = 'DELETE_CELEB_POST_SUCCESS'
export const deleteCelebPostSuccess = () => ({
    type: DELETE_CELEB_POST_SUCCESS
})

export const UPLOAD_CELEB_IMAGE_REQUEST = 'UPLOAD_CELEB_IMAGE_REQUEST'
export const uploadCelebImageRequest = () => ({
    type: UPLOAD_CELEB_IMAGE_REQUEST
})

export const UPLOAD_CELEB_IMAGE_SUCCESS = 'UPLOAD_CELEB_IMAGE_SUCCESS'
export const uploadCelebImageSuccess = (imgUrl) => ({
    type: UPLOAD_CELEB_IMAGE_SUCCESS,
    imgUrl
})

export const uploadCelebImage = (file) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    //console.log(file)
    dispatch(uploadCelebImageRequest())
    return fetch(`${API_BASE_URL}/api/celebrity/img/`, {
        method: 'POST',
        body: file,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(uploadCelebImageSuccess(res)))
}

export const fetchCelebPosts = () => dispatch =>{
    dispatch(fetchCelebPostsRequest())
    fetch(`${API_BASE_URL}/api/celebrity/`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchCelebPostsSuccess(res)))
}

export const fetchCelebPostsSearch = (term) => dispatch => {
    dispatch(fetchCelebPostsSearchRequest())
    fetch(`${API_BASE_URL}/api/celebrity/search/${term}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchCelebPostsSearchSuccess(res)))
}

export const editCelebPost = (id, values) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(editCelebPostRequest())
    fetch(`${API_BASE_URL}/api/celebrity/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => {dispatch(editCelebPostSuccess(res))})
    .then(res => dispatch(fetchCelebPosts()))
}

export const addCelebPost = (values) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(addCelebPostRequest())
    fetch(`${API_BASE_URL}/api/celebrity/`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(addCelebPostSuccess()))
    .then(res => dispatch(fetchCelebPosts()))
}

export const deleteCelebPost = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(deleteCelebPostRequest())
    fetch(`${API_BASE_URL}/api/celebrity/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(deleteCelebPostSuccess()))
    .then(res => dispatch(fetchCelebPosts()))
}

export const CELEB_SET_EDIT = 'CELEB_SET_EDIT'
export const celebSetEdit = (bool) => ({
    type: CELEB_SET_EDIT,
    editing: bool
})

export const CELEB_SET_EXPANDED = 'CELEB_SET_EXPANDED'
export const celebSetExpanded = (id) => ({
    type: CELEB_SET_EXPANDED,
    expanded: id
})

export const CELEB_SET_IMG_URL = 'CELEB_SET_IMG_URL'
export const celebSetImgUrl = (url) => ({
    type: CELEB_SET_IMG_URL,
    imgUrl: url
})