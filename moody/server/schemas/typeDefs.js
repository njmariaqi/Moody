const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  password: String
  collections: [Collection]
}

type Collection {
  _id: ID
  name: String
  images: [Int]
  user: User
}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user: User
  userId(userId: ID!): User
  collections(name: String!): [Collection]
  collection(collectionId: ID!): Collection
  
}

type Mutation {
  addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!):Auth
  addCollection(name: String!, images:[Int]!): Collection
  addImage(collectionId: ID!, imageId: Int!): Collection
  removeCollection(collectionId: ID!): Collection
  removeImage(collectionId: ID!, imageId: Int!): Collection
}
`;

module.exports = typeDefs;