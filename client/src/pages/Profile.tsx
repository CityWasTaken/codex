import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_USER } from "../graphql/queries";
import { useStore } from "../store/index";
import { Post } from "../interfaces";



/* making the functionality of the page before pretting it up(writing so i dont confuse myself) */
 

function Profile() {
    //get the user from the store
    const { state } = useStore()!;
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { id: state.user._id },
    });

    //more error handling and loading screens
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const user = data.user;
    

  return (
    //display user info
    //make following and following button that links to respective pages
    //make a grid of posts that the user has made
    //use card from bootstrap to make it look decent



    <Container fluid={true} className="mt-a">
        <Row>
            //display user info
            <Col md="4">
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    //do we need an email? ill put it in for now
                    <Card.Text>{user.email}</Card.Text>

                    <Link to="/followers">
                        <Button variant="primary" className="me-2">Followers</Button>
                    </Link>

                    <Link to="/following">
                        <Button variant="primary">Following</Button>
                    </Link>

                </Card.Body>
            </Col>

            //display posts
            <Col md="8">
                <h2 className="fw-light">My Posts</h2>
                <hr />
                <Row className = "my-4">
                    {user.posts.length === 0 ?(
                        <p>No posts yet.</p>
                    ):(
                        user.posts.map((post: Post) => (
                            <Col lg="6" md="12" key={post._id} className="mb-4">
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Card.Text>{post.body}</Card.Text>
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