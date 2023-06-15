import React from 'react';

const Header = ({ handleToggleDarkMode, darkMode }) => {
	return (
		<div className='header'>
			<h1>Notepad</h1>
			<button
				onClick={() =>
					handleToggleDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='save'
			>
				{ darkMode ? 'Dark mode' : 'Light mode' }
			</button>
		</div>
	);
};

export default Header;
