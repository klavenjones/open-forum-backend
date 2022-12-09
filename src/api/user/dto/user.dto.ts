import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

const PW_MAX_LENGTh = 64;
const USERNAME_MAX_LENGTh = 30;
const PW_MIN_LENGTh = 8;
const USERNAME_MIN_LENGTh = 6;

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(USERNAME_MIN_LENGTh)
  @MaxLength(USERNAME_MAX_LENGTh)
  public username: string;

  @IsString()
  @IsNotEmpty()
  
  @MinLength(PW_MIN_LENGTh)
  @MaxLength(PW_MAX_LENGTh)
  public password;
}
