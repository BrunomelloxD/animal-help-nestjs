export interface JwtPayload {
    sub: string;
    email: string;
    role?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}