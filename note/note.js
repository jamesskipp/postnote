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

module.exports = { getTitle, getBody };
