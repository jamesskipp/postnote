const yargs = require('yargs');
const _ = require('lodash');

const post = require('./post/post');

const pathOptions = {
  describe: 'Path to a file',
  demand: true,
  alias: 'p',
};

const argv = yargs
  .command('push', 'Push a folder or .txt file', {
    path: pathOptions,
  })
  .help()
  .argv;

var command = argv._[0];

if (command === 'push') {
  post.pushNote(argv.path, (message) => {
    console.log(message);
  });
} else {
  console.log(`Command "${command}" not recognized.`);
}
