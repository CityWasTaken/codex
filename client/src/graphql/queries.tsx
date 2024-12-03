import { gql } from "@apollo/client";

export const SEARCH_USER = gql`
query SearchUser($username: String) {
  searchUser(username: $username) {
    username
    email
    _id
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
      body
      user {
        name
      }
    }
  }
`;
