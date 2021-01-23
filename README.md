# Cloud Run gRPC sample

## How to Deploy
```
gcloud beta run deploy grpc-server --source grpc-server --platform managed --region asia-northeast1 --use-http2 --allow-unauthenticated
```

## How to Use
```shell
cd grpc-client
node client.js <YOUR CLOUD RUN HOST>
```
