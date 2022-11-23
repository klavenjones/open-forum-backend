import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsBoolean()
  public isAdmin: boolean;
}
