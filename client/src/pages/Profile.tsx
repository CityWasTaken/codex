import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import { GET_USER_INFO } from "../graphql/queries";
// import { useStore } from "../store/index";
import { Post } from "../interfaces";

/* making the functionality of the page before pretting it up(writing so i dont confuse myself) */


function Profile() {
  const { username } = useParams<{ username: string }>();

  //error handling and loading screens
  if (!username) {
    return <div>Loading...</div>;
  }

  //get the user from the store
  // const { state } = useStore()!;
  const { data } = useQuery(GET_USER_INFO, {
    variables: {
      username: username
    }
  });

  //more error handling and loading screens
  if (!data) {
    return <div>Loading...</div>;
  }

  // const user = data.user;


  return (

    <Container fluid={true} className="mt-a">
      <Row>
        {/* display user info */}
        <Col md="4">
          <Card.Body>
            <Card.Title>{data.getUserInfo.user.username}</Card.Title>

            <Link to="/followers">
              <Button variant="primary" className="me-2">Followers</Button>
            </Link>

            <Link to="/following">
              <Button variant="primary">Following</Button>
            </Link>

          </Card.Body>
        </Col>

        {/* display posts */}
        <Col md="8">
          <h2 className="fw-light">My Posts</h2>
          <hr />
          <Row className="my-4">
            {data.getUserInfo.user.posts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              data.getUserInfo.user.posts.map((post: Post) => (
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

/*
    <div>
        <h1>{data.getUserInfo.user.username}'s Profile</h1>
        <p>Followers: {data.getUserInfo.user.followers.map((user: any) => user.username).join(', ')}</p>
        <p>Post count: {data.getUserInfo.user.posts.length}</p>
    </div>
*/