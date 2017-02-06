const path = require('path');
const ngrok = require('ngrok');
const job = require('./job');
const waitOn = require('wait-on');

function test(apiKey, protocol, domain, port) {
    if (!apiKey) {
        throw("You must set an api key variable, either by setting as an environment variable or by passing in the `--api-key` parameter.");
    }

    if (!port) {
        port = 80;
        console.warn(`No port cli or environment variable specified, defaulting to ${port}`);
    }

    if (!domain) {
        domain = 'localhost';
    }

    const target = `${protocol}://${domain}:${port}`;

    console.log(`Waiting up to 60s for '${target}' to become available`);
    waitOn({resources: [target], interval: 1000, timeout: 60000}, err => {
        if (err) {
            throw(`Unable to connect to '${target}'`)
        }

        console.log(`Connected to '${target}'`);

        ngrok.connect({
            proto: 'http',
            addr: port
        }, test);
    });


    function test(err, url) {
        if (err) {
            throw(`Failed to create the ngrok proxy: ${JSON.stringify(err)}`);
        }

        console.log('Created ngrok proxy: ', url);

        job.create(url, apiKey, (err, jobId) => {
            console.log(`Created Obehave job with id: ${jobId}`);

            setInterval(() => job.status(jobId, apiKey, (err, status) => {
                console.log(`Obehave job '${jobId}' has status '${status}'`);

                if (status === 'FINISHED') {
                    process.exit(0)
                }
                if (status === 'FAILED') {
                    console.error(`To view details, go to 'https://app.obehave.io/detail/${jobId}'.`);
                    process.exit(1);
                }
            }), 5000)
        })
    }
}

module.exports = test;