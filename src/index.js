import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GET_NOTES } from './graphql/operations';
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";

const cache = new InMemoryCache();

const client = new ApolloClient({
	cache,
	resolvers,
	typeDefs
});

const localStorageData = localStorage.getItem('notes');
const initialData = localStorageData ? { notes: JSON.parse(localStorageData)} : { notes: [] };

cache.writeQuery({
  query: GET_NOTES,
  data: initialData,
});

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>
);
