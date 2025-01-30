import { gql } from "apollo-server-express";

export const authTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    profilePic: String
  }

  type AuthPayload {
    id: ID!
    name: String!
    email: String!
    profilePic: String!
    refreshToken: String!
    accessToken: String!
  }

  extend type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
