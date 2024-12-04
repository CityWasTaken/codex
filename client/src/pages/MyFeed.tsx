import { useQuery } from "@apollo/client";
import { Row, Col, Container, Card} from "react-bootstrap";
import {GET_ALL_USER_POSTS} from '../graphql/queries';


function MyFeed() {

    const { loading, error, data } = useQuery(GET_ALL_USER_POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading posts :/ {error.message}</p>;

    const posts = data.getallUserPosts

  return (
    <Container>
      <h1 className= 'my-4'>My Feed</h1>

        <Row>
            {posts.map((post) => (
            <Col md={4} sm="12" key={post._id} className="mb-4">

                <Card className="h-100">
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
    </Container>
  );
}

export default MyFeed;