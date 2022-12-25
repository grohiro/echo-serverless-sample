# echo-serverless

**サンプルプロジェクト**

Lambda Function と API Gateway で REST API を作成して CDK でデプロイする。
Lambda Function は TypeScript で実装して Jest でテストを実行する。


- API Gateway REST API
- Lambda Function
- TypeScript & Jest
- CDK
  - Route53
  - ACM

## CDK Context

CDK の Context を利用して環境別の設定を切り替える。

- `stageName`: 環境名。API Gateway のステージ名にも利用する。
- `customDomain`: REST API をデプロイするドメイン。
- `hostedZoneId`: Route53 で作成済みの PublicHostedZoneId。

## 仕様

- 本番環境: https://prod.example.com/
- 検証環境: https://dev.example.com/

### echo

送信した文字列をオウム返しする.

```
curl -X POST 'https://prod.example.com/v1/echo' -d 'Hello, World!'
#=> Hello, World!

curl -X POST 'https://prod.example.com/v1/echo?options=uppercase' -d 'Hello, World!'
#=> HELLO, WORLD!
```

### time

サーバーサイドの現在日時を ISO 8601 形式で返す.

```
curl 'https://prod.example.com/v1/time'
#=> 2022-12-15T14:28:00Z
```

### info

AWS Lambda の環境変数、イベント、コンテキスト情報を表示する.

```
curl 'https://prod.example.com/v1/info'
curl -X POST 'https://prod.example.com/v1/info'
```
