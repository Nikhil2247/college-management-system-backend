import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    CloudinaryService,
    {
      provide: 'Cloudinary',
      useFactory: (configService: ConfigService) => {
        const cloudinary = require('cloudinary').v2;
        cloudinary.config({
          cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
          api_key: configService.get('CLOUDINARY_API_KEY'),
          api_secret: configService.get('CLOUDINARY_API_SECRET'),
        });
        return cloudinary;
      },
      inject: [ConfigService],
    },
  ],
  exports: [CloudinaryService], // Make sure to export the service
})
export class CloudinaryModule {}
