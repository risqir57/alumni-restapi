import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { app } from '../config'
import HttpException from '../exceptions/HttpException'
import {
  DataStoredInToken,
  RequestWithUser,
} from '../interfaces/auth.interface'
import userModel from '../models/users.model'

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookies = req.cookies

    if (cookies && cookies.Authorization) {
      const secret = app.jwt.secret
      const verificationResponse = (await jwt.verify(
        cookies.Authorization,
        secret,
      )) as DataStoredInToken
      const { userId } = verificationResponse
      const findUser = await userModel.findById(userId)

      if (findUser) {
        req.user = findUser
        next()
      } else {
        next(new HttpException(401, 'Wrong authentication token'))
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'))
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'))
  }
}

export const refreshTokenMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookies = req.cookies
    if (cookies && cookies['R-Jagat-Token']) {
      const secret = app.jwt.refreshSecret
      const verificationResponse = (await jwt.verify(
        cookies['R-Jagat-Token'],
        secret,
      )) as DataStoredInToken
      const { userId } = verificationResponse
      const findUser = await userModel.findById(userId)

      if (findUser) {
        req.user = findUser
        req.refreshToken = cookies['R-Jagat-Token']
        next()
      } else {
        next(new HttpException(401, 'Wrong authentication token'))
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'))
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'))
  }
}

export default authMiddleware
