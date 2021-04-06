import { isEmpty } from 'class-validator'
import { HttpStatusCode } from './../enums/HttpResponse'
import { NextFunction, Request, Response } from 'express'
import { CreateUserDto } from '../dtos/users.dto'
import AuthService from '../services/auth.service'
import { User } from '../interfaces/users.interface'
import { RequestWithUser } from '../interfaces/auth.interface'
import responseNormalize from '../utils/response'
import HttpException from '../exceptions/HttpException'

class AuthController {
  public authService = new AuthService()

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body

    try {
      const signUpUserData: User = await this.authService.signup(userData)
      res
        .status(HttpStatusCode.Created)
        .json({ data: signUpUserData, message: 'signup' })
    } catch (error) {
      next(error)
    }
  }

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body

    try {
      const { cookie, findUser } = await this.authService.login(userData)
      res.setHeader('Set-Cookie', [...cookie])
      res.status(HttpStatusCode.Ok).json({ data: findUser, message: 'login' })
    } catch (error) {
      next(error)
    }
  }

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    const userData: User = req.user

    try {
      const logOutUserData: User = await this.authService.logout(userData)
      res.setHeader('Set-Cookie', [
        'Authorization=; Max-Age=0;',
        'R-Jagat-Token=; Max-Age=0;',
      ])
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: logOutUserData,
          message: 'logout',
          statusCode: HttpStatusCode.Ok,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public whoami = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    const userData: User = req.user

    try {
      const findUser: User = await this.authService.whoami(userData)
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: findUser,
          message: 'whoami',
          statusCode: HttpStatusCode.Ok,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public refreshToken = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    const userData: User = req.user
    const refreshTokenData: string = req.refreshToken

    try {
      const { cookie, findUser } = await this.authService.refreshToken(
        userData,
        refreshTokenData,
      )
      res.setHeader('Set-Cookie', [...cookie])
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          statusCode: HttpStatusCode.Ok,
          data: findUser,
          message: 'refresh token',
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
