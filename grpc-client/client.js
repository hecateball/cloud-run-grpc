const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = __dirname + '/../grpc-server/sample.proto'

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
const proto = grpc.loadPackageDefinition(packageDefinition)

const client = new proto.sample.Sample(process.argv[2], grpc.credentials.createSsl())

// streamじゃないほう
client.get({ id: 1, name: '甘雨' }, (error, response) => {
  if (!error) {
    console.log(response.message)
  } else {
    console.error(error)
  }
})

// stream
const channel = client.stream({ id: 1, name: '太郎' })
channel.on('data', (response) => {
  console.log(response)
})
channel.on('end', () => {
  console.log('end')
})

