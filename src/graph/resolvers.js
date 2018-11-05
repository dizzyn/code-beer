import {find, filter, identity, isEqual, toString} from 'lodash';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
import toml from 'toml';
import {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql';
import {PubSub} from 'graphql-subscriptions';
import NodeCache from 'node-cache';
import {VM} from 'vm2';
import vm from 'vm';
import {setWith} from 'lodash';
import crypto from 'crypto';
import {comment} from 'postcss';
import fs from 'fs';
import {FetchType} from 'apollo-boost';

const memoryCache = new NodeCache();
const pubsub = new PubSub();
const GAME_CHANGED = 'game-changed';

export const MAX_QUESTS = 12;

export const logPlayerData = (email, key, content) => {
    if (!email || email == '') return;

    const hash = crypto
        .createHash('md5')
        .update(email)
        .digest('hex');

    fs.appendFile('PLAYERS/' + hash + '.txt', '\n\n-------- ' + key + '\n' + content, function(
        err
    ) {
        if (err) {
            return console.log(err);
        }

        console.log('...saved!');
    });
};

export const fetchQuest = number => {
    const fileName = '../../quests/' + String(number).padStart(2, '0') + '.js';
    const quest = require(fileName);
    return {
        desc: '',
        code: '',
        tests: [],
        id: number,
        ...quest,
    };
};

export const hideTestCode = game => {
    return {
        ...game,
        tests: [...(game.tests || []).map(({code, title}) => title)],
    };
};

export const validateQuest = (tests, code) => {
    const testsResults = [];
    let errors = [];
    let valid = true;
    let errorLine = null;

    const sandbox = {
        equal: (a, b) => {
            testsResults.push({
                passed: isEqual(a, b),
                received: toString(a),
            });
        },
        equalAnycase: (a, b) => {
            testsResults.push({
                passed: isEqual(toString(a).toLowerCase(), toString(b).toLowerCase()),
                received: toString(a),
            });
        },
    };

    try {
        new vm.Script(code, {displayErrors: true, timeout: 1000, filename: ''});
    } catch (error) {
        errorLine = error.stack ? error.stack.split('\n')[0].substr(1) : '';
        errors = [error.message + (errorLine ? ` at line ${errorLine}` : '')];
        valid = false;
    }

    if (valid) {
        const vm = new VM({timeout: 1000, sandbox});
        try {
            const codeToRun = code + ';' + tests.map(test => test.code).join(';');
            vm.run(codeToRun);
        } catch (error) {
            errors = [error.message];
            valid = false;
        }
    }

    return {
        valid,
        testsResults,
        testScore: testsResults.filter(x => x.passed).length,
        testScoreOf: tests.length,
        errors,
        errorLine,
    };
};

export const getOrder = (player, oponent) => {
    if (!player.order && player.testScore === player.testScoreOf) {
        return oponent.order == 1 ? 2 : 1;
    }
    return player.order;
};

export const validateGame = game => {
    const temp = {
        ...game,
        player1: {
            ...game.player1,
            ...validateQuest(game.tests, game.player1.code),
        },
        player2: {
            ...game.player2,
            ...validateQuest(game.tests, game.player2.code),
        },
    };

    return {
        ...temp,
        player1: {
            ...temp.player1,
            order: getOrder(temp.player1, temp.player2),
        },
        player2: {
            ...temp.player2,
            order: getOrder(temp.player2, temp.player1),
        },
    };
};

// export const getRandomInt = () => Math.floor(Math.random() * MAX_QUESTS) + 1;
// export const getRandomInt = () => 7;
export const getRandomInt = (min, max, exclude = -1) => {
    let rtn = Math.floor(Math.random() * (max - min + 1)) + min;
    return rtn === exclude ? getRandomInt(min, max, exclude) : rtn;
};

export const newQuest = () => {
    const game = memoryCache.get('game');
    const quest = fetchQuest(getRandomInt(1, MAX_QUESTS, game && game.questId));
    console.log('new QUEST', quest.id);
    return quest;
};

export const getInitialState = (quest = newQuest()) => {
    return validateGame({
        desc: quest.desc,
        code: quest.code,
        tests: quest.tests,
        questId: quest.id,
        player1: {
            code: quest.code,
            ready: false,
        },
        player2: {
            code: quest.code,
            ready: false,
        },
    });
};

export const loadGame = () => {
    const game = memoryCache.get('game');
    if (game) {
        return game;
    } else {
        return saveGame(getInitialState());
    }
};

export const saveGame = game => {
    memoryCache.set('game', game);
    return game;
};

export default {
    Query: {
        game: _ => loadGame(),
        quest: _ => {
            const quests = [];
            for (let i = 1; i < MAX_QUESTS + 1; i++) {
                quests.push({
                    ...fetchQuest(i),
                });
            }

            return quests;
        },
    },

    Mutation: {
        resetGame: (_, {questId}) => {
            const game = loadGame();
            if (game) {
                logPlayerData(
                    game.player1.email,
                    'END',
                    `Order: ${game.player1.order}
                    \n${game.player1.code}`
                );

                logPlayerData(
                    game.player2.email,
                    'END',
                    `Order: ${game.player2.order}
                    \n${game.player2.code}`
                );
            }
            const newGame = hideTestCode(
                saveGame(validateGame(getInitialState(questId && fetchQuest(questId))))
            );
            pubsub.publish(GAME_CHANGED, newGame);
            return newGame;
        },
        updateGame: (_, {path, value, boolValue}) => {
            const game = loadGame();
            setWith(game, path, value ? value : boolValue);
            const newGame = hideTestCode(
                saveGame(
                    validateGame({
                        ...game,
                    })
                )
            );
            pubsub.publish(GAME_CHANGED, newGame);

            console.log(path, value, boolValue);

            if (path === 'player1.email') {
                logPlayerData(
                    game.player1.email,
                    'START',
                    `${game.player1.email}, Name: ${game.player1.name}${
                        game.player1.veteran ? ', Veteran' : ''
                    }`
                );
            } else if (path === 'player2.email') {
                logPlayerData(
                    game.player2.email,
                    'START',
                    `${game.player2.email}, Name: ${game.player2.name}${
                        game.player2.veteran ? ', Veteran' : ''
                    }`
                );
            }

            return newGame;
        },
        updateCode: (_, {playerId, code}) => {
            const game = loadGame();
            const newGame = hideTestCode(
                saveGame(
                    validateGame({
                        ...game,
                        [`player${playerId}`]: {
                            ...game[`player${playerId}`],
                            code,
                        },
                    })
                )
            );

            pubsub.publish(GAME_CHANGED, newGame);
            return newGame;
        },
    },

    Subscription: {
        gameChanged: {
            subscribe: () => {
                const game = hideTestCode(loadGame());
                const iter = pubsub.asyncIterator(GAME_CHANGED);
                pubsub.publish(GAME_CHANGED, game);
                return iter;
            },
            resolve: identity,
        },
    },
};
