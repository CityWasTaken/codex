import { Row, Col, Container, Card, Button, Modal, Form } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { Link, NavLink, useParams } from "react-router-dom";

import { GET_USER_INFO } from "../graphql/queries";
import { CREATE_COMMENT, DELETE_POST, UPDATE_POST } from "../graphql/mutations";
import { useStore } from "../store/index";
import { Post } from "../interfaces";
import CreatePostModal from "./Profile/components/CreatePostModal";
import { useState } from "react";
import ViewPostModal from "./Profile/components/ViewPostModal";


function Profile() {
  const { username } = useParams<{ username: string }>();
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showViewPostModal, setShowViewPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentPostForComment, setCurrentPostForComment] = useState<Post | null>(null);
  const [comment, setComment] = useState("");

  const { state } = useStore()!;
  const { data, loading, error } = useQuery(GET_USER_INFO, {
    variables: { username }
  });
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_USER_INFO, variables: { username } }],
  });
  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_USER_INFO, variables: { username } }],
  });

  const handleUpdateClick = (post: any) => {
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentPost(null);
  };

  const handleCommentClick = (post: Post) => {
    setCurrentPostForComment(post);
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setCurrentPostForComment(null);
  }

  const handleSave = async () => {
    if (currentPost) {
      try {
        await updatePost({ variables: { postId: currentPost._id, postText: currentPost.postText } });
        setShowModal(false);
        setCurrentPost(null);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };

  const handleSubmitComment = async () => {
    if (currentPostForComment) {
      try {
        await createComment({ variables: { commentText: comment, post: currentPostForComment._id, user: state.user._id } });
        handleCloseCommentModal();
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    }
  };

  const handleShowCreatePostModal = () => setShowCreatePostModal(true);
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_USER_INFO, variables: { username } }],
  });


  // const [updatePost] = useMutation(UPDATE_POST, {
  //   refetchQueries: [{ query: GET_USER_INFO, variables: { username } }],
  // });

  const handleDeletePost = async (id: string) => {
    try {
      console.log("ID", id)
      await deletePost({ variables: { postId: id } });
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  };

  // interface HandleViewPost {
  //   (post: Post): void;
  // }

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setShowViewPostModal(true);
  };

  // const handleUpdatePost = async (id: string) => {
  //   try {
  //     await updatePost ({ variables: { postId: id } });
  //     console.log('Post updated');
  //   } catch (error) {
  //     if (error instanceof ApolloError) {
  //       console.error('Error updating post:', error.message);
  //     } else {
  //       console.error('Unexpected error:', error);
  //     }
  //   }
  // };
  //get the user from the store

  //error handling and loading screens
  // if (!data) {
  //   return <div>Error loading posts</div>;
  // }

  // if (!username) {
  //   return <div>Loading...</div>;
  // }
  // const [isFollowing, setIsFollowing] = useState(false);
  // const [followUser] = useMutation(FOLLOW_USER, {
  //   refetchQueries: [{ query: GET_USER_INFO, variables: { username } }],
  // });

  // const handleFollow = async (event: React.MouseEvent<HTMLButtonElement>) => {
  // //   event.preventDefault();

  //   // const followStatus = isFollowing ? 'followUser' : 'unfollowUser';

  //   try {
  //     await followUser({ variables: { username } });
  //     setIsFollowing(!isFollowing);
  //   } catch (error) {
  //     console.log('Error following user:', error);
  //   }
  // };

  //more error handling and loading screens
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }


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

            {/* <Button onClick={(event) => handleFollow(event)}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button> */}

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
                      <Button variant="primary" onClick={() => handleUpdateClick(post)}>Update Post</Button>
                      <Button variant="secondary" onClick={() => handleCommentClick(post)}>
                        Comment
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          <Modal show={showCommentModal} onHide={handleCloseCommentModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCommentModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmitComment}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPostText">
              <Form.Label>Post Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentPost?.postText || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, postText: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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

