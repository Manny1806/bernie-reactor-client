import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/home/modal'
import { editPolPost, addPolPost, deletePolPost, polSetEdit, uploadPolImage } from '../../actions/home/pol-actions';

class ActivePolCard extends React.Component {
    constructor(props) {
      super(props);
      this.quote = React.createRef();
      this.quoteReference = React.createRef();
      this.quoteLink = React.createRef();
      this.description = React.createRef();
      this.title = React.createRef();
      this.image = React.createRef();
      this.state = {
        editImg: "",
        submitDisabled: false,
        titleError: ""
      }
    }

    getEditButton () {
      return (
          <button className="edit-button"onClick={()=>{
          this.setState({
            editImg: this.props.activePolPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"
          })
          this.props.dispatch(polSetEdit(true))
          }}>Edit</button>
      )
    }

    getDeleteButton () {
      return (
          <button className="delete-button" onClick={()=>{
          this.props.dispatch(deletePolPost(this.props.activePolPost._id))
          document.body.style.overflow = "visible"
          this.props.dispatch(this.props.dispatch(hideModal()))
          }}>Delete</button>
      )
    }
    
    render() {
        if(this.props.loading){
          return (
            <section className="small-loader"/>
          )
        } else {
        if(this.props.editing){
          
          return (
            <div className="org-list-item-active-edit">
              <div>
                <label className="title-label">Title</label>
                <input className="title-input" ref={this.title} defaultValue={this.props.activePolPost.title || ""}
                onChange={(e)=>{
                  if(e.target.value.length < 1){
                    this.setState({
                      titleError: "title field is required",
                      submitDisabled: true
                    })
                  } else if (e.target.value.length >= 1 && e.target.value.length < 70){
                    this.setState({
                      titleError: "",
                      submitDisabled: false
                    })
                  } 
                }}
                />
                <label className="title-error">{this.state.titleError}</label>
    
                <label className="quote-label">Quote</label>
                <textarea className="quote-input" ref={this.quote} defaultValue={this.props.activePolPost.quote || ""}/>
  
                <label className="quote-ref-label">Quote Reference</label>
                <input className="quote-ref-input" ref={this.quoteReference} defaultValue={this.props.activePolPost.quoteReference || ""}/>
                
                <label className="quote-link-label">Quote Link</label>
                <input className="quote-link-input" ref={this.quoteLink} defaultValue={this.props.activePolPost.quoteLink || ""}/>
  
                <label className="description-label">Comments</label>
                <textarea className="description-input" ref={this.description} defaultValue={this.props.activePolPost.description || ""}/>
  
                <label className="image-upload-label">Image</label>
                <input className="image-upload-input" key={this.state.key} onChange={(e)=>{
                  this.setState({
                    editImg: URL.createObjectURL(this.image.current.files[0])
                  })
                }
                } 
                  name="file" ref={this.image} type="file" accept="image/png, image/jpeg"/>
  
                <div className="active-image-container-edit">
                  <img className="image" alt="" src={
                    this.state.editImg
                    }/>
                </div>
  
                <button className="confirm-button" onClick={()=>{
                  var id = this.props.activePolPost._id
                  if(this.image.current.files[0]){
                    var imgData = new FormData()
                    imgData.append("file", this.image.current.files[0])
                    this.props.dispatch(uploadPolImage(imgData))
                    .then((res)=>{
                    console.log(res)
                    const data = {
                      title: this.title.current.value,
                      quote: this.quote.current.value,
                      quoteReference: this.quoteReference.current.value || "",
                      quoteLink: this.quoteLink.current.value || "",
                      description: this.description.current.value || "",
                      imgUrl: res.imgUrl.url
                    }
                    id ? this.props.dispatch(editPolPost(id, data)) : this.props.dispatch(addPolPost(data))
                    document.body.style.overflow = "visible"
                    this.props.dispatch(hideModal())
                    this.props.dispatch(polSetEdit(false))
                  })
                  } else {
                    const data = {
                      title: this.title.current.value,
                      quote: this.quote.current.value,
                      quoteReference: this.quoteReference.current.value || "",
                      quoteLink: this.quoteLink.current.value || "",
                      description: this.description.current.value || "",
                      imgUrl: this.props.activePolPost.imgUrl || ""
                    }
                    id ? this.props.dispatch(editPolPost(id, data)) : this.props.dispatch(addPolPost(data))
                    document.body.style.overflow = "visible"
                    this.props.dispatch(hideModal())
                    this.props.dispatch(polSetEdit(false))
                  } 
                }}>Confirm</button>
    
                <button className="cancel-button" onClick={()=>{
                  document.body.style.overflow = "visible"
                  this.props.dispatch(hideModal())
                  this.props.dispatch(polSetEdit(false))
                  }}>X</button>
              </div>
            </div>
          )
        } else {
          return (
            <div className="org-list-item-active">
            <div>
            <h2>{this.props.activePolPost.title}</h2>

            <div className="active-image-container">
              <img className="image" alt="" src={this.props.activePolPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
            </div>

            <p className="quote">
                {this.props.activePolPost.quote}
                <span className="reference-span"> 
                  {this.props.activePolPost.quoteLink ? <a target="_blank" rel="noopener noreferrer" href={this.props.activePolPost.quoteLink}>{this.props.activePolPost.quoteReference}</a>:this.props.activePolPost.quoteReference}
                </span>
            </p>
                {this.props.activePolPost.description ? <p className="comments">{this.props.activePolPost.description}</p> : <p/>}
            
            <label className="collapse-button" onClick={()=>{
              document.body.style.overflow = "visible"
              this.props.dispatch(this.props.dispatch(hideModal()))
            }}>X</label>
              {/* if logged in show edit and delete buttons */}
              {this.props.loggedIn ? this.getEditButton() : ""}
              {this.props.loggedIn ? this.getDeleteButton() : ""}
              </div>
            </div>)
        }
      }
    }
}

const mapStateToProps = state => ({
    editing: state.polReducers.editing,
    loading: state.polReducers.activePolPostLoading,
    imgUrl: state.polReducers.imgUrl,
    loggedIn: state.auth.currentUser !== null,
    activePolPost: state.polReducers.activePolPost
  });

export default connect (mapStateToProps) (ActivePolCard)