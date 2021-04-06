import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import DateDto from './date.dto'

export class TokenDto extends DateDto {
  @IsString()
  @IsNotEmpty()
  public user: string

  @IsString()
  @IsNotEmpty()
  public token: string

  @IsString()
  @IsNotEmpty()
  public refreshToken: string

  @IsOptional()
  @IsNumber()
  public version: number

  @IsOptional()
  @IsDateString()
  public expiresIn: Date
}
