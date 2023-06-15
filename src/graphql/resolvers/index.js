import { gql } from '@apollo/client';
import { uuidv4 } from '../../utils';

const query = gql`
    query GetNotes {
        notes @client {
            id
            text
            date
        }
    }
`;

const mutations = {
    Mutation: {
        addNote: (obj, { text }, { cache }) => {
            const previousState = cache.readQuery({ query });
            const date = new Date();
            const newNote = {
                id: uuidv4(),
                text,
                date: date.toLocaleDateString()
            };
            const data = {
                notes: previousState.notes.concat([newNote])
            };
            cache.writeQuery({
                query,
                data
            });
            localStorage.setItem('notes', JSON.stringify(data.notes));
    
            return newNote;
        },
        removeNote: (obj, { id }, { cache }) => {
            const currentNotes = cache.readQuery({ query });
            const filteredNotes = currentNotes.notes.filter(note => {
                return note.id !== id;
            });
            const data = {
                notes: filteredNotes
            };
            localStorage.setItem('notes', JSON.stringify(data.notes));
            cache.writeQuery({
                query,
                data
            });
            return null;
        }
    }
};

export default mutations
