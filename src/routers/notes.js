const express = require('express');
const logger = require('../../config/winston');
const Note = require('../models/note');

const router = new express.Router();

router.post('/notes', (req, res) => {
  const note = new Note(req.body);
  note.save().then(() => {
    res.send(note);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

router.get('/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.send(notes);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

router.get('/notes/title/:title', (req, res) => {
  const input = req.params.title;
  logger.debug(req.params);
  // eslint-disable-next-line prefer-template
  Note.find({ title: { $regex: '.*' + input + '.*' } }).limit(5).then((notes) => {
    res.send(notes);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

module.exports = router;