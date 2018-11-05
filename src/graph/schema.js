export default `
  type TestResult {
    passed: Boolean
    received: String
  }

  type Quest {
    id: Int
    desc: String
    code: String
  }

  type Player {
    code: String
    name: String
    valid: Boolean
    veteran: Boolean
    ready: Boolean
    order: Int
    testsResults: [TestResult]
    testScore: Int
    testScoreOf: Int    
    errors: [String]
    errorLine: Int
  }

  type Game {
    desc: String
    code: String
    started: Int
    questId: String
    tests: [String]
    player1: Player
    player2: Player
  }

  type Query {
    game: Game
    quest: [Quest]
  }
  
  type Mutation {
    resetGame(questId: Int): Game
    updateGame(path: String, value: String, boolValue: Boolean): Game
    updateCode(playerId: String, code: String): Game
  }

  type Subscription {
    gameChanged: Game
  }
`;
