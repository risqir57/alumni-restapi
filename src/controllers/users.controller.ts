import { NextFunction, Request, Response } from 'express'
import { CreateUserDto } from '../dtos/users.dto'
import { HttpStatusCode } from '../enums/HttpResponse'
import { User } from '../interfaces/users.interface'
import userService from '../services/users.service'
import responseNormalize from '../utils/response'

class UsersController {
  public userService = new userService()

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser()
      res.status(200).json(
        responseNormalize({
          statusCode: HttpStatusCode.Ok,
          data: findAllUsersData,
          message: 'findAll',
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userId: string = req.params.id

    try {
      const findOneUserData: User = await this.userService.findUserById(userId)
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: findOneUserData,
          statusCode: HttpStatusCode.Ok,
          message: 'findOne',
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userData: CreateUserDto = req.body

    try {
      const createUserData: User = await this.userService.createUser(userData)
      res.status(HttpStatusCode.Created).json(
        responseNormalize({
          data: createUserData,
          statusCode: HttpStatusCode.Created,
          message: 'created',
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userId: string = req.params.id
    const userData: User = req.body

    try {
      const updateUserData: User = await this.userService.updateUser(
        userId,
        userData,
      )
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: updateUserData,
          statusCode: HttpStatusCode.Ok,
          message: 'updated',
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public softDeleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userId: string = req.params.id

    try {
      const softDeleteUserData: User = await this.userService.softDelete(userId)
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: softDeleteUserData,
          statusCode: HttpStatusCode.Ok,
          message: 'updated',
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userId: string = req.params.id

    try {
      const deleteUserData: User = await this.userService.deleteUserData(userId)
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: deleteUserData,
          statusCode: HttpStatusCode.Ok,
          message: 'delleted',
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export default UsersController
