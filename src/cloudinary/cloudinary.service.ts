import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse, DeleteApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('Cloudinary') private readonly cloudinary) {}

  /**
   * Upload a file to Cloudinary
   * @param file - The file to upload
   * @param folder - Optional folder path in Cloudinary
   * @param publicId - Optional custom public ID
   * @returns Promise with upload result
   */
  async uploadFile(
    file: Express.Multer.File, 
    folder?: string,
    publicId?: string
  ): Promise<UploadApiResponse> {
    if (!file || !file.buffer) {
      throw new BadRequestException('Invalid file provided');
    }

    return new Promise((resolve, reject) => {
      const uploadOptions: any = {};
      
      if (folder) uploadOptions.folder = folder;
      if (publicId) uploadOptions.public_id = publicId;

      const upload = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      const stream = Readable.from(file.buffer);
      stream.pipe(upload);
    });
  }

  /**
   * Delete a file from Cloudinary by public ID
   * @param publicId - The public ID of the file to delete
   * @returns Promise with deletion result
   */
  async deleteFile(publicId: string): Promise<DeleteApiResponse> {
    if (!publicId) {
      throw new BadRequestException('Public ID is required');
    }

    return cloudinary.uploader.destroy(publicId);
  }

  /**
   * Delete multiple files from Cloudinary
   * @param publicIds - Array of public IDs to delete
   * @returns Promise with deletion results
   */
  async deleteFiles(publicIds: string[]): Promise<DeleteApiResponse[]> {
    if (!publicIds || !publicIds.length) {
      throw new BadRequestException('At least one public ID is required');
    }

    const deletePromises = publicIds.map(publicId => 
      cloudinary.uploader.destroy(publicId)
    );
    
    return Promise.all(deletePromises);
  }

  /**
   * Get the public ID from a Cloudinary URL
   * @param url - The Cloudinary URL
   * @returns The public ID
   */
  getPublicIdFromUrl(url: string): string {
    if (!url) return '';
    
    // Extract the public ID from the URL
    const splitUrl = url.split('/');
    const publicIdWithExtension = splitUrl[splitUrl.length - 1];
    
    // Remove file extension if present
    return publicIdWithExtension.split('.')[0];
  }

  /**
   * Generate a signed URL with an expiration time
   * @param publicId - The public ID of the file
   * @param expiresAt - Expiration timestamp in seconds
   * @returns Signed URL with expiration
   */
  generateSignedUrl(publicId: string, expiresAt?: number): string {
    if (!publicId) {
      throw new BadRequestException('Public ID is required');
    }
    
    return cloudinary.url(publicId, {
      secure: true,
      sign_url: true,
      expires_at: expiresAt || Math.floor(Date.now() / 1000) + 3600, // Default: 1 hour
    });
  }
}