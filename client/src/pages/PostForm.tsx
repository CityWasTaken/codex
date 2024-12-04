import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/mutations';
import { GET_ALL_USER_POSTS } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';

// const initialFormData = {
//     postText: '',
//     errorMessage: ''
// };

function PostForm() {
  const [formData, setFormData] = useState({ postText: '', errorMessage: '' });
  const [createPost] = useMutation(CREATE_POST);
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
  };

  // Example list of users who liked the post
  const likedUsers = [
    { _id: '1', username: 'user1'},
    { _id: '2', username: 'user2'}
  ];

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Post Text</Form.Label>
          <Form.Control
            name="postText"
            onChange={handleInputChange}
            value={formData.postText}
            type="text"
            placeholder="Enter your post"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        {/* <div className="d-grid gap-2"></div> */}

        <div className='likes'>
          <h4>Liked by:</h4>
          <ul>
            {likedUsers.map(user => (
              <li key={user._id}>
                <Link to={`/profile/${user.username}`}>{user.username}</Link>
              </li>
            ))}
          </ul>
        </div>
    </Container>
  );
}

export default PostForm;