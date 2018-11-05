import {split} from 'apollo-link';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';

const httpLink = new HttpLink();

const wsLink =
    typeof window === 'undefined'
        ? new HttpLink()
        : new WebSocketLink({
              uri: 'ws://' + location.host + '/graphql',
              options: {
                  reconnect: true,
              },
          });

const link = split(
    ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
        // watchQuery: {
        //     fetchPolicy: 'no-cache',
        //     errorPolicy: 'ignore',
        // },
        // query: {
        //     fetchPolicy: 'no-cache',
        //     errorPolicy: 'all',
        // },
        // gameChanged: {
        //     fetchPolicy: 'no-cache',
        //     errorPolicy: 'all',
        // },
    },
});

export default client;
