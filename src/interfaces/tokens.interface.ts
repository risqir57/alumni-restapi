import CoreInterface from './core.interface'
import { User } from './users.interface'

export interface Token extends CoreInterface {
  user: User['_id']
  token: string
  refreshToken: string
  version: number
  expiresIn: any
}
