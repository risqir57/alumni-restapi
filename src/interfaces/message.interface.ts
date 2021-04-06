import CoreInterface from './core.interface'
// import { User } from './users.interface'

export interface Message extends CoreInterface {
  _id: string
  text: string
  from: string
  to: string[]
}
