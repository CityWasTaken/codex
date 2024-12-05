import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation RegisterUser($username: String, $email: String, $password: String) {
  registerUser(username: $username, email: $email, password: $password) {
    errors
    user {
      _id
      username
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
        errors
          user {
          _id
          username
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
        user {
        _id
      }
    }
  }
`;

export const CREATE_POST = gql`
mutation CreatePost($postText: String, $user: ID) {
  createPost(postText: $postText, user: $user) {
    errors
    message
  }
}
`;

export const UPDATE_POST = gql`
mutation UpdatePost($postId: ID, $postText: String) {
  updatePost(postId: $postId, postText: $postText) {
    errors
    message
  }
}
`;

export const DELETE_POST = gql`
mutation DeletePost($postId: ID) {
  deletePost(postId: $postId) {
    errors
    message
  }
}
`;

export const LIKE_POST = gql`
mutation LikePost($postId: ID) {
  likePost(postId: $postId) {
    errors
    message
  }
}
`;

export const CREATE_COMMENT = gql`
mutation CreateComment($commentText: String, $post: ID, $user: ID) {
  createComment(commentText: $commentText, post: $post, user: $user) {
    errors
    message
  }
}
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: ID!) {
  followUser(userId: $userId) {
    user {
      username
    }
    errors
    message
  }
}
`;