import { bool, cleanEnv, port, str } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    API_NAME: str(),
    API_HOST: str(),
    PORT: port(),
    MONGO_HOST: str(),
    MONGO_PORT: str(),
    MONGO_DATABASE: str(),
    MONGO_ATLAS_USER: str(),
    MONGO_ATLAS_PASS: str(),
    MONGO_ATLAS_HOST: str(),
    MONGO_ATLAS_DATABASE: str(),
    HUSKY_DEBUG: bool(),
    JWT_SECRET: str(),
    JWT_REFRESH_SECRET: str(),
  })
}

export default validateEnv
