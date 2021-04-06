import { logger } from '../utils/logger'

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  NODE_ENV,
  MONGO_ATLAS_USER,
  MONGO_ATLAS_PASS,
  MONGO_ATLAS_HOST,
  MONGO_ATLAS_DATABASE,
  PORT,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  API_HOST,
} = process.env

const config = {
  isProd: NODE_ENV === 'production',
  env: NODE_ENV || 'production',
  domain: API_HOST || 'http://127.0.0.1',
  port: PORT || 3000,
  jwt: {
    secret: JWT_SECRET || 'jwt_secret',
    refreshSecret: JWT_REFRESH_SECRET || 'jagat_refresh_secret',
    tokenLife: 60 * 60, // 1 hour
    refreshTokenLife: 60 * 60 * 24 * 7, // 7 days
  },
  mongodb: {
    user: MONGO_ATLAS_USER,
    password: MONGO_ATLAS_PASS,
    host: MONGO_ATLAS_HOST,
    database: MONGO_ATLAS_DATABASE,
  },
  mongodb_dev: {
    port: MONGO_PORT || 27017,
    host: MONGO_HOST || 'localhost',
    database: MONGO_DATABASE || 'alumni_db',
  },
}

export default config
