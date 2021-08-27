import { Stack, StackProps } from 'aws-cdk-lib';
import {
  AuthorizationType,
  LambdaIntegration,
  MethodOptions,
  RestApi,
} from 'aws-cdk-lib/lib/aws-apigateway';
import { PolicyStatement } from 'aws-cdk-lib/lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { join } from 'path';
import { AuthorizerWrapper } from './auth/AuthorizerWrapper';
import { GenericTable } from './GenericTable';

export class SpaceStack extends Stack {
  private api = new RestApi(this, 'SpaceApi');
  private authorizier: AuthorizerWrapper;

  private spacesTable = new GenericTable(this, {
    tableName: 'Spaces',
    primaryKey: 'SpaceID',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
    updateLambdaPath: 'Update',
    deleteLambdaPath: 'Delete',
    secondaryIndexes: ['location'],
  });

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    this.authorizier = new AuthorizerWrapper(this, this.api);

    const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
      entry: join(__dirname, '..', 'services', 'node-lambda', 'hello.ts'),
      handler: 'handler',
    });

    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*');
    helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

    const optionsWithAuthorizer: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: this.authorizier.authorizer.authorizerId,
      },
    };

    // Hello API lambda integration
    const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodeJs);
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod(
      'GET',
      helloLambdaIntegration,
      optionsWithAuthorizer
    );

    // Spaces API Integrations:
    const spaceResource = this.api.root.addResource('spaces');
    spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration);
    spaceResource.addMethod('GET', this.spacesTable.readLambdaIntegration);
    spaceResource.addMethod('PUT', this.spacesTable.updateLambdaIntegration);
    spaceResource.addMethod('DELETE', this.spacesTable.deleteLambdaIntegration);
  }
}
