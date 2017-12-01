const yargs = require('yargs');
const _ = require('lodash');

const post = require('./post/post');
const config = require('./config/config.js');

const pathOptions = {
  type: 'string',
  describe: 'Path to a file',
  demand: false,
  alias: 'p',
};
const userOptions = {
  type: 'string',
  describe: 'The default username',
  demand: false,
  alias: 'u',
  default: config.defaults.user,
};
const dirOptions = {
  type: 'string',
  describe: 'The default directory',
  demand: false,
  alias: 'd',
  default: config.defaults.dir,
}

const argv = yargs
  .command('publish', 'publish a folder or .txt file', {
    path: pathOptions,
    user: userOptions,
    dir: dirOptions,
  })
  .command('addUser', 'Add a default user', {
    user: userOptions,
  })
  .command('addDir', 'Add a default directory', {
    dir: dirOptions,
  })
  .help()
  .argv;

var command = argv._[0];

if (command === 'publish') {
  if (!argv.path && !argv.dir) {
    return console.log('No default directory found. Add a default directory with "node postnote.js addDir (dir)"');
  }
  if (!argv.user) {
    return console.log('No default user found. Add a default user with "node postnote.js addUser (user)"');
  }

  post.publishNotes(argv.path, argv.dir, argv.user, (message) => {
    console.log(message);
  });
} else if (command === 'addUser') {
  if (!argv.user) return console.log('arg user required.');
  config.addUser(argv.user);
} else if (command === 'addDir') {
  config.addDir(argv.dir);
} else if (command === undefined) {
  console.log('TODO // Implement Default Command');
} else {
  console.log(`Command "${command}" not recognized.`);
}
