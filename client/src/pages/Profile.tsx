import { useQuery } from '@apollo/client';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GET_USER_INFO } from '../graphql/queries';
import PostForm from './PostForm';

function Profile() {
    const { userId = '' } = useParams<{ userId: string }>();
    const { loading, error, data } = useQuery(GET_USER_INFO, {
        variables: { id: userId }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const user = data?.user;

    if (!user) return <p>User not found</p>;

    return (
        <Container>
            <Row>
                <Col md="4">
                    <Card>
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>Followers: {user.followers.length}</Card.Text>
                            <Card.Text>Following: {user.following.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md="8">
                    <h2 className="fw-light">My Posts</h2>
                    <hr />
                    <PostForm userId={userId} />
                    <Row className="my-4">
                        {user.posts.length === 0 ? (
                            <p>No posts yet.</p>
                        ) : (
                            user.posts.map((post: any) => (
                                <Col lg="6" md="12" key={post.id} className="mb-4">
                                    <Card className="h-100">
                                        <Card.Body>
                                            <Card.Text>{post.postText}</Card.Text>
                                            <Card.Text><small>{new Date(post.createdAt).toLocaleString()}</small></Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;