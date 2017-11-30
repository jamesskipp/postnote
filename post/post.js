const axios = require('axios');

const note = require('../note/note');

const pushNote = (path, callback) => {
  var title, body, stats;
  const postRoute = '';

  note.getTitle(path)
  .then((titleResult) => {
    title = titleResult;

    return note.getBody(path)
  }).then((bodyResult) => {
    body = bodyResult;

    return note.getStats(path)
  }).then((statsResult) => {
    stats = statsResult;
    message = { title, body, stats };

    return axios.post(postRoute)
  }).then((res) => {
    console.log(res);
  }).catch((err) => { throw err });
};

module.exports = { pushNote };
