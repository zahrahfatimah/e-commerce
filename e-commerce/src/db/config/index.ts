import { MongoClient} from 'mongodb'

const connectionString = process.env.MONGODB_CONNECTION_STRING || "kshd iw" //ini belum ya

if(!connectionString){
  throw new Error("MONGODB_CONNECTION_STRING is not define")
}

let client: MongoClient

export const getMongoClientInstance = async () => {
  if(!client){
    client = await MongoClient.connect(connectionString)
    await client.connect()
  }

  return client
}

