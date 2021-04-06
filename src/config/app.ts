const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  NODE_ENV,
  MONGO_ATLAS_USER,
  MANGO_ATLAS_PASS,
  MANGO_ATLAS_HOST,
  MANGO_ATLAS_DATABASE,
  PORT,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  API_DOMAIN,
} = process.env

const config = {
  isProd: NODE_ENV === 'production',
  domain: API_DOMAIN,
  port: PORT || 3000,
  jwt: {
    secret: JWT_SECRET || 'jwt_secret',
    refreshSecret: JWT_REFRESH_SECRET || 'jagat_refresh_secret',
    tokenLife: 60 * 60, // 1 hour
    refreshTokenLife: 60 * 60 * 24 * 7, // 7 days
  },
  mongodb: {
    user: MONGO_ATLAS_USER,
    password: MANGO_ATLAS_PASS,
    host: MANGO_ATLAS_HOST,
    database: MANGO_ATLAS_DATABASE,
  },
  mongodb_dev: {
    port: MONGO_PORT || 27017,
    host: MONGO_HOST || 'localhost',
    database: MONGO_DATABASE || 'alumni_db',
  },
}

export default config
