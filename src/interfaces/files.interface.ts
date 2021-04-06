import CoreInterface from './core.interface'
import { User } from './users.interface'

export interface File extends CoreInterface {
  name: string
  file: string // url to firebase storage
  type: string
  user: string
}
