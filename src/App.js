import { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client";

import Header from './components/Header';
import NotesList from './components/NotesList';
import Search from './components/Search';

import { ADD_NOTE, DELETE_NOTE, GET_NOTES } from './graphql/operations';

const App = () => {
	const [notes, setNotes] = useState([]);

	const { data } = useQuery(GET_NOTES);

	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	const [addNote] = useMutation(ADD_NOTE);

	const [deleteNote] = useMutation(DELETE_NOTE);

	useEffect(() => {
		if (data.notes) {
			setNotes(data.notes)
		}
	}, [data]);

	const handleAddNote = (text) => {
		addNote({
			variables: {
				text: text
			}
		})
	}

	const handleRemoveNote = (id) => {
		deleteNote({
			variables: {
				id: id
			}
		});
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} darkMode={darkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={handleAddNote}
					handleDeleteNote={handleRemoveNote}
				/>
			</div>
		</div>
	);
};

export default App;