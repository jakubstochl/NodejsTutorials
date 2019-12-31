
const dbHandler = require('./db-handler');
const Note = require('../src/models/note');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Note test suite.
 */
describe('note', () => {
    test('should be created correcty', () => {
        const note = new Note(noteComplete);
        expect(note.save())
            .resolves
            .not
            .toThrow();
    });
    
});

/**
 * Complete note example.
 */
const noteComplete = {
    title: 'testNote1',
    test: 'Correct test note for basic unit test'
};