import { app as config } from '../config'
import { logger } from '../utils/logger'

const {
  isProd,
  mongodb_dev: { host, database, port },
  mongodb,
} = config

const localURL = `mongodb://${host}:${port}/${database}`
const prodURL = `mongodb+srv://${mongodb.user}:${mongodb.password}@${mongodb.host}/${mongodb.database}`

const url: string = isProd ? prodURL : localURL
logger.info(`🌱 Connect to 🌱 ${url}`)

export const dbConnection = {
  url,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
}
