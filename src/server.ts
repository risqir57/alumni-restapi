import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import validateEnv from './utils/validateEnv';
import { InitRouter } from './app'

validateEnv();

const RouterV1: InitRouter = {
    path: 'v1',
    routes: [
        new IndexRoute(),
        new UsersRoute(),
        new AuthRoute()
    ]
}

const app = new App(RouterV1);

app.listen();
