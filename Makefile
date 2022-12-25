usage:
	echo make deploy-prod

deploy-prod:
	cdk diff -c stage=production
	cdk deploy -c stage=production
