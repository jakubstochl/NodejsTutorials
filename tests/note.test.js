
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
    it('create & save note successfully', async () => {
        const validNote = new Note(noteComplete);
        const savedNote = await validNote.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedNote._id).toBeDefined();
        expect(savedNote.title).toBe(noteComplete.title);
        expect(savedNote.text).toBe(noteComplete.text);
    });
    it('insert note successfully, but the field does not defined in schema should be undefined', async () => {
            const noteInvalidStructure = new Note({ id: 'SecondTest', text: 'Unit test 2', badField: 'should be undefined' });
            const savedNoteInvalidStructure = await noteInvalidStructure.save();
            expect(savedNoteInvalidStructure._id).toBeDefined();
            expect(savedNoteInvalidStructure.badField).toBeUndefined();
    });
});

/**
 * Complete note example.
 */
const noteComplete = {
    title: 'testNote1',
    test: 'Correct test note for basic unit test'
};