import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        collections {
          _id
          name
          images
        }
      }
    }
  } 
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName:$firstName, lastName:$lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_COLLECTION = gql`
  mutation addCollection($name: String!, $images: [Int]!){
    addCollection(name: $name, images: $images) {
      _id
      name
      images
    }
  }
`;

export const ADD_IMAGE = gql`
  mutation addImage($collectionId: ID!, $imageId: Int!){
    addImage(collectionId: $collectionId, imageId:$imageId){
      _id
      name
      images
    }
  }
`;

export const REMOVE_COLLECTION = gql`
  mutation removeCollection($collectionId: ID!){
    removeCollection(collectionId: $collectionId) {
      _id
      name
      user{
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const REMOVE_IMAGE = gql`
  mutation removeImage($collectionId: ID!, $imageId: Int!){
    removeImage(collectionId: $collectionId, imageId:$imageId){
      _id
      name
      images
    }
  }
`;