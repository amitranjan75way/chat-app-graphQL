import { mergeResolvers } from "@graphql-tools/merge";
import { authResolvers } from "../user/auth.resolver";

const resolvers = mergeResolvers([authResolvers]);

export default resolvers;
