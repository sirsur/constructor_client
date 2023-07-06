import { ApolloClient, createHttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from '@apollo/client/link/error';
import { RestLink } from 'apollo-link-rest';

const httpLink = createHttpLink ({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});

const restLink = new RestLink({
    uri: 'httpt://localhost:4000/', 
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
    link: from ([errorLink, restLink, httpLink]),
    cache: new InMemoryCache(),
    
});

export default client;
