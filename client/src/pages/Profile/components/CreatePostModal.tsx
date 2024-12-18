import { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useMutation} from '@apollo/client';

import { CREATE_POST } from '../../../graphql/mutations';
import { GET_ALL_USER_POSTS } from '../../../graphql/queries';
import { Post } from '../../../interfaces';


const initialFormData = {
  title: '',
  body: '',
  errorMessage: ''
};

interface ModalProps {
  selectedUser: Post | null;
  showCreatePostModal: boolean;
  setShowCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePostModal({
  selectedUser,
  showCreatePostModal,
  setShowCreatePostModal
}: ModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{
      query: GET_ALL_USER_POSTS,
      variables: {
        userId: selectedUser?._id
      }
    }, { query: GET_ALL_USER_POSTS}]
  });

  const handleModalClose = () => {
    setFormData({ ...initialFormData });
    setShowCreatePostModal(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      await createPost({
        variables: {
          ...formData,
          user: selectedUser?._id,
          postText: formData.body
        }
      });

      setFormData({ ...initialFormData });

      handleModalClose();
      location.reload();
    } catch (error: any) {
      setFormData({
        ...formData,
        errorMessage: error.message
      });
    }
  }

  return (
    <Modal show={showCreatePostModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        {/* <Modal.Title>Create post for {selectedUser?._id}</Modal.Title> */}
        <Modal.Title>Tell Us What's On Your Mind Coder...</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {formData.errorMessage && <Alert variant="danger">{formData.errorMessage}</Alert>}

        <Form>
          <Form.Group className="mb-3">

          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter the post details</Form.Label>
            <Form.Control
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              as="textarea"
              rows={3}
              placeholder="Type your details" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Post
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreatePostModal;