import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';

export interface AppDomainProps {
  customDomain: string;
  hostedZoneId: string;
};

export class AppDomain extends Construct
{
  private _hostedZone: route53.IPublicHostedZone;

  private _cert: acm.ICertificate;

  constructor(scope: Construct, id: string, props: AppDomainProps) {
    super(scope, id);

    // Route53
    this._hostedZone = route53.PublicHostedZone.fromPublicHostedZoneAttributes(this, 'PublicHostedZoe', {
      hostedZoneId: props.hostedZoneId,
      zoneName: props.customDomain,
    });

    // Certificate Manager
    this._cert = new acm.Certificate(this, 'Cert', {
      domainName: props.customDomain,
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });
  }

  get hostedZone() {
    return this._hostedZone;
  }

  get cert() {
    return this._cert;
  }
}

