const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '8080'

const packageDefinition = protoLoader.loadSync(
  __dirname + '/sample.proto',
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)
const proto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

server.addService(proto.sample.Sample.service, {
  get: (call, callback) => {
    console.log(call.request.id, call.request.name)
    callback(null, { message: '残業しませんか？' })
  },
  stream: (call) => {
    for(let i = 0; i < 10; i++) {
      call.write({ message: `残業しませんか？(${i + 1})` })
    }
    call.end()
  }
})

server.bindAsync(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure(), (error) => {
  if(error !== null) {
    throw error
  }
  server.start()
  console.log(`gRPC server running at ${HOST}:${PORT}`)
})

