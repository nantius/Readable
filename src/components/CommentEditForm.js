import React, { Component } from 'react';
import {connect} from 'react-redux';
import { editCommentStore } from '../actions/index';
import { Button, Divider, Form, Container, Segment } from 'semantic-ui-react';

class CommentEditForm extends Component {

    handleSubmit= (e) => {
        this.setState({sendingComment: true})

        e.preventDefault()

        const {body } = this.state
  
        this.props.editComment({body}, this.props.id).then(() => {
            this.setState({  body: body })  
        })
    }

    state = {
        sendingComment : false,
        body : ''
    }

    componentDidMount = () => {
        this.setState({body: this.props.comment.body})
      }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render(){
    let {body} = this.state
    let {comment} = this.props
    
      return(

        comment ? (
        <div className="comment">
            <Segment inverted>
                <Container  text>
                    <Form  style={{textAlign: 'center'}} inverted size='big' onSubmit={this.handleSubmit} action="post">
                
                        <Form.TextArea value={body} label="Comment" onChange={this.handleChange}  name="body" placeholder='Comment...'/>   
                     
                        <Button size='big' color='blue'>
                            Edit
                        </Button>
                     
                    </Form>
                </Container>
            </Segment>
            <Divider/>
        </div>
        ) : <p>Loading</p>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
      editComment: (data, id) => dispatch(editCommentStore(data, id))
    }
}

function mapStateToProps(state, ownProps)
{
    let comment = state.comments.byId ? state.comments.byId[ownProps.id]
    : null; 

    return {
        comment: comment
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditForm);

