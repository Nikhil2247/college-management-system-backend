import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Roles } from './roles.decorator';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google')) // Initiates Google OAuth flow
  async googleAuth(@Req() req) {
    return 'Redirecting to Google...'; // Passport handles the redirect
  }


  @Public()
  @Get('google/redirect')
  @UseGuards(AuthGuard('google')) // Handles Google callback
  async googleAuthRedirect(@Req() req, @Res() res) {
    if (!req.user) {
      return res.redirect(
        'https://college-management-system-frotend.vercel.app/login?error=unauthorized',
      );
    }

    const response = await this.authService.googleLogin(req);
    return res.redirect(
      `https://college-management-system-frotend.vercel.app?token=${response.access_token}&name=${encodeURIComponent(response.user.name)}&email=${encodeURIComponent(response.user.email)}`,
    );
  }

  @Put('change-role/:id')
  //@Roles('PRINCIPAL') // Only principal can change roles
  async changeUserRole(
    @Param('id') userId: string,
    @Body('role') role: string,
  ) {
    return this.authService.changeUserRole(userId, role as any);
  }

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }
}
