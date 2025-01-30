import { mergeTypeDefs } from "@graphql-tools/merge";
import { gql } from "apollo-server-express";
import { authTypeDefs } from "../user/auth.schema";


const baseTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

const typeDefs = mergeTypeDefs([baseTypeDefs, authTypeDefs]);

export default typeDefs;
