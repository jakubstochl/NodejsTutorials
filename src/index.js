/* eslint-disable no-console */
const express = require('express');
require('./db/mongoose');
const Note = require('./models/note');

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/notes', (req, res) => {
  const note = new Note(req.body);
  note.save().then(() => {
    res.send(note);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.get('/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.send(notes);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

app.get('/notes/title/:title', (req, res) => {
  const input = req.params.title;
  console.log(req.params);
  // eslint-disable-next-line prefer-template
  Note.find({ title: { $regex: '.*' + input + '.*' } }).limit(5).then((notes) => {
    res.send(notes);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

app.listen(port, () => {
  console.log('Server running on port ', port);
});
