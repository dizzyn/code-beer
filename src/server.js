import express from 'express';
import next from 'next';
import {ApolloServer} from 'apollo-server-express';
import {execute, subscribe} from 'graphql';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import typeDefs from './graph/schema';
import resolvers from './graph/resolvers';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

app.prepare().then(() => {
    const server = express();
    apolloServer.applyMiddleware({app: server});

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    // Wrap the Express server
    const ws = createServer(server);
    ws.listen(port, err => {
        if (err) throw err;
        console.log(`👾👾 Ready on http://localhost:${port}`);
        // Set up the WebSocket for handling GraphQL subscriptions
        new SubscriptionServer(
            {
                execute,
                subscribe,
                schema: apolloServer.schema,
            },
            {
                server: ws,
                path: '/graphql',
            }
        );
    });
});
