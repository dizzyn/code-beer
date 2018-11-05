import Game from '../src/components/Game';
import {ApolloProvider} from 'react-apollo';
import client from '../src/graph/client';

import './style.scss';

export default class extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Game mode={this.props.pathname} type="spectator" mode="/monitor" />
            </ApolloProvider>
        );
    }
}
