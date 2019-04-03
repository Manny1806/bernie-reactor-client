import React from 'react';
import { connect } from 'react-redux';
import { getActiveOrgPost } from '../../actions/home/org-actions';
import { showModal } from '../../actions/home/modal'
import '../current-column.css';
import '../edit.css'

class OrgCard extends React.Component {
  constructor(props) {
    super(props);
    this.quoteTitle = React.createRef();
    this.quoteText = React.createRef();
    this.image = React.createRef();
    }
    
    componentDidMount(){
      //add elipsis to quotes that all too long for collapsed card
      let titleHeight = this.quoteTitle.current.clientHeight
      //240 - titleHeight
      this.quoteText.current.innerHTML = this.props.cardItem.quote

      while(this.quoteText.current.clientHeight >= (240 - (titleHeight + 18))){
        let lastSpaceIndex = this.quoteText.current.innerHTML.lastIndexOf(" ")
        this.quoteText.current.innerHTML = this.quoteText.current.innerHTML.slice(0, lastSpaceIndex) + "...."
      }

    }

    render() 
      {
        return (
          <div className="org-list-item"
            onClick={() => {
              document.body.style.overflow = "hidden"
              this.props.dispatch(getActiveOrgPost(this.props.id))
              this.props.dispatch(showModal("active-org-card"))
              }}>
            <div>
              <div className="image-container">
                <img ref={this.image} alt="" className="image" src={this.props.cardItem.imgUrl || "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG"}/>
              </div>
              <h2 ref={this.quoteTitle}>{this.props.cardItem.title}</h2>
              <div className="quote-container">
                <p ref={this.quoteText}>
                </p>
                {/* <div className="read-more"/> */}
              </div>
            </div>
          </div>
        );
      } 
    }
  

  const mapStateToProps = state => ({
    editing: state.orgReducers.editing,
    expanded: state.orgReducers.expanded,
    loading: state.orgReducers.editLoading,
    imgUrl: state.orgReducers.imgUrl
  });

  export default connect (mapStateToProps) (OrgCard)