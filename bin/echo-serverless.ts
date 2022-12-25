#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EchoServerlessStack, EchoServerlessProps } from '../lib/echo-serverless-stack';

const app = new cdk.App();

const stage = app.node.tryGetContext('stage');
if (!stage) {
  throw `'stage' is not defined. Use '-c stage=STAGE' option.`;
}
const context = app.node.tryGetContext(stage);
if (!context?.stageName) {
  throw `'stageName' is not defined in the context.`;
}

const props: EchoServerlessProps = {
  stageName: context. stageName,
  customDomain: context.customDomain,
  hostedZoneId: context.hostedZoneId,
};

new EchoServerlessStack(app, `EchoServerlessStack-${props.stageName}`, props, {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
