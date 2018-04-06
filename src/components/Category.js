import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import PostPreview from './PostPreview';
import { denormalize } from 'normalizr';
import  {postSchema} from '../schemas';
import CategoryHeader from './CategoryHeader';
import RootHeader from './RootHeader';


class Category extends Component {


    render(){
      let {posts, name, categories, location, match} = this.props
      return(
        <div>
          {
            location.pathname !== "/" && <RootHeader category={name ? name : match.params.category }   />
          }
          {
            (
              (categories.length > 0 && categories.find(category => category.name === match.params.category) 
              !== undefined) 
              || location.pathname === "/"
            ) 
            && <CategoryHeader name={name ? name : match.params.category } />
          }
        
          {
            categories.length > 0 
            && categories.find(category => category.name === match.params.category) 
            !== undefined 
            || location.pathname === "/"  ?
            (
              <div className="body">
              <div className="post_body">
                {
                  posts ? 
                    posts.map(
                      post => (
                        <PostPreview key={post.id} category={name} post={post}/>
                      )
                    ) 
                    : "No posts"
                }
                <Divider/> 
              </div>
          </div>
            )
             :  location.pathname !== "/" && (<p>404</p>)
         
          }
      </div>
    )
    }

}

function mapStateToProps(state, ownProps)
{
  // Denormalization of data
  let mySchema = { posts: [postSchema] }
  let allIds = state.posts.allIds ? state.posts.allIds : null;
  let normPosts = state.posts.byId ?  state.posts.byId : null;
  let entities = { posts : normPosts};
  let denormalizedData = allIds && normPosts ? denormalize({posts : allIds}, mySchema, entities) : null;

  let denormPosts;

  ownProps.name 
  ? 
    denormPosts = denormalizedData ?  denormalizedData.posts
    .filter(post => post.category === ownProps.name)
    : null
  : 
    denormPosts = denormalizedData ?  denormalizedData.posts
    .filter(post => post.category === ownProps.match.params.category)
    : null

    denormPosts = state.posts.byId ? denormPosts.sort(function(a,b){ return b.voteScore - a.voteScore}) 
  : null

  return {
    categories: state.categories,
    posts: state.posts.byId ? denormPosts : null
  } 
}

export default withRouter(connect(mapStateToProps, null)(Category));