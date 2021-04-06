import { RolesDto } from './../dtos/roles.dto'
import { Router } from 'express'
import RolesController from '../controllers/roles.controller'
import Route from '../interfaces/routes.interface'
import validationMiddleware from '../middlewares/validation.middleware'

class RoleRoute implements Route {
  public path = '/admin/roles'
  public router = Router()
  public mainController = new RolesController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.mainController.getAll)
    this.router.get(`${this.path}/:id`, this.mainController.getById)
    this.router.post(
      `${this.path}`,
      validationMiddleware(RolesDto, 'body'),
      this.mainController.create,
    )
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(RolesDto, 'body', true),
      this.mainController.update,
    )
    this.router.delete(
      `${this.path}/:id/soft-delete`,
      this.mainController.softDelete,
    )
    this.router.delete(`${this.path}/:id`, this.mainController.delete)
  }
}

export default RoleRoute
