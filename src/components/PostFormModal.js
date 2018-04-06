import React from 'react';
import PostEditForm from './PostEditForm';
import PostForm from './PostForm';
import { Button, Modal } from 'semantic-ui-react'



function PostFormModal(props){

  const {id, category} = props;

  return (

    // Edit Post
    id ? (

      <Modal trigger={<Button color="green" size="medium" icon="edit"/>}>
      <Modal.Header as='h2' style={{margin: '0px', textAlign: 'center'}} >Edit Post</Modal.Header>
      <Modal.Content>
        <Modal.Description>
        <PostEditForm id={id} category={category} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
    : // New Post
     (
      <Modal trigger={<Button color="blue" size="medium" >New Post</Button>}>
      <Modal.Header as='h2' style={{margin: '0px', textAlign: 'center'}} >New Post</Modal.Header>
      <Modal.Content>
        <Modal.Description>
        <PostForm category={category}/>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )

  )
}

export default PostFormModal;