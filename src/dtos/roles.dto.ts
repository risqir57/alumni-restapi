import { IsOptional, IsString } from 'class-validator'
import DateDto from './date.dto'

export class RolesDto extends DateDto {
  @IsString()
  public name: string

  @IsOptional()
  @IsString()
  public slugName: string
}
