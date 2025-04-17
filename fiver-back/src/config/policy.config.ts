// src/config/policy.config.ts

export const JWT_EXPIRATION = '7d'; // 7 days
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_POLICY =
  'Le mot de passe doit contenir au moins 8 caractères.';
