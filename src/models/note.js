const mongoose = require('mongoose');

const Note = mongoose.model('Note', {
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});

module.exports = Note;
