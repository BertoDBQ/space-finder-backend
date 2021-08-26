import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/lib/aws-apigateway';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/lib/aws-lambda';
import { NodejsFunction }  from 'aws-cdk-lib/lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { join } from 'path';
import { handler } from '../services/node-lambda/hello';
import { GenericTable } from './GenericTable';

export class SpaceStack extends Stack {

    private api = new RestApi(this, 'SpaceApi');
    private spacesTable = new GenericTable('Spaces', 'SpaceID', this)

    constructor(scope: Construct, id: string,  props: StackProps) {
        super(scope, id, props);

        const helloLambda = new LambdaFunction(this, 'helloLamdba', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
        });

        const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
            entry: join(__dirname, '..', 'services', 'node-lambda', 'hello.ts'),
            handler: 'handler'
        });

        // Hello API lamdba integration
        const helloLambdaIntegration = new LambdaIntegration(helloLambda);
        const helloLamdbaResource = this.api.root.addResource('hello');
        helloLamdbaResource.addMethod('GET', helloLambdaIntegration);
    }
}