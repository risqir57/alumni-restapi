import CoreInterface from './core.interface'
// import { File } from './files.interface'
// import { Message } from './message.interface'
// import { User } from './users.interface'

export interface Forum extends CoreInterface {
  _id: string
  title: string
  description: string
  cover: string
  messages: string[]
  users: string[]
  author: string
}
