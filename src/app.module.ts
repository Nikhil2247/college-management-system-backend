import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { StudentModule } from './student/student.module';
import { BatchModule } from './batch/batch.module';
import { ClassAssignmentModule } from './class-assignment/class-assignment.module';
import { FeeModule } from './fee/fee.module';
import { ScholarshipModule } from './scholarship/scholarship.module';
import { SemesterModule } from './semester/semester.module';
import { ExamResultModule } from './exam-result/exam-result.module';
import { PlacementModule } from './placement/placement.module';
import { DocumentModule } from './document/document.module';
import { ConfigModule } from '@nestjs/config';
import { CorsMiddleware } from 'corsmiddleware.middleware';
import { FeeStructureModule } from './fee-structure/fee-structure.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    StudentModule,
    BatchModule,
    ClassAssignmentModule,
    FeeModule,
    ScholarshipModule,
    SemesterModule,
    ExamResultModule,
    PlacementModule,
    DocumentModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FeeStructureModule,
    SubjectModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*'); // Apply middleware globally
  }
}