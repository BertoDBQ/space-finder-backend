# install

- `npm i -g aws-cdk`
- aws cdk version 2 is currently in release canidate
- with release 2 don't think you need aws-cdk instead you just need aws-cdk-lib

# github

`https://github.com/aws/aws-cdk`

# commands

- `cdk --version`
  - checks current version
- `cdk init app --language typescript`
  - initialize/ create typescript application
  - `https://docs.aws.amazon.com/cdk/latest/guide/cli.html`
- `cdk synth`
  - generate cloud formation template used by aws
  - creates cdk.out folder
  - should be done before cdk bootstrap
- `cdk bootstrap`
  - bootstraps the project (only do once)
  - creates a cloudformation stack within your account
- `cdk bootstrap -v`
  - bootstrap verbose (gives detailed info)
- `cdk bootstrap --toolkit-stack-name custom-cdktoolkit -v`
  - create a custom cloudfront stackname of custom-cdktookkit
- `cdk deploy`
  - deploys the cdk stack
- `cdk deploy all`
  - deploys all cdk stacks
- `cdk deploy --parameters <param Name>=<value>`
  ` deploy with a parameter
- `cdk destroy <stack name>`
  - removes stacks (same as goig online and Delete of s3 bucket)
- `cdk diff`
  - displays differences from local stacks (from cdk.out templates) to what is deployed
- `cdk doctor`
  - tells you if there are problems in your stacks
- `cdk ls` OR `cdk list`
  - List the stacks in your app

# typescript

- `npm install -g typescript`
  - install typescript globally
- `npm update -g typescript`
  - update to latest version
- `tsc -v`
  - get typescript version

# node / npm

- ` npm update -g`
  - to update npm to latest version
