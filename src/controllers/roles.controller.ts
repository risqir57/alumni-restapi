import { RolesDto } from './../dtos/roles.dto'
import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../enums/HttpResponse'
import { Role } from '../interfaces/roles.interface'
import RoleService from '../services/role.service'
import responseNormalize from '../utils/response'
import { stringToSlug } from '../utils/util'

class RolesController {
  public mainService = new RoleService()

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllData: Role[] = await this.mainService.findAllData()
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          statusCode: HttpStatusCode.Ok,
          data: findAllData,
          message: 'findAll',
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id

    try {
      const findOneData: Role = await this.mainService.findDataById(id)
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: findOneData,
          statusCode: HttpStatusCode.Ok,
          message: 'findOne',
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const data: RolesDto = req.body

    try {
      data.slugName = stringToSlug(data.name)
      const createUserData: Role = await this.mainService.createData(data)
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

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id
    const data: Role = req.body

    try {
      data.slugName = stringToSlug(data.name)
      const updateData: Role = await this.mainService.updateData(id, data)
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: updateData,
          statusCode: HttpStatusCode.Ok,
          message: 'updated',
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public softDelete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const id: string = req.params.id

    try {
      const softDeleteData: Role = await this.mainService.softDelete(id)
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: softDeleteData,
          statusCode: HttpStatusCode.Ok,
          message: 'updated',
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id

    try {
      const deleteData: Role = await this.mainService.deleteData(id)
      res.status(HttpStatusCode.Ok).json(
        responseNormalize({
          data: deleteData,
          statusCode: HttpStatusCode.Ok,
          message: 'delleted',
        }),
      )
    } catch (error) {
      next(error)
    }
  }
}

export default RolesController
