import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import DateDto from './date.dto'

export class CreateUserDto extends DateDto {
  @IsString()
  public firstName: string

  @IsString()
  public lastName: string

  @IsNotEmpty()
  @IsString()
  public nrp: string

  @IsNotEmpty()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsString()
  public password: string

  @IsOptional()
  @IsString()
  public avatar: string

  @IsOptional()
  @IsString()
  public background: string

  @IsOptional()
  @IsString()
  public roles: string[]
}

export class LoginUserDto {
  @IsOptional()
  @IsString()
  public nrp: string

  @IsOptional()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsString()
  public password: string
}
