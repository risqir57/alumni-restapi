import { logger } from '../utils/logger'

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  NODE_ENV,
  MONGO_ATLAS_USER,
  MANGO_ATLAS_PASS,
  MANGO_ATLAS_HOST,
} = process.env

const isProd = NODE_ENV === 'production'

const localURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
const prodURL = `mongodb+srv://${MONGO_ATLAS_USER}:${MANGO_ATLAS_PASS}@${MANGO_ATLAS_HOST}/${MONGO_DATABASE}`

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
