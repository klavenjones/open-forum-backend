import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

const PW_MIN_LENGTH = 8;
const PW_MAX_LENGTH = 64;

const USERNAME_MIN_LENGTH = 6;
const USERNAME_MAX_LENGTH = 30;

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(USERNAME_MIN_LENGTH)
  @MaxLength(USERNAME_MAX_LENGTH)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(PW_MIN_LENGTH)
  @MaxLength(PW_MAX_LENGTH)
  public password;
}
