import { useQuery } from "@apollo/client";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GET_ALL_USER_POSTS } from "../graphql/queries";
import { useStore } from "../store";
import moment from "moment";
import { NavLink } from "react-router-dom";


function MyFeed() {
  const { state } = useStore()!;

  // Call useQuery unconditionally
  const { data, loading, error } = useQuery(GET_ALL_USER_POSTS, {
    variables: { user_id: state.user ? state.user._id : "" },
    skip: !state.user, // Skip the query if user is not logged in
  });

  if (!state.user) {
    return <div>Please log in to see your feed.</div>;
  }
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("Error loading posts:", error);
    return <div>Error loading posts</div>;
  }

  console.log(data)
  return (
    <Container>
      <h1 className="my-4">My Feed</h1>
      <Row>
        {data.getAllUserPosts.map((post: any) => (
          <Col key={post._id} md="4">
            <Row className="my-4"></Row>
            <Card>
              <Card.Body>
                <Card.Title className="post-title">
                  <NavLink to={`/profile/${post?.user.username}`}>{post?.user.username}</NavLink>
                </Card.Title>
                <Card.Text className="post-text">{post.postText}</Card.Text>
                <Card.Text className="post-date">
                  {moment(post.createdAt).format("MMMM Do YYYY")}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default MyFeed;