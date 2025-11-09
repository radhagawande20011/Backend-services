import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_FOR_ACCESS_TOKEN, JWT_ACCESS_TOKEN_EXPIRY_SECONDS, JWT_ISSUER } from '../../config/db.config';

const scryptAsync = promisify(scrypt);

export const getPasswordHash = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
};

export const comparePassword = async (storedPassword: string, suppliedPassword: string) => {
  const [hashedPassword, salt] = storedPassword.split('.');
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
  return buf.toString('hex') === hashedPassword;
};

export const generateAccessToken = (user: any) => {
  const payload = { userId: user.id, roleId: user.roleId };
  return jwt.sign(payload, JWT_SECRET_FOR_ACCESS_TOKEN, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRY_SECONDS,
    issuer: JWT_ISSUER,
  });
};
