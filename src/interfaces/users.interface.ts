import { Role } from './roles.interface'
import CoreInterface from './core.interface'

export interface User extends CoreInterface {
  firstName: string
  lastName: string
  nrp: string
  email: string
  password: string
  roles: Role['_id'][]
}
