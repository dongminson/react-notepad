import { gql } from '@apollo/client';

export const ADD_NOTE = gql`
    mutation AddNote($text: String!) {
        addNote(text: $text) @client
    }
`

export const DELETE_NOTE = gql`
    mutation RemoveNote($id: ID!) {
        removeNote(id: $id) @client
    }
`;

export const GET_NOTES = gql`
    query GetNotes {
        notes @client {
            id
            text
            date
        }
    }
`;