import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { useState } from 'react';


import { GET_USER, GET_ALL_USER_POSTS } from '../graphql/queries';

const initialFormData = {
    id: '',
    name: '',
    type: '',
    post: '',
    errorMessage: ''
};

function UserForm() {
    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();

    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {
        variables: { id: formData.id }
    });

    const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_ALL_USER_POSTS, {
        variables: { userId: formData.id }
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        try {
            // Assuming you want to refetch the posts after form submission
            await postsData.refetch({
                variables: {
                    userId: formData.id
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
    if (userLoading || postsLoading) return <p>Loading...</p>;
    if (userError || postsError) return <p>Error: {userError?.message || postsError?.message}</p>;

    return (
        <Container>
            <Form onSubmit={handleSubmit} style={{ width: '500px' }} className="mx-auto mt-5">
                <h2 className="text-center mt-3">Create Post</h2>
                {formData.errorMessage && (
                    <p className="text-center text-danger">{formData.errorMessage}</p>
                )}

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="name" onChange={handleInputChange} value={formData.name} type="text" placeholder="Enter the title of the post" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Types</Form.Label>
                    <Form.Control name="type" onChange={handleInputChange} value={formData.type} type="text" placeholder="Enter the type of post" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label> Post</Form.Label>
                    <Form.Control name="post" onChange={handleInputChange} value={formData.post} type="string" />
                </Form.Group>


                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>

                <div>
                <h2>User Data</h2>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                    <h2>User Posts</h2>
                    <pre>{JSON.stringify(postsData, null, 2)}</pre>
                </div>
            </Form>
        </Container>
    )
}


export default UserForm;