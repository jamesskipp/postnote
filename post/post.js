const axios = require('axios');
const _ = require('lodash');

const note = require('../note/note');

const apiPath = 'http://localhost:3000';


const publishNotes = async (dir) => {
  try {
    // Get the notes out of the folder
    const notes = await note.fetchNotes(dir);
    console.log('Folder Notes: ', notes);

    // Get the notes out of the database
    const getRes = await axios.get(apiPath + '/notes');
    const dbNotes = getRes.data.notes;
    console.log('Database Notes: ', dbNotes);

    // New Array is the difference of the folder notes and database notes
    const newNotes = _.differenceWith(notes, dbNotes, (x, y) => x.title === y.title);
    console.log('Difference: ', newNotes);

    // Send a post request for each in the difference array
    await Promise.all(newNotes.map((currNote) => {
      return axios.post(apiPath + '/notes', {
        title: currNote.title,
        body: currNote.body,
      });
    }));

    return 'finished';
  } catch (err) {
    console.log(err);
    return 'Finished with error';
  }
};

module.exports = { publishNotes };
