import {makeExecutableSchema, addMockFunctionsToSchema, mockServer} from 'graphql-tools';
import {graphql} from 'graphql';
import typeDefs from './schema';

const cases = [
    {
        id: 'Get Game',
        query: `
      query {
        game {
           desc,
           code
        }
      }
    `,
        variables: {},
        context: {},
        expected: {data: {game: {desc: 'Hello', code: 'Hello'}}},
    },
];

describe('Schema', () => {
    const mockSchema = makeExecutableSchema({typeDefs});

    // Here we specify the return payloads of mocked types
    addMockFunctionsToSchema({
        schema: mockSchema,
        mocks: {
            Boolean: () => false,
            ID: () => '1',
            Int: () => 1,
            Float: () => 12.34,
            String: () => 'Hello',
        },
    });

    test('has valid type definitions', async () => {
        expect(async () => {
            const MockServer = mockServer(typeDefs);

            await MockServer.query(`{ __schema { types { desc } } }`);
        }).not.toThrow();
    });

    cases.forEach(obj => {
        const {id, query, variables, context: ctx, expected} = obj;

        test(`query: ${id}`, async () => {
            return await expect(
                graphql(mockSchema, query, null, {ctx}, variables)
            ).resolves.toEqual(expected);
        });
    });
});
