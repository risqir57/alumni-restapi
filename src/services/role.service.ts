import { RolesDto } from './../dtos/roles.dto'
import HttpException from '../exceptions/HttpException'
import { Role } from '../interfaces/roles.interface'
import roleModel from '../models/roles.model'
import { isEmpty } from 'class-validator'

class RoleService {
  public model = roleModel

  public async findAllData(): Promise<Role[]> {
    const users: Role[] = await this.model.find({ deletedAt: false })
    return users
  }

  public async findDataById(userId: string): Promise<Role> {
    const findUser: Role = await this.model.findOne({
      _id: userId,
      deletedAt: false,
    })
    // eslint-disable-next-line quotes
    if (!findUser) throw new HttpException(409, 'Data not found')

    return findUser
  }

  public async createData(data: RolesDto): Promise<Role> {
    // eslint-disable-next-line quotes
    if (isEmpty(data)) throw new HttpException(400, 'Body must be not empty')

    const findData: Role = await this.model.findOne({ slugName: data.slugName })
    if (findData)
      throw new HttpException(409, `Data ${data.slugName}: is not exist`)

    const createData: Role = await this.model.create({
      ...data,
    })
    return createData
  }

  public async updateData(id: string, data: Role): Promise<Role> {
    // eslint-disable-next-line quotes
    if (isEmpty(data)) throw new HttpException(400, 'Body must be not empty')

    const updateDataById: Role = await this.model.findByIdAndUpdate(
      id,
      {
        ...data,
      },
      { new: true },
    )
    // eslint-disable-next-line quotes
    if (!updateDataById) throw new HttpException(409, 'Data is not exist!')

    return updateDataById
  }

  public async softDelete(id: string): Promise<Role> {
    const deletedAt = new Date().toISOString()
    // eslint-disable-next-line quotes
    const updateDataById: Role = await this.model.findByIdAndUpdate(
      id,
      {
        deletedAt,
      },
      { new: true },
    )
    // eslint-disable-next-line quotes
    if (!updateDataById) throw new HttpException(409, 'Data is not exist!')

    return updateDataById
  }

  public async deleteData(id: string): Promise<Role> {
    const deleteDataById: Role = await this.model.findByIdAndDelete(id)
    // eslint-disable-next-line quotes
    if (!deleteDataById) throw new HttpException(409, 'Data is not exist!')

    return deleteDataById
  }
}

export default RoleService
