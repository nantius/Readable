import React from 'react';
import CommentForm from './CommentForm';
import CommentEditForm from './CommentEditForm';
import { Button, Modal } from 'semantic-ui-react'




function CommentFormModal(props){

  const {id} = props;

  return (

    // Edit Comment
    id ? (

      <Modal trigger={<Button color="green" size="medium" icon="edit"/>}>
      <Modal.Header as='h2' style={{margin: '0px', textAlign: 'center'}} >Edit Comment</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <CommentEditForm id={id} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
    : // New Comment
     (
      <Modal trigger={<Button color="blue" size="medium" >New Comment</Button>}>
      <Modal.Header as='h2' style={{margin: '0px', textAlign: 'center'}} >New Comment</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            <CommentForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )

  )
}

export default CommentFormModal;