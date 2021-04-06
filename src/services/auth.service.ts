import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { app } from '../config'
import { CreateUserDto } from '../dtos/users.dto'
import HttpException from '../exceptions/HttpException'
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface'
import { Token } from '../interfaces/tokens.interface'
import { User } from '../interfaces/users.interface'
import tokenModel from '../models/tokens.model'
import userModel from '../models/users.model'
import { logger } from '../utils/logger'
import { isEmpty, toId } from '../utils/util'

class AuthService {
  public users = userModel
  public tokens = tokenModel

  public async signup(userData: CreateUserDto): Promise<User> {
    // eslint-disable-next-line quotes
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: User = await this.users.findOne({ email: userData.email })
    if (findUser)
      throw new HttpException(
        409,
        `You're email ${userData.email} already exists`,
      )

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    })

    return createUserData
  }

  public async login(
    userData: CreateUserDto,
  ): Promise<{ cookie: string[]; findUser: User }> {
    // eslint-disable-next-line quotes
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: User = await this.users.findOne({ email: userData.email })
    if (!findUser)
      throw new HttpException(409, `You're email ${userData.email} not found`)

    const isPasswordMatching: boolean = await bcrypt.compare(
      userData.password,
      findUser.password,
    )
    if (!isPasswordMatching)
      // eslint-disable-next-line quotes
      throw new HttpException(409, "You're password not matching")

    const tokenData = this.createToken(findUser)
    const refreshToken = this.createRefreshToken(findUser)
    const cookie = this.createCookie(tokenData, refreshToken)

    await this.revokeToken(tokenData.token, refreshToken.token)

    return { cookie, findUser }
  }

  public async refreshToken(
    userData: User,
    refreshTokenData: string,
  ): Promise<{ cookie: string[]; findUser: User }> {
    try {
      jwt.verify(refreshTokenData, app.jwt.refreshSecret)
    } catch (error) {
      throw new HttpException(401, 'Token is not match')
    }
    // eslint-disable-next-line quotes
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: User = await this.users.findOne({
      email: userData.email,
    })
    // eslint-disable-next-line quotes
    if (!findUser) throw new HttpException(409, "You're not user")

    const tokenData = this.createToken(findUser)
    const refreshToken = this.createRefreshToken(findUser)
    const cookie = this.createCookie(tokenData, refreshToken)
    await this.revokeToken(
      tokenData.token,
      refreshToken.token,
      refreshTokenData,
    )

    return { cookie, findUser }
  }

  public async logout(userData: User): Promise<User> {
    // eslint-disable-next-line quotes
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: User = await this.users.findOne({
      password: userData.password,
    })
    // eslint-disable-next-line quotes
    if (!findUser) throw new HttpException(409, "You're not user")

    return findUser
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { userId: user._id }
    const secret: string = app.jwt.secret
    const expiresIn: number = app.jwt.tokenLife
    const token: string = jwt.sign(dataStoredInToken, secret, { expiresIn })

    return {
      expiresIn,
      token,
    }
  }

  public createRefreshToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { userId: user._id }
    const secret: string = app.jwt.refreshSecret
    const expiresIn: number = app.jwt.refreshTokenLife
    const token: string = jwt.sign(dataStoredInToken, secret, { expiresIn })

    return {
      expiresIn,
      token,
    }
  }

  public createCookie(tokenData: TokenData, refreshToken: TokenData): string[] {
    return [
      `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`,
      `R-Jagat-Token=${refreshToken.token}; HttpOnly; Max-Age=${refreshToken.expiresIn};`,
    ]
  }

  public async revokeToken(
    token: string,
    refreshToken: string,
    oddRefreshToken?: string,
  ): Promise<Token> {
    if (isEmpty(token) && isEmpty(refreshToken))
      throw new HttpException(409, 'Token is empty')

    const targetToken: string = !isEmpty(oddRefreshToken)
      ? oddRefreshToken
      : refreshToken

    const findToken = await this.tokens.findOne({
      refreshToken: targetToken,
    })

    let data = null
    jwt.verify(
      targetToken,
      app.jwt.refreshSecret,
      async (err, user: DataStoredInToken) => {
        if (err) throw new HttpException(401, 'Forbidden!')
        data = {
          user: toId(user.userId),
          token: token,
          refreshToken: refreshToken,
          expiresIn: +new Date() + app.jwt.tokenLife,
        }
        if (!findToken) data.version = 0
        else data.version = findToken.version + 1
      },
    )

    let createToken: Token = null

    if (!findToken) createToken = await this.tokens.create(data)
    else
      createToken = await this.tokens.findOneAndUpdate(
        {
          refreshToken: targetToken,
        },
        data,
      )

    return createToken
  }

  public async whoami(userData: User): Promise<User> {
    // eslint-disable-next-line quotes
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: User = await this.users.findOne({
      password: userData.password,
    })
    // eslint-disable-next-line quotes
    if (!findUser) throw new HttpException(409, "You're not user")

    return findUser
  }
}

export default AuthService
