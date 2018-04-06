import React, { Component } from 'react';
import {connect} from 'react-redux';
import { downVotePostStore, downVoteCommentStore  } from '../actions/index';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


class VoteDownButton extends Component {
    
    render(){
              
      return(
        <Button color="blue" size="medium" onClick={() => this.decideVote()} icon="arrow down"/>
        )
    }

    decideVote = () =>
    {
        this.props.type === "comment"
        ? this.props.downVoteComment(this.props.id)
        : this.props.downVotePost(this.props.id)
    }

}

function mapDispatchToProps(dispatch){
    return {
        downVotePost: (id) => dispatch(downVotePostStore(id)),
        downVoteComment: (id) => dispatch(downVoteCommentStore(id)),
    }
  }


export default withRouter(connect(null, mapDispatchToProps)(VoteDownButton));