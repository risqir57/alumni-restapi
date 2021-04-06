import { IsDateString, IsOptional } from 'class-validator'

class DateDto {
  @IsOptional()
  @IsDateString()
  createdAt: Date

  @IsOptional()
  @IsDateString()
  updatedAt: Date

  @IsOptional()
  deletedAt: Date
}

export default DateDto
