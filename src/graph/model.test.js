import {
    fetchQuest,
    getInitialState,
    validateGame,
    hideTestCode,
    saveGame,
    getOrder,
    getRandomInt,
    MAX_QUESTS,
} from './resolvers';

const quest = {
    desc: `Fix me`,
    code: `function plus(a, b) {}
    function minus(a, b) {}`,
    tests: [
        {title: 'plus(1, 1) => 2', code: 'equal(plus(1, 1), 2)'},
        {title: 'minus(2, 1) => 1', code: 'equal(minus(2, 1), 1)'},
    ],
};

test('fetch quest data', () => {
    expect(quest.desc).toBeDefined();
    expect(quest.code).toBeDefined();
    expect(quest.tests).toBeDefined();
});

const initialState = getInitialState(quest);

test('initial state and validations', () => {
    expect(initialState.desc).toBeDefined();
    expect(initialState.code).toBeDefined();

    const testPlayer = player => {
        expect(player.code).toBeDefined();
        expect(player.valid).toBe(true);
        expect(player.testsResults.filter(res => res.passed).length).toEqual(0);
        expect(player.errors).toEqual([]);
    };

    testPlayer(initialState.player1);
    testPlayer(initialState.player2);
});

test('Invalid code', () => {
    initialState.player1.code = 'a';
    const game = validateGame(initialState);
    expect(game.player1.valid).toBe(false);
    expect(game.player1.errors.length).toEqual(1);
});

test('Pass tests', () => {
    initialState.player1.code =
        'function plus(a, b) {return a + b;};function minus(a, b) {return a + b;}';
    const game = validateGame(initialState);
    expect(game.player1.valid).toBe(true);
    expect(game.player1.testsResults.filter(res => res).length).toEqual(2);
    expect(game.player1.errors.length).toEqual(0);
});

test('Test all quest code validity', () => {
    for (let i = 1; i < MAX_QUESTS + 1; i++) {
        const game = hideTestCode(saveGame(validateGame(getInitialState(fetchQuest(i)))));
        expect(game.player1.valid).toBe(true);
    }
});

test('Winner player', () => {
    expect(
        getOrder(
            {
                testScore: 0,
                testScoreOf: 12,
            },
            {}
        )
    ).toBe(undefined);
    expect(
        getOrder(
            {
                testScore: 12,
                testScoreOf: 12,
            },
            {}
        )
    ).toBe(1);
    expect(
        getOrder(
            {
                testScore: 12,
                testScoreOf: 12,
            },
            {
                order: 1,
            }
        )
    ).toBe(2);
});

test('Random number', () => {
    let y = 0;
    for (let i = 0; i < 3000; i++) {
        const x = getRandomInt(1, 9, 5);
        y += x;
        expect(x).toBeLessThan(10);
        expect(x).toBeGreaterThan(0);
        expect(x).not.toBe(5);
    }
    expect(Math.round(y / 3000)).toBe(5);
});

test('New quest is not repeated', () => {
    let lastQuestId = -1;
    for (let i = 0; i < 300; i++) {
        const game = hideTestCode(saveGame(validateGame(getInitialState())));
        expect(lastQuestId).not.toBe(game.questId);
        lastQuestId = game.questId;
    }
});
