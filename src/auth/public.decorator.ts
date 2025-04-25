import { SetMetadata } from '@nestjs/common';

/**
 * Decorator to mark endpoints as public (no JWT required)
 */
export const Public = () => SetMetadata('isPublic', true);
