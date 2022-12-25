import { Construct } from 'constructs';
import * as api from 'aws-cdk-lib/aws-apigateway';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

export class RestResources extends Construct
{
  private _restApi: api.RestApi;

  constructor(scope: Construct, id: string, api: api.RestApi) {
    super(scope, id);

    this._restApi = api;

    // Resources
    this.initEchoFunction();
    this.initTimeFunction();
    this.initInfoFunction();
  }

  private initEchoFunction(): nodejs.NodejsFunction {
    const echoFunction = new nodejs.NodejsFunction(this, `EchoFunction`, {
      entry: path.join('src', 'echo',  'index.ts'),
    });

    const echoResource = this.restApi.root.addResource('echo', {});
    echoResource.addMethod(
      "POST",
      new api.LambdaIntegration(
        echoFunction,
        {}
      ),
      {}
    );
    return echoFunction;
  }

  private initTimeFunction(): nodejs.NodejsFunction {
    const timeFunction = new nodejs.NodejsFunction(this, `TimeFunction`, {
      entry: path.join('src', 'time',  'index.ts'),
    });
    const timeResource = this.restApi.root.addResource('time', {});
    timeResource.addMethod(
      "GET",
      new api.LambdaIntegration(
        timeFunction,
        {}
      ),
      {}
    );

    return timeFunction;
  }
  private initInfoFunction(): nodejs.NodejsFunction {
    const infoFunction = new nodejs.NodejsFunction(this, `InfoFunction`, {
      entry: path.join('src', 'info',  'index.ts'),
    });
    const infoResource = this.restApi.root.addResource('info', {});
    infoResource.addMethod(
      "GET",
      new api.LambdaIntegration(
        infoFunction,
        {}
      ),
      {}
    );
    infoResource.addMethod(
      "POST",
      new api.LambdaIntegration(
        infoFunction,
        {}
      ),
      {}
    );

    return infoFunction;
  }

  get restApi() {
    return this._restApi;
  }
}
