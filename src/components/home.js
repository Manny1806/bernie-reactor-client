import React, { Component } from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './modal'
import { showModal } from '../actions/home/modal'
import './home.css';
import './current-column.css';
import './edit.css'
import './header-footer.css'
import './filters.css'
import OrgCard from './org/org-card'
import PolCard from './pol/pol-card'
import CelebCard from './celeb/celeb-card'
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchOrgPosts, fecthOrgPostsSearch, addEmptyOrgEntry, orgSetEdit} from '../actions/home/org-actions';
import {fetchPolPosts, fetchPolPostsSearch, addEmptyPolEntry, polSetEdit} from '../actions/home/pol-actions';
import {fetchCelebPosts, fetchCelebPostsSearch, addEmptyCelebEntry, celebSetEdit} from '../actions/home/celeb-actions';



class Home extends Component {

  constructor() {
    super()
    this.state = {
      currentColumn: "none",
      orgFilter: "All",
      editing: false
    }
    this.timeout = 0
    this.filter = React.createRef();
    this.search = React.createRef();
  }

  

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e){
    if(document.getElementsByClassName('org-filter-dropdown')[0]){
      if (!document.getElementsByClassName('org-filter-dropdown')[0].contains(e.target)){
        var dropdowns = document.getElementsByClassName("org-filter-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
    
  }

  orgSearch(searchText, filter){
    // let searchText = e.target.value
    if(this.timeout) clearTimeout(this.timeout)
    // if(searchText){
      this.timeout = setTimeout(()=>{this.props.dispatch(fecthOrgPostsSearch(searchText, filter))}, 500)
    // } else {
    //   this.timeout = setTimeout(()=>{this.props.dispatch(fetchProPosts())
    //   }, 500)
    // }
    
  }

  polSearch(e){
    let searchText = e.target.value
    if(this.timeout) clearTimeout(this.timeout)
    if(searchText){
      this.timeout = setTimeout(()=>{this.props.dispatch(fetchPolPostsSearch(searchText))
      }, 500)
    } else {
      this.timeout = setTimeout(()=>{this.props.dispatch(fetchPolPosts())
      }, 500)
    }
    
  }

  celebSearch(e){
    let searchText = e.target.value
    if(this.timeout) clearTimeout(this.timeout)
    if(searchText){
      this.timeout = setTimeout(()=>{this.props.dispatch(fetchCelebPostsSearch(searchText))
      }, 500)
    } else {
      this.timeout = setTimeout(()=>{this.props.dispatch(fetchCelebPosts())
      }, 500)
    }
    
  }

  getCurrentColumn() {
    if(this.state.currentColumn === "none") {
      return (
        <div className="landing-page-text-container">
        
        <p className="landing-text-1">On February 19th, 2019 Bernie Sanders announced his candidacy for the 2020 Presidential election. In 2016 he was
        the underdog, but this time around he is in it to win it. Droves of individuals have already shown their support for Bernie with individual donations
        amounting to $6 million in just 24 hours after his annoucement.</p>

          <img className="signing-photo" alt="Bernie 2020 annoucement" src="https://res.cloudinary.com/siouxcitymusic/image/upload/v1554262489/Bernie_Reactor/BernieKickoff.jpg"/>

          {/* <p className="landing-text-2">NAFTA 2.0's content is a 1,809-page text that was signed, in a ceremony
           on November 30, by the executives of Mexico, Canada, and the U.S. It takes
            effect if the legislatures of these signatory countries pass it.</p> */}

          {/* <p className="landing-text-3">President Donald Trump touts his version of NAFTA as the solution our country needed.</p> */}

          <p className="landing-text-4"><span style={{"fontWeight": '700'}}>Who else is supporting Bernie? </span>
          Click on a section above to see the Organizations, Politicians, and Celebrities that have publicly endorsed
          Bernie Sanders for President of the United States in 2020. We try to keep the site up to date but if you see something
          that is missing LET US KNOW on our feedback page.  
          </p>
      </div>
      )
    }
    else if (this.state.currentColumn === "org"){
      if(this.props.loading){
        return (
        <div className="loader-container">
          <ul className="loader"></ul>
        </div>
        )
      } else {
      return (
        
        <ul className="org-list-ul">
          {}
          {this.props.orgPosts.map((item, index) => {
            if(item.id === "new"){
              
              return (
                <OrgCard key={index} cardItem={item} id="new" />
              )
            } else {
              return (
                <OrgCard key={index} cardIndex={index} cardItem={item} id={item._id} quoteText={`quote${index}`}/>
              )
            }
          })}
          </ul>
      )
    }} else if (this.state.currentColumn === "pol"){
      if(this.props.loading){
        return (
          <div className="loader-container">
          <ul className="loader"></ul>
          </div>
      )
      } else {
      return (
        
        <ul className="org-list-ul">
          {}
          {this.props.polPosts.map((item, index) => {
            if(item.id === "new"){
              
              return (
                <PolCard key={index} cardItem={item} id="new" />
              )
            } else {
              return (
                <PolCard key={index} cardIndex={index} cardItem={item} id={item._id}/>
              )
            }
          })}
          </ul>
      )
    }} else if (this.state.currentColumn === "celeb"){
      if(this.props.loading){
        return (<div className="loader-container">
        <ul className="loader"></ul>
        </div>)
      } else {
      return (
        
        <ul className="org-list-ul">
          {}
          {this.props.celebPosts.map((item, index) => {
            if(item.id === "new"){
              
              return (
                <CelebCard key={index} cardItem={item} id="new" />
              )
            } else {
              return (
                <CelebCard key={index} cardIndex={index} cardItem={item} id={item._id}/>
              )
            }
          })}
          </ul>
      )
    }}
  } 

  getCurrentFilter() {
    if(this.state.currentColumn === "none") {
      return (
      <div />
      )
    }
    else if (this.state.currentColumn === "org"){
    return (
      <div className="filter-bar">
        
        <div className="org-filter-dropdown">
          <button className="org-filter-dropbtn" onClick={()=>{
            document.getElementById("org-filter-dropdown").classList.toggle("show");
          }}>Type: {this.state.orgFilter} &#9660;</button>
          <div id="org-filter-dropdown" className="org-filter-dropdown-content" >
            <label onClick={()=>{
              this.setState({orgFilter: "Individuals"})
              this.orgSearch(this.search.current.value, "Individuals")
              document.getElementById("org-filter-dropdown").classList.remove("show")
              }}>Individuals</label>
            <label onClick={()=>{
              this.setState({orgFilter: "Business Press"})
              this.orgSearch(this.search.current.value, "Business Press")
              document.getElementById("org-filter-dropdown").classList.remove("show")
              }}>Business Press</label>
            <label onClick={()=>{
              this.setState({orgFilter: "Corporate Interests"})
              this.orgSearch(this.search.current.value, "Corporate Interests")
              document.getElementById("org-filter-dropdown").classList.remove("show")
              }}>Corporate Interests</label>
            <label onClick={()=>{
              this.setState({orgFilter: "All"})
              this.orgSearch(this.search.current.value, "All")
              document.getElementById("org-filter-dropdown").classList.remove("show")
              }}>All</label>

          </div>
          <input className="search-input" ref={this.search} placeholder="Search" onChange={e=>this.orgSearch(e.target.value, this.state.orgFilter)}/>
        </div>
        {this.props.loggedIn?this.getNewEntryButton(): ""}
      </div>
    )
    }
    else if (this.state.currentColumn === "pol"){
      return (
        <div className="filter-bar">
          <input className="search-input" placeholder="Search" onChange={e=>this.polSearch(e)}/>
          {this.props.loggedIn?this.getNewEntryButton(): ""}
        </div>
      )
    }
    else if (this.state.currentColumn === "celeb"){
      return (
        <div className="filter-bar">
          <input className="search-input" placeholder="Search" onChange={e=>this.celebSearch(e)}/>
          {this.props.loggedIn?this.getNewEntryButton(): ""}
        </div>
      )
    }
  }

  getNewEntryButton() {
    if(this.state.currentColumn === "org"){
      return (
        <section className="new-entry-button" onClick={()=>{
          this.props.dispatch(orgSetEdit(true))
          this.props.dispatch(addEmptyOrgEntry())
          this.props.dispatch(showModal('active-org-card'))
          document.body.style.overflow = "hidden"
          }}>New Entry</section>
      )
    }
    else if(this.state.currentColumn === "pol"){
      return (
        <section className="new-entry-button" onClick={()=>{
          this.props.dispatch(polSetEdit(true))
          this.props.dispatch(addEmptyPolEntry())
          this.props.dispatch(showModal('active-pol-card'))
          document.body.style.overflow = "hidden"
          }}>New Entry</section>
      )
    }
    else if(this.state.currentColumn === "celeb"){
      return (
        <section className="new-entry-button" onClick={()=>{
          this.props.dispatch(celebSetEdit(true))
          this.props.dispatch(addEmptyCelebEntry())
          this.props.dispatch(showModal('active-celeb-card'))
          document.body.style.overflow = "hidden"
          }}>New Entry</section>
      )
    }
    
  }

  getLoginNav() {
    if(this.props.loggedIn){
      return (
        <nav onClick={()=>{
            this.props.dispatch(clearAuth())
            clearAuthToken()
            }}>
          <span>log out</span>
        </nav>
      )
    } else {
      return (
        <nav onClick={()=>this.props.dispatch(showModal('login'))}>
          <span>log in</span>
        </nav>
      )
    }
  }

  render() {
    return (
      <section className="Home">
      <Modal />
        <header className="header">
          <div className="banner-container">
            <div className="logo-image-container">
              <span>The<br/>Bernie<br/>Reactor</span>
            </div>
          {/* <div className="banner-transparency"/> */}
            {/* <div className="logo-image-container">
              <img className="logo-image" alt="NAFTA Reactor logo" src="https://res.cloudinary.com/siouxcitymusic/image/upload/v1549600202/NAFTA_Reactor_logo_new.png"/>
            </div> */}
            {/* <span className="home-title"> NAFTA Reactor</span> */}
            {/* <span className="home-sub-title">Sorting out Trump's New NAFTA</span> */}
            <div className="header-menu">
              <nav><span onClick={()=>{this.setState({currentColumn: "none"})}}><Link to="/">home</Link></span></nav>
              {/* <nav><span><Link to="/about">about</Link></span></nav> */}
              <nav><span><Link to="/feedback">feedback</Link></span></nav>
              
            </div>
          
          </div>
          {/* <div className="yellow-banner"><span>Sorting out Trump's new version of the North American Free Trade Agreement</span></div> */}
        </header>
        <div className="column-header-container">
          <div className={`for-header ${this.state.currentColumn === "org"? "column-header-active" : ""}`} onClick={()=>{
            if(this.state.currentColumn !== "org"){
              this.props.dispatch(fetchOrgPosts())
              this.setState({
              currentColumn: "org",
              orgFilter: "All"
            })}
            }}>
            <div className={`column-header-hover ${this.state.currentColumn === "org"? "column-header-hover-active" : ""}`}/>
            <div className={`column-header-hover-white ${this.state.currentColumn === "org"? "column-header-hover-white-active" : ""}`}/>
            <span>Organizations</span>
          </div>
          <div className={`pol-header ${this.state.currentColumn === "pol"? "column-header-active" : ""}`} onClick={()=>{
            if(this.state.currentColumn !== "pol"){
              this.props.dispatch(fetchPolPosts())
              this.setState({
              currentColumn: "pol",
              orgFilter: "All"
            })}
            }}>
            <div className={`column-header-hover ${this.state.currentColumn === "pol"? "column-header-hover-active" : ""}`}/>
            <div className={`column-header-hover-white ${this.state.currentColumn === "pol"? "column-header-hover-white-active" : ""}`}/>
            <span>Politicians</span>
          </div>
          <div className={`celeb-header ${this.state.currentColumn === "celeb"? "column-header-active" : ""}`} onClick={()=>{
            if(this.state.currentColumn !== "celeb"){
              this.props.dispatch(fetchCelebPosts())
              this.setState({
              currentColumn: "celeb",
              orgFilter: "All"
            })}
            }}>
            <div className={`column-header-hover ${this.state.currentColumn === "celeb"? "column-header-hover-active" : ""}`}/>
            <div className={`column-header-hover-white ${this.state.currentColumn === "celeb"? "column-header-hover-white-active" : ""}`}/>
            <span>Celebrities</span>
          </div>
        </div>
        <div className="column-entries-container">
        {/* Where current column will be displayed */}
        <div className='current-column' >
          {this.getCurrentFilter()}
          {this.getCurrentColumn()}
        </div>
        </div>
        <footer className="footer">
            <span>&copy;2019 Alex Widner</span> {this.getLoginNav()}
            
        </footer>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  orgPosts: state.orgReducers.orgPosts,
  polPosts: state.polReducers.polPosts,
  celebPosts: state.celebReducers.celebPosts,
  editing: state.orgReducers.editing,
  loading: state.orgReducers.loading || state.polReducers.loading || state.celebReducers.loading,
  loggedIn: state.auth.currentUser !== null,
  isShowing: state.modal.isShowing
});


export default connect(mapStateToProps)(Home);