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
  demand: true,
  alias: 'd',
  default: config.defaults.dir,
};
const modifyOptions = {
  type: 'boolean',
  describe: 'Flag for modifying existing notes',
  demand: false,
  alias: 'm',
  default: true,
}

const argv = yargs
  .command('publish', 'publish a folder or .txt file', {
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
  if (!argv.dir) {
    return console.log('No default directory found. Add a default directory with "node postnote.js addDir (dir)"');
  }

  // TODO Add User
  post.publishNotes(argv.dir).then((response) => {
    console.log(response);
  });
} else if (command === 'addUser') {
  if (!argv.user) return console.log('arg user required.');
  config.addUser(argv.user);
} else if (command === 'addDir') {
  // TODO addDir should not work without dir specified.
  if (argv.dir === config.defaults.dir) {
    return console.log(`The directory "${argv.dir}" is already the default directory.`);
  } else {
    return config.addDir(argv.dir);
  }
} else if (command === undefined) {
  console.log('TODO // Implement Default Command');
} else {
  console.log(`Command "${command}" not recognized.`);
}
