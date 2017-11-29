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

const command = argv._[0];

if (command === 'push') {
  console.log(argv.path);
  post.pushNote(argv.path);
}
