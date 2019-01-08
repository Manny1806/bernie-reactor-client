
import {SHOW_MODAL, HIDE_MODAL} from '../../actions/home/modal'

export default function modal(state = {
  isShowing: false,
  page: ''
}, action) {

  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {
        isShowing: true,
        page: action.page,
        id: action.id
      })
    case HIDE_MODAL:
      return Object.assign({}, state, {
        isShowing: false
      })
    default:
      return state
  }

}