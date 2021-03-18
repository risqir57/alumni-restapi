const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE, NODE_ENV } = process.env

const isProd = NODE_ENV === 'production' ? true : false
const localURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
const prodURL = `mongodb+srv://rounin:beW5VUQOXgik7hv3@rounin0.xc6u2.mongodb.net/${MONGO_DATABASE}`

export const dbConnection = {
  url: isProd ? prodURL : localURL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
}
