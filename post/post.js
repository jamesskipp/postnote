const note = require('../note/note');

const pushNote = (path) => {
  var message= {};

  note.getTitle(path).then((title) => {
    message = { title }
    console.log(message);
  }).catch((err) => new Error(err));

    // message = {
    //   title: note.getTitle(path),
    //   body: note.getBody(path),
    //   createdAt: note.getTime(path),
    // };

    // console.log(message);
};

module.exports = { pushNote };
