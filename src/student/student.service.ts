import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async updateStudent(userId: string, body: any) {
    const student = await this.prisma.student.findFirst({
      where: { userId },
    });

    if (!student) {
      throw new ForbiddenException('Student record not found');
    }

    const updated = await this.prisma.student.update({
      where: { id: student.id },
      data: {
        //name: body.name,
        contact: body.contact,
        // email: body.email,
        parentName: body.parentName,
        parentContact: body.parentContact,
        // Add other fields if needed
      },
    });

    return updated;
  }

  async updateStudentByAdmin(studentId: string, body: any) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const updated = await this.prisma.student.update({
      where: { id: studentId },
      data: {
        name: body.name,
        email: body.email,
        contact: body.contact,
        parentName: body.parentName,
        parentContact: body.parentContact,
        rollNumber: body.rollNumber,
        admissionNumber: body.admissionNumber,
        category: body.category,
        admissionType: body.admissionType,
        batchId: body.batchId,
        scholarshipId: body.scholarshipId,
      },
    });

    return updated;
  }

  async findAllStudents() {
    return this.prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        batch: true,
        scholarship: true,
        document: true,
        fees: true,
        results: {
          include: {
            Subject: true,
          },
        },
        feeStrucutre: true,
      },
    });
  }

  async createStudent(data: any, profileImage?: Express.Multer.File) {
    // Upload profile image if provided
    let avatarUrl: string | null = null;
    if (profileImage) {
      try {
        const uploadResult = await this.cloudinaryService.uploadFile(
          profileImage,
          'student_profiles',
          undefined,
        );
        avatarUrl = uploadResult.secure_url;
      } catch (err) {
        throw new BadRequestException('Image upload failed: ' + err.message);
      }
    }
    // generate a random 8-char password
    const rawPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // create User record
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: 'STUDENT',
      },
    });

    // create Student record
    const student = await this.prisma.student.create({
      data: {
        userId: user.id,
        email: data.email,
        name: data.name,
        contact: data.contact,
        address: data.address,
        city: data.city,
        state: data.state,
        dob: data.dob,
        branchName: data.branchName,
        parentName: data.parentName,
        parentContact: data.parentContact,
        rollNumber: data.rollNumber,
        admissionNumber: data.admissionNumber,
        batchId: data.batchId,
        admissionType: data.admissionType,
        category: data.category,
        scholarshipId: data.scholarshipId,
        feeStuctureId: data.feeStructureId,
        profileImage: avatarUrl,
      },
    });

    // send email with credentials
    await this.sendCredentialsEmail(data.email, data.name, rawPassword);

    return student;
  }

  private async sendCredentialsEmail(
    email: string,
    name: string,
    password: string,
  ) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Your Student Portal Credentials',
      html: `
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your student account has been created.</p>
        <p><strong>Email:</strong> ${email}<br/>
           <strong>Password:</strong> ${password}</p>
        <p>Login at: <a href="${process.env.PORTAL_URL}/login">Student Portal</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);
  }
}
