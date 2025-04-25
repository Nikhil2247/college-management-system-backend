import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(req: any) {
    // if (!req.user) return 'No user from Google';

    const { email, name } = req.user;

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          password: '', // No password for Google auth
          //role: 'STUDENT',
        },
      });
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role ?? null,
    };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  //manual student login
  async login(req: any) {
    const { email, password } = req;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== 'STUDENT') {
      throw new ForbiddenException('Invalid email or role');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid password');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async changeUserRole(userId: string, newRole) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return {
      message: 'User role updated successfully',
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
      },
    };
  }
}
