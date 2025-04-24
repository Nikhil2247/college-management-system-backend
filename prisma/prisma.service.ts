import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      const result = await next(params);

      const auditActions = ['create', 'update', 'delete'];

      if (auditActions.includes(params.action)) {
        const entityType = params.model;
        const action = params.action.toUpperCase();

        // Get userId from context (we'll inject this below per request)
        const userId = PrismaService.userIdForRequest ?? null;

        if (userId && entityType !== 'AuditLog') {
          await this.auditLog.create({
            data: {
              entityType,
              action,
              userId,
            },
          });
        }
      }

      return result;
    });
  }

  // We will use this static property to set user ID per request
  static userIdForRequest: string | null = null;
}
