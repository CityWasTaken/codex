import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Container, Form } from 'react-bootstrap';
import { CREATE_POST } from '../graphql/mutations';
import { GET_ALL_USER_POSTS } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';

const initialFormData = {
    postText: '',
    errorMessage: ''
};


function PostForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [createPost] = useMutation(CREATE_POST,{
    refetchQueries: [{query:GET_ALL_USER_POSTS}]
});
const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createPost({
                variables: {
                    ...formData,
                    postText: formData.postText
                }
            });

        navigate('/profile');
    } catch (error: any) {
      setFormData({
        ...formData,
        errorMessage: error.message
      });
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} style={{ width: '500px' }} className="mx-auto mt-5">
        <h2 className="text-center mt-3">Create Post</h2>

        {formData.errorMessage && (
          <p className="text-center text-danger">{formData.errorMessage}</p>
        )}

        
        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control name="type" onChange={handleInputChange} value={formData.postText} type="text" placeholder="Enter your post" />
        </Form.Group>

    

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default PostForm;

