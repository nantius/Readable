import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DeleteButton from './DeleteButton';
import PostFormModal from './PostFormModal';
import VoteDownButton from './VoteDownButton';
import VoteUpButton from './VoteUpButton';
import { Divider, Grid, Container  } from 'semantic-ui-react';

class PostPreview extends Component {


    render(){
      let {post} = this.props
      return(
        <Container>
            <Grid textAlign="center">
                <Grid.Row >
                    <Grid.Column width={2}>
                    <Link to={`/${post.category}/${post.id}`}>
                    <p>{post.title}</p>
                    </Link>
                    </Grid.Column>
                    <Grid.Column>
                        By
                    </Grid.Column>
                    <Grid.Column width={2}>
                    <p>{post.author}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column width={2}>
                    <VoteUpButton id={post.id} type={"post"}  />
                    <VoteDownButton id={post.id} type={"post"} />
                    <p style={{marginTop: '10px'}}>{post.voteScore}</p>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    <DeleteButton postId={post.id}/>
                    <PostFormModal id={post.id}/>
                    <p style={{marginTop: '10px'}}>Comments: {post.commentCount}</p>   
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider/>
        </Container>
        )
    }
}

export default PostPreview;


