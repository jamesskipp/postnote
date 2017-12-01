const fs = require('fs');
const path = require('path');

const _ = require('lodash');

const getTitle = (notePath) => {
  return new Promise((resolve, reject) => {
    fs.access(notePath, (err) => {
      if (err) {
        reject(err);
      }

      var title = path.basename(notePath, '.txt');
      resolve(title.replace(/_/g, ' '));
    });
  });
};

const getBody = (notePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(notePath, 'utf8', (err, data) => {
      if (err) reject(err);
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
      });
    });
  });
};

const getNote = (notePath) => {
  return new Promise ((resolve, reject) => {
    let title, body, stats;

    getTitle(path)
    .then((titleResult) => {
      title = titleResult;

      return getBody(path);
    }).then((bodyResult) => {
      body = bodyResult;

      return getStats(path);
    }).then((statsResult) => {
      stats = statsResult;
      message = { title, body, stats };

      resolve(message);
    }).catch((err) => reject(err));
  });
};


module.exports = {
  getTitle,
  getBody,
  getStats,
  getNote,
};
