import { Construct } from 'constructs';
import * as api from 'aws-cdk-lib/aws-apigateway';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import { RestResources } from './rest-resources';

export type RestApiProps = {
  stageName: string;
  domainName: api.DomainName;
  basePath: string;
  hostedZone: route53.IPublicHostedZone;
}

export class RestApi extends Construct
{
  constructor(scope: Construct, id: string, props: RestApiProps) {
    super(scope, id);
  
    // API Gateway
    const restApi = new api.RestApi(this, `RestApi`, {
      restApiName: `RestApi-${props.stageName}`,
      endpointConfiguration: {
        types: [api.EndpointType.REGIONAL],
      },
      deployOptions: {
        stageName: props.stageName,
      }
    });

    new RestResources(this, 'RestResources', restApi);

    new api.BasePathMapping(this, 'BasePathMapping', {
      restApi,
      domainName: props.domainName,
      basePath: props.basePath,
    });

    new route53.ARecord(this, 'CustomDomainARecord', {
      zone: props.hostedZone,
      target: route53.RecordTarget.fromAlias(new targets.ApiGatewayDomain(props.domainName)),
    });
  }
}
