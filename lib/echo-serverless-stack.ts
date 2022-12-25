import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as api from 'aws-cdk-lib/aws-apigateway';
import { AppDomain, AppDomainProps } from './app-domain';
import { RestApi, RestApiProps } from './rest-api';

export interface EchoServerlessProps {
  stageName: string;
  customDomain: string;
  hostedZoneId: string;
};

export class EchoServerlessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, appProps: EchoServerlessProps, props?: cdk.StackProps) {
    super(scope, id, props);

    const { stageName } = appProps;

    const domainProps: AppDomainProps = {
      customDomain: appProps.customDomain,
      hostedZoneId: appProps.hostedZoneId,
    };

    const appDomain = new AppDomain(this, 'AppDomain', domainProps);

    const apiDomainName = new api.DomainName(this, 'DomainName', {
      certificate: appDomain.cert,
      domainName: domainProps.customDomain,
    });

    const appRestApiProps: RestApiProps = {
      stageName,
      basePath: 'v1',
      domainName: apiDomainName,
      hostedZone: appDomain.hostedZone,
    }

    new RestApi(this, 'AppRestApi', appRestApiProps);
  }
}
