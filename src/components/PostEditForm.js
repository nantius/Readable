import React, { Component } from 'react';
import {connect} from 'react-redux';
import { editPostStore } from '../actions/index';
import { Button, Divider, Form, Container, Segment } from 'semantic-ui-react';

class PostEditForm extends Component {

    handleSubmit= (e) => {
        this.setState({sendingPost: true})

        e.preventDefault()

        const { title, body } = this.state
  
        this.props.editPost({title, body}, this.props.id).then(() => {
            this.setState({ title: title, body: body })  
        })
    }

    state = {
        sendingPost : false,
        title : '',
        body : ''
    }

    componentDidMount = () => {
        this.setState({title: this.props.post.title, body: this.props.post.body})
      }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render(){
    let {title, body} = this.state
    let {post} = this.props
    
      return(

        post ? (
        <div className="post">
            <Segment inverted>
                <Container  text>
                    <Form  style={{textAlign: 'center'}} inverted size='big' onSubmit={this.handleSubmit} action="post">
                
                        <Form.Input value={title} label="Title" onChange={this.handleChange} type="text" name="title" placeholder='Title...'/>
                        <Form.TextArea value={body} label="Post" onChange={this.handleChange}  name="body" placeholder='Post...'/>   
                     
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
      editPost: (data, id) => dispatch(editPostStore(data, id))
    }
}

function mapStateToProps(state, ownProps)
{
    let post = state.posts.byId ? state.posts.byId[ownProps.id]
    : null; 

    return {
        post: post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditForm);

