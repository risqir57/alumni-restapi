import { model, Schema, Document } from 'mongoose'
import { Role } from '../interfaces/roles.interface'

const roleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slugName: {
    type: String,
    required: true,
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

const roleModel = model<Role & Document>('Role', roleSchema)

export default roleModel
