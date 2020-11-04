const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    phone: String!
    status: String!
    number: String!
    role: String!
    createdAt: String!
    updatedAt: String!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type Status {
    queueLength: String!
    nextInline: User
    lastServed: User
}

input UserInput {
    name: String!
    email: String!
    password: String
    phone: String!
}

type RootQuery {
    singleUser(userId: String!): User!
    getStatus: Status!
    waitingUsers: [User!]!
    servedUsers: [User!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): AuthData!
    deleteUser(userId: String!): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
