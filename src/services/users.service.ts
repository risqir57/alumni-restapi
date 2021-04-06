import bcrypt from 'bcrypt'
import { CreateUserDto } from '../dtos/users.dto'
import HttpException from '../exceptions/HttpException'
import { User } from '../interfaces/users.interface'
import userModel from '../models/users.model'
import { isEmpty } from '../utils/util'

class UserService {
  public users = userModel

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find({ deletedAt: false })
    return users
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await this.users.findOne({
      _id: userId,
      deletedAt: false,
    })
    // eslint-disable-next-line quotes
    if (!findUser) throw new HttpException(409, 'Data not found')

    return findUser
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    // eslint-disable-next-line quotes
    if (isEmpty(userData))
      throw new HttpException(400, 'Body must be not empty')

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

  public async updateUser(userId: string, userData: User): Promise<User> {
    // eslint-disable-next-line quotes
    if (isEmpty(userData))
      throw new HttpException(400, 'Body must be not empty')

    const hashedPassword = !isEmpty(userData.password)
      ? await bcrypt.hash(userData.password, 10)
      : null
    const data = {
      ...userData,
      updatedAt: Date.now(),
    }
    if (!isEmpty(hashedPassword)) data.password = hashedPassword
    const updateUserById: User = await this.users.findByIdAndUpdate(
      userId,
      {
        ...data,
      },
      { new: true },
    )
    // eslint-disable-next-line quotes
    if (!updateUserById) throw new HttpException(409, 'Data is not exist!')

    return updateUserById
  }

  public async softDelete(userId: string): Promise<User> {
    const deletedAt = new Date().toISOString()
    // eslint-disable-next-line quotes
    const updateUserById: User = await this.users.findByIdAndUpdate(
      userId,
      {
        deletedAt,
      },
      { new: true },
    )
    // eslint-disable-next-line quotes
    if (!updateUserById) throw new HttpException(409, 'Data is not exist!')

    return updateUserById
  }

  public async deleteUserData(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId)
    // eslint-disable-next-line quotes
    if (!deleteUserById) throw new HttpException(409, 'Data is not exist!')

    return deleteUserById
  }
}

export default UserService
