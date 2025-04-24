import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async importUsersFromExcel(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const createdUsers = [];

    for (const row of rows) {
      const email = String(row['Email']).toLowerCase();
      const name = String(row['Name']);
      const contact = row['Contact'] || '0000000000';
      const parentName = row['ParentName'] || 'Not Provided';
      const parentContact = row['ParentContact'] || '0000000000';
      const admissionType = row['AdmissionType'] || 'FIRST_YEAR';
      const category = row['Category'] || 'GENERAL';
      const admissionNumber = row['AdmissionNumber'] || Math.floor(Math.random() * 100000).toString();
      const rollNumber = row['RollNumber'] || 'ROLL' + Math.floor(Math.random() * 100000);

      const rawPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'STUDENT',
        },
      });

      // Create linked student
      await this.prisma.student.create({
        data: {
          userId: user.id,
          email,
          name,
          contact,
          parentName,
          parentContact,
          admissionNumber,
          rollNumber,
          admissionType,
          category
        },
      });

      // Send email
      await this.sendEmail(email, name, rawPassword);
      createdUsers.push({ email, name });
    }

    return {
      message: `${createdUsers.length} students imported successfully.`,
      users: createdUsers,
    };
  }

  async sendEmail(email: string, name: string, password: string) {
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
      subject: 'Your College Login Credentials',
      html: `
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your student account has been created.</p>
        <p><strong>Email:</strong> ${email}<br/>
           <strong>Password:</strong> ${password}</p>
        <p>Login at: <a href="http://localhost:5173/login">Student Portal</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);
  }

  async getAllUsers() {
  return this.prisma.user.findMany({
    orderBy: { createdAt: 'desc' }, // Optional: sort by latest
  });
}
}
