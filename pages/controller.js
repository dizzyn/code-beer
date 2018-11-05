import Game, {SUBSCRIBE_GAME, UPDATE_GAME} from '../src/components/Game';
import {ApolloProvider} from 'react-apollo';
import client from '../src/graph/client';
import {Query, Mutation, Subscription} from 'react-apollo';
import gql from 'graphql-tag';
import classnames from 'classnames';
import './style.scss';

const RESET_GAME = gql`
    mutation($questId: Int) {
        resetGame(questId: $questId) {
            desc
        }
    }
`;

const GET_QUESTS = gql`
    query {
        quest {
            id
            desc
            code
        }
    }
`;

export default class extends React.Component {
    render = () => (
        <ApolloProvider client={client}>
            <div className="controller">
                <Mutation mutation={RESET_GAME}>
                    {(resetGame, {data}) => (
                        <div className="controller">
                            <button onClick={e => resetGame()}>Reset Game</button>
                        </div>
                    )}
                </Mutation>

                <Mutation mutation={UPDATE_GAME}>
                    {(updateGame, {data}) => (
                        <Subscription subscription={SUBSCRIBE_GAME}>
                            {({data, loading, error}) => {
                                if (error)
                                    return (
                                        <div className="game-status">
                                            <img src="./static/puff.svg" width="50" />
                                            {error.message}
                                        </div>
                                    );
                                if (loading) {
                                    return (
                                        <div className="game-status">
                                            <img src="./static/puff.svg" width="50" />Loading
                                        </div>
                                    );
                                } else {
                                    const {player1, player2, questId} = data.gameChanged;
                                    let name1, name2;
                                    return (
                                        <div>
                                            <Query query={GET_QUESTS}>
                                                {({data, loading, error}) => {
                                                    if (error) return error;
                                                    if (loading) return 'loading';
                                                    return (
                                                        <ul key={questId}>
                                                            {data.quest.map(quest => (
                                                                <div key={quest.id}>
                                                                    <div
                                                                        style={{
                                                                            textOverflow:
                                                                                'ellipsis',
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            width: '600px',
                                                                            padding: '5px 0',
                                                                            color:
                                                                                questId == quest.id
                                                                                    ? 'green'
                                                                                    : 'default',
                                                                        }}
                                                                    >
                                                                        <Mutation
                                                                            mutation={RESET_GAME}
                                                                        >
                                                                            {resetGame => (
                                                                                <button
                                                                                    disabled={
                                                                                        questId ==
                                                                                        quest.id
                                                                                    }
                                                                                    className={classnames(
                                                                                        {
                                                                                            on:
                                                                                                questId ==
                                                                                                quest.id,
                                                                                            disabled:
                                                                                                questId ==
                                                                                                quest.id,
                                                                                        }
                                                                                    )}
                                                                                    onClick={e =>
                                                                                        resetGame({
                                                                                            variables: {
                                                                                                questId:
                                                                                                    quest.id,
                                                                                            },
                                                                                        })
                                                                                    }
                                                                                >
                                                                                    Pick
                                                                                </button>
                                                                            )}
                                                                        </Mutation>
                                                                        <span
                                                                            style={{
                                                                                display:
                                                                                    'inline-block',
                                                                                marginLeft: 10,
                                                                                marginRight: 10,
                                                                            }}
                                                                        >
                                                                            {quest.id}
                                                                        </span>&nbsp;&nbsp;{
                                                                            quest.desc
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </ul>
                                                    );
                                                }}
                                            </Query>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Player 1.</td>
                                                        <td>Player 2.</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input
                                                                defaultValue={player1.name}
                                                                ref={node => {
                                                                    name1 = node;
                                                                }}
                                                            />
                                                            <button
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player1.name',
                                                                            value: name1.value,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Rename
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <input
                                                                defaultValue={player2.name}
                                                                ref={node => {
                                                                    name2 = node;
                                                                }}
                                                            />
                                                            <button
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player2.name',
                                                                            value: name2.value,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Rename
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button
                                                                className={classnames({
                                                                    active: player1.order == 1,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player1.order',
                                                                            value: 1,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                First
                                                            </button>
                                                            <button
                                                                className={classnames({
                                                                    active: player1.order == 2,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player1.order',
                                                                            value: 2,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Second
                                                            </button>
                                                            <button
                                                                className={classnames({
                                                                    active:
                                                                        player1.order != 1 &&
                                                                        player1.order != 2,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player1.order',
                                                                            value: 0,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                None
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className={classnames({
                                                                    active: player2.order == 1,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player2.order',
                                                                            value: 1,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                First
                                                            </button>
                                                            <button
                                                                className={classnames({
                                                                    active: player2.order == 2,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player2.order',
                                                                            value: 2,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Second
                                                            </button>
                                                            <button
                                                                className={classnames({
                                                                    active:
                                                                        player2.order != 1 &&
                                                                        player2.order != 2,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player2.order',
                                                                            value: 0,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                None
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button
                                                                className={classnames({
                                                                    on: player1.veteran,
                                                                    off: !player1.veteran,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player1.veteran',
                                                                            boolValue: !player1.veteran,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Veteran{' '}
                                                                {player1.veteran ? 'on' : 'off'}
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className={classnames({
                                                                    on: player2.veteran,
                                                                    off: !player2.veteran,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player2.veteran',
                                                                            boolValue: !player2.veteran,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Veteran{' '}
                                                                {player2.veteran ? 'on' : 'off'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <button
                                                                className={classnames({
                                                                    on: player1.ready,
                                                                    off: !player1.ready,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player1.ready',
                                                                            boolValue: !player1.ready,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Ready {player1.ready ? 'on' : 'off'}
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className={classnames({
                                                                    on: player2.ready,
                                                                    off: !player2.ready,
                                                                })}
                                                                onClick={e =>
                                                                    updateGame({
                                                                        variables: {
                                                                            path: 'player2.ready',
                                                                            boolValue: !player2.ready,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Ready {player2.ready ? 'on' : 'off'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                }
                            }}
                        </Subscription>
                    )}
                </Mutation>
            </div>
        </ApolloProvider>
    );
}
