import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  public async register(@Res() res, @Body() registerUserDto: RegisterUserDto): Promise<any> {
    try {
      await this.registerService.register(registerUserDto);
      return res.status(HttpStatus.CREATED).json({
        message: `Hey ${registerUserDto.username} your registration was successful!`,
        status: 201,
      });
    } catch (err) {
      return res.status(err.status).json({
        message: err.message,
        status: err.status,
      });
    }
  }
}
