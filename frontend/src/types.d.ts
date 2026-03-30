export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface ValidationError {
    errors: Record<string, { message: string }>;
}