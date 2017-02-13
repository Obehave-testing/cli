# Why
* The Obehave CLI enables you to run all your tests defined in [Obehave app](https://app.obehave.io) against any url you specify. 
* This is useful during development (say you want to run tests against localhost to debug your app), and for calling Obehave against your server when it's running from Continuous Deployment services.

# How
* The Obehave CLI opens a tunnel into the computer its called on to expose any server of your choosing to Obehave.

# Requirements
* [NodeJs](https://nodejs.org/en/download/)
* NPM (comes with node)

# Installation
`npm install obehave --save --global`

# Usage
1. Get your API key from [Obehave](https://app.obehave.io/settings/api-settings)
1. Do one of: 
   * Set the environment variable `OBEHAVE_APIKEY` equal to your key, or
   * Pass the key each time you use the tool (e.g. `obehave test --api-key <your-api-key>`)
1. Run your tests: `obehave test`. 
   * This will run your tests defined in the [Obehave app](https://app.obehave.io) against `http://localhost:80` on your machine.
   * You can specify a different 
       * port: `obehave test --port 4200` (tests `http://localhost:4200`)
       * host: `obehave test --host example.com`  (tests `http://example.com:80`)
   * Or use https instead of http: `obehave test --secure` (tests `https://localhost:80`)
   
# Examples
See examples of the CLI in the following articles:
* [Integrating CircleCI with Obehave](https://blog.obehave.io/integrations-obehave-and-circleci-30046588d3fd)
* [Integrating DeployHQ with Obehave](https://blog.obehave.io/integrating-obehave-deployhq-e7fb3ca7560f)
* Example output:

                
        Owens-MBP:obehave-deployhq-example owen$ obehave test --port 3000
        Waiting up to 60s for 'http://localhost:3000' to become available
        Connected to 'http://localhost:3000'
        Created ngrok proxy:  https://7552aa81.ngrok.io
        Created Obehave job with id: e7200130-8855-4988-ad29-b74c115d7f01
        Obehave job 'e7200130-8855-4988-ad29-b74c115d7f01' has status 'STARTED'
        Obehave job 'e7200130-8855-4988-ad29-b74c115d7f01' has status 'STARTED'
        Obehave job 'e7200130-8855-4988-ad29-b74c115d7f01' has status 'STARTED'
        Obehave job 'e7200130-8855-4988-ad29-b74c115d7f01' has status 'STARTED'
        Obehave job 'e7200130-8855-4988-ad29-b74c115d7f01' has status 'STARTED'
        Obehave job 'e7200130-8855-4988-ad29-b74c115d7f01' has status 'STARTED'
        Obehave job 'e7200130-8855-4988-ad29-b74c115d7f01' has status 'FINISHED'
        Owens-MBP:obehave-deployhq-example owen$ 