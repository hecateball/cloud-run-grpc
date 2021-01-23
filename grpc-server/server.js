const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = __dirname + '/hello.proto'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '8080'

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
server.addService(helloProto.hello.Greeter.service, {
  sayHello: (call, callback) => {
    callback(null, { message: 'Hello ID:' + call.request.id + call.request.name })
  }
})

server.bindAsync(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure(), (error) => {
  if(error !== null) {
    throw error
  }
  server.start()
  console.log(`gRPC server running at ${HOST}:${PORT}`)
})

