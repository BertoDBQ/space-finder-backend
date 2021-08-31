# install

- `https://aws.amazon.com/cli/`
- download and install

# github

- `https://github.com/aws/aws-cli/tree/v2`

# commands

- `complete -C aws_completer aws`
  - Enables tab completion for bash (only need to do once)
- `aws --version`
  - verifies version of the aws cli
- `aws configure`
  - to configure cli
- `aws configure list`
  - show current configuration values
- ` aws iam list-users`
  - list iam users
- `aws s3 ls`
  - list s3 buckets
- `aws sts get-caller-identity`
  - gets the identity of the caller (set during configure)
- aws cognito-idp admin-set-user-password --user-pool-id us-east-2_U9aFQYzW2 --username BertoDBQ --password "it
  bgcR&R85!" --permanent - to make aws cognito username enable and not have to validate a password on first entry (section 46)
