import React, { Component } from 'react'
import { hideModal } from '../actions/home/modal'
import { connect } from 'react-redux'
import ActiveOrgCard from './org/active-org-card'
import ActivePolCard from './pol/active-pol-card'
import ActiveCelebCard from './celeb/active-celeb-card'
import Login from './login/login'
import FeedbackModal from './feedbackModal'


import './modal.css'

class Modal extends Component {
  setPage() {
    if (this.props.page === 'active-org-card'){
      return <ActiveOrgCard />
    }
    else if (this.props.page === 'active-pol-card'){
      return <ActivePolCard />
    }
    else if (this.props.page === 'active-celeb-card'){
      return <ActiveCelebCard />
    }
    else if (this.props.page === 'login'){
      return <Login />
    }
    else if (this.props.page === 'feedback-modal'){
      return <FeedbackModal />
    }
  }
  render() {

    return (
      <div className="modal">
        { this.props.isShowing &&
          <div>
            <div className="modal-backdrop" onClick={()=>{
              document.body.style.overflow = "visible"
              this.props.dispatch(hideModal())}}></div>
            <div className="confirm-modal-content">
            {this.setPage()} 
            </div>
          </div>
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    isShowing: state.modal.isShowing,
    page: state.modal.page,
    id: state.modal.id
  }
}

export default connect(mapStateToProps)(Modal)