import { Document } from 'mongoose'

interface CoreInterface extends Document {
  createdAt?: any
  updatedAt?: any
  deletedAt?: any
}

export default CoreInterface
