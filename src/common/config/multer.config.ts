import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const multerOptions = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, uniqueSuffix + extname(file.originalname));
        },
    }),
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: (req, file, cb) => {
        if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new BadRequestException(
                    `Tipo de arquivo não permitido: ${file.mimetype}. Permitidos: ${ALLOWED_MIME_TYPES.join(', ')}`,
                ),
                false,
            );
        }
    },
};
