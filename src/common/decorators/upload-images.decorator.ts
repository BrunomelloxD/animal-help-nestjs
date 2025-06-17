import { UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';

export function UploadImages(fieldName = 'images', maxCount = 5) {
    return UseInterceptors(FilesInterceptor(fieldName, maxCount, multerOptions));
}
