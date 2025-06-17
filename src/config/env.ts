import 'dotenv';

export const server = {
    config: {
        port: process.env.PORT ? +process.env.PORT : 3000,
        base_url: process.env.BASE_URL,
    },
    rabbitqm: {
        url: process.env.RABBITMQ_URI ?? 'amqp://guest:guest@rabbitmq:5672'
    }
};

export const security = {
    bcrypt: {
        saltRounds: process.env.SALT_ROUNDS ? +process.env.SALT_ROUNDS : 10
    },
    jwt: {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        secret: process.env.JWT_SECRET || '123'
    },
    mailer: {
        mail: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT ? +process.env.MAIL_PORT : 587
    }
};