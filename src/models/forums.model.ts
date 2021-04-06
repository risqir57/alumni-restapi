import { model, Schema, Document } from 'mongoose'
import { User } from '../interfaces/users.interface'

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nrp: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  background: {
    type: String,
  },
  roles: {
    type: [Schema.Types.ObjectId],
    ref: 'Role',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Schema.Types.Mixed,
    default: false,
  },
})

const userModel = model<User & Document>('User', userSchema)

export default userModel
