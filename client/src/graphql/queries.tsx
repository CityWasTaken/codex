import { gql } from "@apollo/client";

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


export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      title
      body
      pet {
        name
      }
    }
  }
`;
