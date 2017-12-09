const fs = require('fs');
const path = require('path');

const _ = require('lodash');

// const getTitle = (notePath) => {
//   return new Promise((resolve, reject) => {
//     fs.access(notePath, (err) => {
//       if (err) {
//         reject(err);
//       }
//
//       console.log('Title: ', title);
//       var title = path.parse(notePath).name;
//       resolve(title.replace(/_/g, ' '));
//     });
//   });
// };

const getTitle = async (notePath) => {
  try {
    await fs.access(notePath, () => {});
    let title = path.parse(notePath).name;
    if (title) {
      console.log('Title', title);
      title = title.replace(/_/g, ' ');
      console.log('Replaced');
      return title;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
  }
};

const getBody = (notePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(notePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'EISDIR') {
          resolve('');
        } else {
          throw err;
        }
      }

      resolve(data);
    });
  });
};

const getStats = (notePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(notePath, (err, stats) => {
      if (err) reject(err);
      resolve({
        btime: stats.birthtimeMs,
        mtime: stats.mtimeMs,
        isFile: stats.isFile(),
        isDir: stats.isDirectory(),
      });
    });
  });
};

const getNote = (notePath) => {
  return new Promise ((resolve, reject) => {
    let title, body, stats;

    getTitle(notePath)
    .then((titleResult) => {
      title = titleResult;

      return getBody(notePath);
    }).then((bodyResult) => {
      body = bodyResult;

      return getStats(notePath);
    }).then((statsResult) => {
      stats = statsResult;
      message = { title, body, stats };

      resolve(message);
    }).catch((err) => reject(err));
  });
};

const fetchNotes = (notesPath) => {
  return new Promise ((resolve, reject) => {
    let notes = [];
    getNote(notesPath)
    .then((noteFile) => {
      if (noteFile.stats.isDir) {
        fs.readdir(notesPath, (err, files) => {
          files = files.map(i => notesPath + '/' + i);
          Promise.all((files).map(fetchNotes)).then((newNotes) => {
            newNotes = [].concat.apply([], newNotes);
            notes = notes.concat(newNotes);
            return resolve(notes);
          }).catch((err) => console.log(err));
        });
      } else if (noteFile.stats.isFile) {
        return resolve(noteFile);
      } else {
        return resolve();
      }
    }).catch((err) => console.log(err));
  });
};

module.exports = {
  getTitle,
  getBody,
  getStats,
  getNote,
  fetchNotes,
};
