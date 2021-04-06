import AuthRoute from './auth.route'
import IndexRoute from './index.route'
import RoleRoute from './roles.route'
import UsersRoute from './users.route'

const mainRoute: any[] = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new RoleRoute(),
]

export default mainRoute
