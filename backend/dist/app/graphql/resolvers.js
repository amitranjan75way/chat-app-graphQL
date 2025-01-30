"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
    Query: {
        messages: () => {
            return [
                { content: "Hello!", sender: "Alice" },
                { content: "Hi!", sender: "Bob" }
            ];
        },
    },
    Mutation: {
        sendMessage: (parent, { content, sender }) => {
            pubsub.publish('MESSAGE_SENT', { messageSent: { content, sender } });
            return { content, sender };
        },
    },
    Subscription: {
        messageSent: {
            subscribe: () => pubsub.asyncIterator('MESSAGE_SENT'),
        },
    },
};
