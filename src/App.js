import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Category from './components/Category';
import {receiveCategories, receivePosts} from './actions/index';
import {connect} from 'react-redux';
import Loading from 'react-loading';
import RootHeader from './components/RootHeader';
import { withRouter } from 'react-router-dom';
import Post from './components/Post';

class App extends Component {

  state = {
    loadingCategories : true
  }

  componentDidMount = () => {
    this.props.receiveCategories().then(
      () => {  
        this.props.receivePosts().then(
          () => { this.setState(() => ({loadingCategories: false}))}
        )    
      }
    )
  }

  headerStyle = {
    display : 'inline-block', 
    marginRight: '20px'
  }

  render() {

    let {loadingCategories} = this.state
    let {categories} = this.props

    return (
      
      <div className="App">
          <Switch>
            <Route path={"/"} exact render={() => (
                 <div>        
                 {loadingCategories === true
                 ? (<Loading delay={200} type='spin' color='#222' className='loading' />) 
                 :
                  (<div>
                      <RootHeader category={"all"} location="/"/>
                    {
                      categories.map(category => (
                        <Category key={category.name} name={category.name} ></Category>
                      ))
                    }
                  </div>
                  )}
            </div>
            )}/>

            <Route exact path={"/:category"} component={Category} />
          
            <Route path={"/:category/:post_id"} component={Post} />

            <Route render={() => (<p>404</p>)}/>
          </Switch>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    receiveCategories: () => dispatch(receiveCategories()),
    receivePosts: () => dispatch(receivePosts())
  }
}

function mapStateToProps(state){

   return{
       categories: state.categories,
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
