const axios = require('axios');

const note = require('../note/note');

const publishNotes = (path, dir, user, callback) => {
  return new Promise((resolve, reject) => {
    // TODO call to the proper note function - whether that is for each
    // note in the path + dir, or to a new function in note like getNotes
    // that will make that decision and return an array of notes.
  });
};

module.exports = { publishNotes };
