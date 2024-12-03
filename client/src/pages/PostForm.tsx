import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'react-bootstrap';
import { CREATE_POST } from '../graphql/mutations';

const initialFormData = {
    postText: '',
    errorMessage: ''
};

function PostForm({ userId }: { userId: string }) {
    const [formData, setFormData] = useState(initialFormData);
    const [createPost, { loading, error }] = useMutation(CREATE_POST);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createPost({
                variables: {
                    userId,
                    postText: formData.postText
                }
            });

            setFormData(initialFormData); // Reset form after successful submission
        } catch (error: any) {
            setFormData({
                ...formData,
                errorMessage: error.message
            });
        }
    };

    return (
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

            {formData.errorMessage && (
                <p className="text-danger">{formData.errorMessage}</p>
            )}

            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </Button>

            {error && <p className="text-danger">{error.message}</p>}
        </Form>
    );
}

export default PostForm;