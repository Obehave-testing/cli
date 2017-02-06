#!/usr/bin/env node
var test = require('./test');
var program = require('commander');
var helpers = require('./helpers');

// Hide ugly stack traces from the user.
process.on('uncaughtException', err => {
    console.log(`\n${err}\n`);
    process.exit(1)
});

program
    .version(require('./package.json').version);


program
    .command('test')
    .description('run your obehave test suite')
    .option('-k, --api-key <string>', 'API key, see https://app.obehave.io/settings/api')
    .option('-s, --secure', 'if your server uses https (defaults to http)')
    .option('-h, --host <string>', 'host your server runs on (defaults to "localhost")')
    .option('-p, --port <integer>', 'port your server runs on (detaults to "80")', helpers.tryParseInt)
    .action(function (options) {
        let port = options.port || process.env.OBEHAVE_PORT;
        let apiKey = options.apiKey || process.env.OBEHAVE_APIKEY;
        let host = options.host || process.env.OBEHAVE_HOST;
        let protocol = (options.secure || process.env.secure) ? 'https' : 'http';
        return test(apiKey, protocol, host, port);
    });

program.parse(process.argv);

// If some arguments haven't been consumed then the user has done something wrong.
if (program.args.length === 0) {
    return program.help();
}