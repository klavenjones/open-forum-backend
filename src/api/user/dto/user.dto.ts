import { IsNotEmpty, IsString, IsBoolean, MaxLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  public password;

  @IsBoolean()
  public isAdmin: boolean;
}
