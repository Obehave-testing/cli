const request = require('request');
// Set `OBEHAVE_API` as an environment variable for local development.
const api = process.env.OBEHAVE_API || 'https://www.app.obehave.io/api/v1';
const url = api + '/jobs';

/**
 * Creates an OBehave job.
 *
 * @param target {String} url of the environment to test.
 * @param apiKey {String} api key for the project.
 * @param callback {Function} called once the job is created or fails.
 */
function create(target, apiKey, callback) {
    request.post({
        headers: {
            'Authorization': `bearer ${apiKey}`
        },
        url: this.url,
        json: {target}
    }, (err, response, body) => {

        if (err) {
            throw('Failed to create job:' + err);
        }

        // GET requests require manual JSON parsing, POST requests do not.
        if (response.statusCode === 401 || response.statusCode === 403) {
            throw(`Access denied, invalid API key, HTTP error code ${response.statusCode}`)
        }

        if (response.statusCode === 400) {
            const hasError = (response.body && response.body.error);
            const message = hasError ? response.body.error : '';
            throw(`Failed to create job due to bad request. ${message}`)
        }

        if (response.statusCode !== 200) {
            throw(`Failed to create job, HTTP error code ${response.statusCode}`)
        }

        if (!body) {
            throw('Failed to create job, no body returned');
        }

        if (!body.jobId) {
            throw('Failed to create job, no jobId returned');

        }

        callback(err, body.jobId);
    });
}
/**
 * Returns the status of an OBehave job.
 *
 * @param jobId {String}
 * @param apiKey
 * @param callback
 */
function status(jobId, apiKey, callback) {
    request.get({
        headers: {
            'Authorization': `bearer ${apiKey}`
        },
        url: `${this.url}/${jobId}`
    }, (err, response, body) => {

        if (response.statusCode === 401 || response.statusCode === 403) {
            throw(`Access denied, invalid API key, HTTP error code ${response.statusCode}`)
        }

        if (response.statusCode === 400) {
            const hasError = (response.body && response.body.error);
            const message = hasError ? response.body.error : '';
            throw(`Failed to create job due to bad request. ${message}`)
        }

        if (response.statusCode !== 200) {
            throw(`Failed to read job, HTTP error code ${response.statusCode}`)
        }

        if (!body) {
            throw('Failed to read job, no body returned');
        }

        if (!isJsonString(body)) {
            throw('Failed to read job, body is not valid json')
        }

        // GET requests require manual JSON parsing, POST requests do not.
        const parsed = JSON.parse(body);
        if (!parsed.status) {
            throw('Failed to read job, no status returned');
        }

        if (err) {
            throw('Failed to read job');
        }
        callback(err, parsed.status);
    })
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = {url, create, status};