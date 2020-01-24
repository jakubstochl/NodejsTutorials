const express = require('express');
const logger = require('@lib/logger');
const error = require('@lib/error');
const notes = require('@components/notes');

const router = new express.Router();

router.post('/note', (req, res) => {
  const note = new notes.Note(req.body);
  note.save().then(() => {
    res.send(note);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

router.get('/notes', (req, res) => {
  notes.Note.find({}).then((notes) => {
    res.send(notes);
  }).catch((error) => {
    throw new error.ErrorHandler(500, error);
  });
});

router.get('/note/title/:title', (req, res) => {
  const input = req.params.title;
  logger.winston.debug(req.params);
  // eslint-disable-next-line prefer-template
  notes.Note.find({ title: { $regex: '.*' + input + '.*' } }).limit(5).then((notes) => {
    res.send(notes);
  }).catch((error) => {
    throw new error.ErrorHandler(500, error);
  });
});

// Test error return
router.get('/error', () => {
  throw new error.ErrorHandler(500, 'Internal server error');
})

module.exports = router;