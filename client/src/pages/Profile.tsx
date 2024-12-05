import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Link, NavLink, useParams } from "react-router-dom";

import { GET_ALL_USER_POSTS, GET_USER_INFO } from "../graphql/queries";
import { DELETE_POST, FOLLOW_USER } from "../graphql/mutations";
import { useStore } from "../store/index";
import { Post } from "../interfaces";
import CreatePostModal from "./Profile/components/CreatePostModal";
import { useState } from "react";
import ViewPostModal from "./Profile/components/ViewPostModal";

/* making the functionality of the page before pretting it up(writing so i dont confuse myself) */


function Profile() {
  const { username } = useParams<{ username: string }>();
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showViewPostModal, setShowViewPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // const [commentText, setCommentText] = useState('');

  const { data, loading, error } = useQuery(GET_ALL_USER_POSTS, {
    variables: { username }
  });

  const handleShowCreatePostModal = () => setShowCreatePostModal(true);
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_USER_INFO, variables: { username } }],
  });

  const handleDeletePost = async (id: string) => {
    try {
      const { data } = await deletePost({ variables: { id } });
      if (data.deletePost.success) {
        console.log('Post deleted successfully');
      } else {
        console.error('Failed to delete post:', data.deletePost.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  interface HandleViewPost {
    (post: Post): void;
  }

  const handleViewPost: HandleViewPost = (post) => {
    setSelectedPost(post);
    setShowViewPostModal(true);
  };
  //error handling and loading screens
  // if (!username) {
  //   return <div>Loading...</div>;
  // }

  // get the user from the store
  const { state } = useStore()!;
  // const { data, loading, error } = useQuery(GET_USER_INFO, {
  //   variables: { username }
  // });
  const [isFollowing, setIsFollowing] = useState(false);
  const [followUser] = useMutation(FOLLOW_USER, {
    refetchQueries: [{ query: GET_USER_INFO, variables: { username } }],
  });

  const handleFollow = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await followUser({ variables: { username } });
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log('Error following user:', error);
    }
  };

  //more error handling and loading screens
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

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
              <Button variant="primary" className="me-2">Following</Button>
            </Link>

            <Button onClick={(event) => handleFollow(event)}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>

          </Card.Body>
        </Col>

        {/* display posts */}
        <Col md="8">
          <h2 className="fw-light">My Posts</h2>
          <hr />
          <Button variant="primary" onClick={handleShowCreatePostModal}>
            Add New Post
          </Button>
          <Row className="my-4">
            {data.getUserInfo.user.posts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              data.getUserInfo.user.posts.map((post: Post) => (
                <Col lg="6" md="12" key={post._id} className="mb-4">
                  <Card className="h-100">
                    <Card.Body>
                      <NavLink to={`/profile/${data.getUserInfo.user.username}`}>
                        <Card.Title>{data.getUserInfo.user.username}</Card.Title>
                      </NavLink>
                      <Card.Text>{post.postText}</Card.Text>
                      {state.user?.username === data.getUserInfo.user.username && (
                        <Button variant="danger" onClick={() => handleDeletePost(post._id)}>
                          Delete
                        </Button>
                      )}
                      <Button variant="info" onClick={() => handleViewPost(post)}>
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
      <CreatePostModal
        showCreatePostModal={showCreatePostModal}
        setShowCreatePostModal={setShowCreatePostModal}
        selectedUser={data.getUserInfo.user}
      />

      <ViewPostModal
        showViewPostModal={showViewPostModal}
        setShowViewPostModal={setShowViewPostModal}
        post={selectedPost}
      />
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

// <h1>Followers</h1>
/*
  <Card.Body>
    <Card.Title>{data.getUserInfo.user.followers.username}</Card.Title>
  </Card.Body>
*/

/* <div className='likes'>
                        <h4>Liked By:</h4>
                        <ul>
                          {post.likes.map((user: User) => (
                          <li key={user._id}>
                            <NavLink to={`/profile/${user.username}`}>{user.username}</NavLink>
                          </li>
                          ))}
                        </ul>
                      </div> */