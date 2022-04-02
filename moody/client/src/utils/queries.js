import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user {
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
`

export const QUERY_USER_ID = gql`
  query userId($userId: ID!){
    user(userId: $userId){
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
`

export const QUERY_COLLECTIONS = gql`
  query collections($name: String!){
    collections{
        _id
        name
        images
    } 
  }
`

export const QUERY_ONE_COLLECTION = gql`
  query oneCollection($collectionId: ID!){
    collection(collectionId: $collectionId) {
      _id
      name
      images
      user{
        _id
        firstName
        lastName
        email
      }
    } 
  }
`