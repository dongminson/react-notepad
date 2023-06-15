import { gql } from '@apollo/client';

const typeDefs = gql`
    type Note {
        id: ID!
        text: String!
        date: String!
    }
    type Mutation {
        addNote(text: String!): Note
        removeNote(id: ID!): Note
    }
    type Query {
        notes: [Note]
    }
`;

export default typeDefs;
