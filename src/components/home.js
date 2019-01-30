import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
import Modal from './modal'
import { showModal } from '../actions/home/modal'
import './home.css';
import './current-column.css';
import './edit.css'
import ProCard from './pro/pro-card'
import ConCard from './con/con-card'
import CongressCard from './congress/congress-card'
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchProPosts, addEmptyProEntry, proSetEdit} from '../actions/home/pro-actions';
import {fetchConPosts, addEmptyConEntry, conSetEdit} from '../actions/home/con-actions';
import {fetchCongressPosts, addEmptyCongressEntry, congressSetEdit} from '../actions/home/congress-actions';



class Home extends Component {

  constructor() {
    super()
    this.state = {
      currentColumn: "none",
      editing: false
    }
  }

  getCurrentColumn() {
    if(this.state.currentColumn === "none") {
      return (<ul className="pro-list-ul"/>)
    }
    else if (this.state.currentColumn === "pro"){
      if(this.props.loading){
        return (<ul className="loader"></ul>)
      } else {
      return (
        
        <ul className="pro-list-ul">
          {}
          {this.props.proPosts.map((item, index) => {
            if(item.id === "new"){
              
              return (
                <ProCard key={index} cardItem={item} id="new" />
              )
            } else {
              return (
                <ProCard key={index} cardIndex={index} cardItem={item} id={item._id} quoteText={`quote${index}`}/>
              )
            }
          })}
          </ul>
      )
    }} else if (this.state.currentColumn === "con"){
      if(this.props.loading){
        return (<ul className="loader"></ul>)
      } else {
      return (
        
        <ul className="pro-list-ul">
          {}
          {this.props.conPosts.map((item, index) => {
            if(item.id === "new"){
              
              return (
                <ConCard key={index} cardItem={item} id="new" />
              )
            } else {
              return (
                <ConCard key={index} cardIndex={index} cardItem={item} id={item._id}/>
              )
            }
          })}
          </ul>
      )
    }} else if (this.state.currentColumn === "congress"){
      if(this.props.loading){
        return (<ul className="loader"></ul>)
      } else {
      return (
        
        <ul className="pro-list-ul">
          {}
          {this.props.congressPosts.map((item, index) => {
            if(item.id === "new"){
              
              return (
                <CongressCard key={index} cardItem={item} id="new" />
              )
            } else {
              return (
                <CongressCard key={index} cardIndex={index} cardItem={item} id={item._id}/>
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
      <div className="landing-page-text-container">
        <p>On November 30, 2018 the U.S., Mexico, and Canada signed a trade deal to replace NAFTA. 
            <br/>It is known as the United States-Mexico-Canada Agreement, or USMCA.</p>
      </div>
      )
    }
    else if (this.state.currentColumn === "pro"){
    return (
      <div className="filter-bar">
        {this.props.loggedIn?this.getNewEntryButton(): ""}
      </div>
    )
    }
    else if (this.state.currentColumn === "con"){
      return (
        <div className="filter-bar">
          {this.props.loggedIn?this.getNewEntryButton(): ""}
        </div>
      )
    }
    else if (this.state.currentColumn === "congress"){
      return (
        <div className="filter-bar">
          {this.props.loggedIn?this.getNewEntryButton(): ""}
        </div>
      )
    }
  }

  getNewEntryButton() {
    if(this.state.currentColumn === "pro"){
      return (
        <section className="new-entry-button" onClick={()=>{
          this.props.dispatch(proSetEdit(true))
          this.props.dispatch(addEmptyProEntry())
          this.props.dispatch(showModal('active-pro-card'))
          document.body.style.overflow = "hidden"
          }}>New Entry</section>
      )
    }
    else if(this.state.currentColumn === "con"){
      return (
        <section className="new-entry-button" onClick={()=>{
          this.props.dispatch(conSetEdit(true))
          this.props.dispatch(addEmptyConEntry())
          this.props.dispatch(showModal('active-con-card'))
          document.body.style.overflow = "hidden"
          }}>New Entry</section>
      )
    }
    else if(this.state.currentColumn === "congress"){
      return (
        <section className="new-entry-button" onClick={()=>{
          this.props.dispatch(congressSetEdit(true))
          this.props.dispatch(addEmptyCongressEntry())
          this.props.dispatch(showModal('active-congress-card'))
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
        <header className="home-header">
          <div className="home-banner-container">
            <span className="home-title"> NAFTA Reactor</span>
            <span className="home-sub-title">Sorting out Trump's New NAFTA</span>
            <div className="home-header-menu">
              <nav><span>home</span></nav>
              <nav><span>about</span></nav>
              {this.getLoginNav()}
              <nav><span>contact</span></nav>
            </div>
          </div>
        </header>
        <div className="column-header-container">
          <div className="for-header" onClick={()=>{
            if(this.state.currentColumn !== "pro"){
              this.props.dispatch(fetchProPosts())
              this.setState({
              currentColumn: "pro"
            })}
            }}>
            <div className="column-header-hover"/>
            <span>Who likes the new NAFTA?</span>
          </div>
          <div className="con-header" onClick={()=>{
            if(this.state.currentColumn !== "con"){
              this.props.dispatch(fetchConPosts())
              this.setState({
              currentColumn: "con"
            })}
            }}>
            <div className="column-header-hover"/>
            <span>Who's left behind?</span>
          </div>
          <div className="congress-header" onClick={()=>{
            if(this.state.currentColumn !== "congress"){
              this.props.dispatch(fetchCongressPosts())
              this.setState({
              currentColumn: "congress"
            })}
            }}>
            <div className="column-header-hover"/>
            <span>Where do our representatives stand?</span>
          </div>
        </div>
        <div className="column-entries-container">
        {/* Where current column will be displayed */}
        <div className='current-column' >
          {this.getCurrentFilter()}
          {this.getCurrentColumn()}
        </div>
        </div>
        <footer className="home-footer">

        </footer>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  proPosts: state.proReducers.proPosts,
  conPosts: state.conReducers.conPosts,
  congressPosts: state.congressReducers.congressPosts,
  editing: state.proReducers.editing,
  loading: state.proReducers.loading || state.conReducers.loading || state.congressReducers.loading,
  loggedIn: state.auth.currentUser !== null,
  isShowing: state.modal.isShowing
});


export default connect(mapStateToProps)(Home);