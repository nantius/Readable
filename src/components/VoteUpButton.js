import React, { Component } from 'react';
import {connect} from 'react-redux';
import { upVotePostStore, upVoteCommentStore  } from '../actions/index';
import { withRouter } from 'react-router-dom';
import { Button} from 'semantic-ui-react';

class VoteUpButton extends Component {
    
    render(){
      return(
        <Button color="blue" size="medium" onClick={() => this.decideVote()} icon="arrow up"/>
        )
    }

    decideVote = () =>
    {
        this.props.type === "comment"
        ? this.props.upVoteComment(this.props.id)
        : this.props.upVotePost(this.props.id)
    }
}

function mapDispatchToProps(dispatch){
    return {
        upVotePost: (id) => dispatch(upVotePostStore(id)),
        upVoteComment: (id) => dispatch(upVoteCommentStore(id)),
    }
  }

export default withRouter(connect(null, mapDispatchToProps)(VoteUpButton));