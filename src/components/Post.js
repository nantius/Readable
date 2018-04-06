import React, { Component } from 'react';
import {connect} from 'react-redux';
import { deletePostStore} from '../actions/index';
import {Link, withRouter} from 'react-router-dom';
import Comments from './Comments';
import PostFormModal from './PostFormModal';
import VoteDownButton from './VoteDownButton';
import VoteUpButton from './VoteUpButton';


import { Button, Divider, Icon, Grid, Container, Header } from 'semantic-ui-react';


class Post extends Component {

    HeaderStyle = {
        margin: '0px'
    } 

    render(){
    let {post, deletePost} = this.props
      return(
  
        post ? (
        <div>
            <Container style={{marginTop: '20px'}}>
                <Grid textAlign="center">
                <Grid.Row>
                    <Grid.Column>
                        <Link style={{marginTop: '20px'}}  to={`/`}><Icon size='big' name='arrow left' /></Link>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h1">{post.title}</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column >
                    <p>By {post.author}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    <Header as="h3">Post</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    <p>{post.body}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column width={2}>
                    <Header as="h3">Score</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    <Header as="h3">Comments</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column width={2}>
                    <p>{post.voteScore}</p>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    <p>{post.commentCount}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
                </Grid>
                <VoteUpButton id={post.id} type={"post"}  />
                <VoteDownButton id={post.id} type={"post"} />
                <Button color="red" size="medium" onClick={() => deletePost(post.id).then(() => this.props.history.push("/"))}   icon="delete"/>
                <PostFormModal id={post.id}/>
                <Divider/>
            </Container>
            <div>
                <Comments postId={post.id}/>
            </div>
        </div>
        )
        : <div>404</div>
        ) 
    }
 
}

function mapDispatchToProps(dispatch){
    return{
        deletePost: (id) => dispatch(deletePostStore(id)),
    }
}

function mapStateToProps(state, ownProps)
{
    let post = state.posts.byId ? state.posts.byId[ownProps.match.params.post_id]
    : null; 

    return {
        post: post
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));

