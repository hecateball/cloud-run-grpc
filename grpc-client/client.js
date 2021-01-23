const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = __dirname + '/../grpc-server/hello.proto'

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)
const helloProto = grpc.loadPackageDefinition(packageDefinition)

const client = new helloProto.hello.Greeter('HOSTNAME', grpc.credentials.createSsl())

client.SayHello({ id: 1, name: '太郎' }, (error, response) => {
  if (!error) {
    console.log(response.message) //こんにちわ ID:1太郎
  } else {
    console.error(error)
  }
})
