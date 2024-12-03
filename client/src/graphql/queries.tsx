import { gql } from "@apollo/client";

export const SEARCH_USER = gql`
query SearchUser($username: String) {
  searchUser(username: $username) {
    _id
    username
  }
}
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      user {
        _id
        username
      }
    }
  }
  `;


export const GET_ALL_USER_POSTS = gql`
  query GetAllUserPosts {
    getAllUserPosts {
      _id
      title
      postText
      user {
        name
      }
    }
  }
`;

export const GET_USER_INFO = gql`
  query getUserInfo($username: String) {
  getUserInfo(username: $username) {
    user {
      _id
      followers {
        username
      }
      following {
        username
      }
      posts {
        _id
        postText
      }
      username
    }
  }
}
`;