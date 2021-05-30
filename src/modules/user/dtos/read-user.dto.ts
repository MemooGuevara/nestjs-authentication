import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  id: number

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @IsEmail()
  email: string

  @Expose()
  @IsOptional()
  @IsBoolean()
  isActive: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}
