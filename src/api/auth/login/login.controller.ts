import { Controller, Post, UseGuards, Request, Response, Get, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const jwtToken = await this.loginService.getToken(req.user);
    const secretData = {
      accessToken: jwtToken,
    };

    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 30 * 60 * 1000), //Expires in 30 minutes ,
    });

    return { message: 'Success' };
  }

  @Get('logout')
  async logout(@Request() req, @Response({ passthrough: true }) res) {
    res.clearCookie('auth-cookie');
    return { message: 'Success' };
  }
}
