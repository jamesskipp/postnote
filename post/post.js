const axios = require('axios');

const note = require('../note/note');

const publishNotes = (path, dir, user) => {
  return new Promise((resolve, reject) => {

    note.fetchNotes(dir).then((notes) => {
      console.log(notes);
    });
  });
};

module.exports = { publishNotes };
