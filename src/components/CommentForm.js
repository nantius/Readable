import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addCommentStore, addCommentToPostStore } from '../actions/index';
import serializeForm from 'form-serialize';
import  uuidv1 from 'uuid';
import {withRouter} from 'react-router-dom';
import { Button, Divider, Form, Container, Segment } from 'semantic-ui-react';

class CommentForm extends Component {

    handleSubmit= (e) => {
        
        this.setState({sendingComment: true})

        e.preventDefault()
        const values = serializeForm(e.target, {hash: true})

        let timestamp = Date.now()
        let voteScore = 0
        let deleted = false
        let id = uuidv1()
        let parentId = this.props.match.params.post_id

        values.timestamp = timestamp
        values.voteScore = voteScore
        values.deleted = deleted
        values.id = id
        values.parentId = parentId

        this.props.addCommentToPost(this.props.match.params.post_id)
  
        this.props.addComment(values).then(() => {
            this.setState({sendingComment: false})  
        })
    }

    state = {
        sendingComment : false
    }

    render(){
    let {sendingComment} = this.state

      return(
        <div className="comment">

            <Segment inverted>
                <Container  text>
                    <Form loading={sendingComment} style={{textAlign: 'center'}} inverted size='big' onSubmit={this.handleSubmit} action="post">

                        <Form.Input  label="Author" type="text" name="author" placeholder='Author...'/>
                        <Form.TextArea label="Comment"  name="body" placeholder='Comment...'/>
                        
                        <Button size='big' color='blue'>
                            Create
                        </Button>
                    </Form>
                </Container>
            </Segment>
            <Divider/>
        </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
      addComment: (data) => dispatch(addCommentStore(data)),
      addCommentToPost: (data) => dispatch(addCommentToPostStore(data))
    }
}



export default withRouter(connect(null, mapDispatchToProps)(CommentForm));

