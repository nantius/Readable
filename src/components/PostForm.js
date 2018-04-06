import React, { Component } from 'react';
import {connect} from 'react-redux';
import { addPostStore } from '../actions/index';
import serializeForm from 'form-serialize';
import  uuidv1 from 'uuid';
import { Button, Divider, Form, Container, Segment } from 'semantic-ui-react';

class PostForm extends Component {

    handleSubmit= (e) => {
        
        this.setState({sendingPost: true})
        e.preventDefault()
        const values = serializeForm(e.target, {hash: true})

        let timestamp = Date.now()
        let voteScore = 0
        let deleted = false
        let id = uuidv1()
        let commentCount = 0

        values.timestamp = timestamp
        values.voteScore = voteScore
        values.deleted = deleted
        values.id = id
        values.commentCount = commentCount
  
        this.props.addPost(values).then(() => {
            this.setState({sendingPost: false})  
        })
    }

    state = {
        sendingPost : false
    }

    render(){
    let {sendingPost} = this.state
    let {categories, category} = this.props
    
    categories = 
        categories 
        ?  categories.reduce(function(prev, curr) {
        return [...prev, {'text': capitalizeFirstLetter(curr.name), 'key': curr.name, 'value': curr.name}];
        }, []) 
        : null
    
      return(
        <div className="post">

            <Segment inverted>
                <Container  text>
                    <Form loading={sendingPost} style={{textAlign: 'center'}} inverted size='big' onSubmit={this.handleSubmit} action="post">

                        <Form.Input  label="Title" type="text" name="title" placeholder='Title...'/>
                        <Form.Input  label="Author" type="text" name="author" placeholder='Author...'/>
                        <Form.TextArea label="Post"  name="body" placeholder='Post...'/>
                        
                        {
                            category === "all" 
                            ? (
                                <Form.Field name='category' control='select' label='Category' >
                                    {
                                        categories.map(category => (
                                            <option key={category.key} value={category.value}>{category.text}</option>
                                        ))
                                    }
                                </Form.Field>
                            ) 
                            : (<Form.Input style={this.HeaderStyle} name='category' type='hidden' value={category} />)
                        }
                    
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
      addPost: (data) => dispatch(addPostStore(data))
    }
}

function mapStateToProps(state){
    return{
        categories: state.categories
    }
 }

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

