import { Token } from './../interfaces/tokens.interface'
import { model, Schema, Document } from 'mongoose'

const tokenSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
    default: 0,
  },
  expiresIn: {
    type: Date,
    default: Date.now,
  },
})

const tokenModel = model<Token & Document>('Token', tokenSchema)

export default tokenModel
