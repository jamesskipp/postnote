const fs = require('fs');

var defaults = {};

try {
  defaults = JSON.parse(fs.readFileSync('./config/config.json'));
} catch (err) {
  if (err.name === 'SyntaxError') {
    throw {
      name: 'SyntaxError',
      message: 'Unable to read config.json',
    }
  } else if (err.code === 'ENOENT') {
    const defConfig = {
      user: null,
      dir: './notes/',
      url: null,
    }
    console.log('No config.json file found. Generating one.');
    fs.appendFileSync('./config/config.json', JSON.stringify(defConfig));
    defaults = defConfig;
  } else {
    throw err;
  }
}

const addUser = (user) => {
  try {
    let config = JSON.parse(fs.readFileSync('./config/config.json'));
    config.user = user;
    fs.writeFileSync('./config/config.json', JSON.stringify(config));
    console.log('Succesfully added user ', user);
  } catch (err) {
    console.log('Error Adding User: ', err);
  }
}

const addDir = (dir) => {
  try {
    let config = JSON.parse(fs.readFileSync('./config/config.json'));
    config.dir = dir;
    fs.writeFileSync('./config/config.json', JSON.stringify(config));
    console.log('Successfully added dir ', dir);
  } catch (err) {
    console.log('Error Adding Dir: ', err);
  }
}

module.exports = { defaults, addUser, addDir };
