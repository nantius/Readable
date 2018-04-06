import React, { Component } from 'react';
import {connect} from 'react-redux';
import { deletePostStore, deleteCommentStore, deleteCommentFromPostStore } from '../actions/index';
import { withRouter } from 'react-router-dom';
import { Button} from 'semantic-ui-react';

class DeleteButton extends Component {
    
    render(){
      
      return(
            <Button color="red" size="medium" onClick={() => this.decideDeletion()}   icon="delete"/>
        )
    }

    decideDeletion = () =>
    {
        this.props.postId ?
        ( 
            this.props.deletePost(this.props.postId)
        ) 
        : this.props.deleteComment(this.props.commentId).then(() => this.props.deleteFromPost(this.props.match.params.post_id))
    }

}

function mapDispatchToProps(dispatch){
    return {
       deletePost: (id) => dispatch(deletePostStore(id)),
       deleteComment: (id) => dispatch(deleteCommentStore(id)),
       deleteFromPost: (id) => dispatch(deleteCommentFromPostStore(id))
    }
  }


export default withRouter(connect(null, mapDispatchToProps)(DeleteButton));