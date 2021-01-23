const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = __dirname + '/hello.proto'

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

const server = new grpc.Server()

const sayHello = (call, callback) => {
  callback(null, { message: 'こんにちわ ID:' + call.request.id + call.request.name })
}

server.addService(helloProto.hello.Greeter.service, {
  sayHello: sayHello
})

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('gRPC server running at http://127.0.0.1:50051')
server.start()
