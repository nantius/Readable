import React, { Component } from 'react';
import {connect} from 'react-redux';
import {receiveComments} from '../actions/index';
import { denormalize } from 'normalizr';
import  {commentSchema} from '../schemas';
import VoteDownButton from './VoteDownButton';
import VoteUpButton from './VoteUpButton';
import CommentFormModal from './CommentFormModal';
import {  Divider, Container, Header, } from 'semantic-ui-react';
import DeleteButton from './DeleteButton';

class Comments extends Component {

    componentDidMount = () => {
        this.props.receiveComments(this.props.postId)
        .then(() => this.setState({loadingComments: false}))
    }

    state = {
        loadingComments: true
    }

    render(){
     let {comments} = this.props
      return(
        <div>
            <Container>
                <Header as="h1">Comments</Header>

                <CommentFormModal />
                <Divider/>
                <div style={{marginTop: '10px'}}>
                {
                    comments ? comments.map(comment => (
                        <div key={comment.id}>
                            <p>{comment.body}</p>
                            <p>By {comment.author}</p>
                            <p>{comment.voteScore}</p>
                            <VoteUpButton id={comment.id} type={"comment"}  />
                            <VoteDownButton id={comment.id} type={"comment"} />
                            <DeleteButton commentId={comment.id} />
                            <CommentFormModal id={comment.id} />
                            <Divider/>

                        </div>
                    ))
                    : "no comments"
                }
                </div>
            </Container>
        </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        receiveComments: (id) => dispatch(receiveComments(id)),
    }
}

function mapStateToProps(state){

    // Denormalization of data
    let mySchema = { comments: [commentSchema] }
    let allIds = state.comments.allIds ? state.comments.allIds : null;
    let normComments = state.comments.byId ?  state.comments.byId : null;
    let entities = { comments : normComments};
    let denormalizedData = allIds && normComments ? denormalize({comments : allIds}, mySchema, entities) : null;
    let denormComments = denormalizedData ?  denormalizedData.comments
    : null;

    return {
        comments: state.comments.byId ? denormComments : null
    } 
  }

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

