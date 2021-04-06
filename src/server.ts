import 'dotenv/config'
import App from './app'
import validateEnv from './utils/validateEnv'
import { InitRouter } from './app'
import mainRoute from './routes'

validateEnv()

const RouterV1: InitRouter = {
  path: 'v1',
  routes: [...mainRoute],
}

const app = new App(RouterV1)

app.listen()
