import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { type ExpressContextFunctionArgument } from '@apollo/server/express4';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

export const authenticateToken = async ({ req }: ExpressContextFunctionArgument) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return {}; // No token, return empty context (unauthenticated)
  }

  // Ensure the header is in the format "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    throw new Error('Authorization header must be in the format "Bearer <token>"');
  }

  const token = parts[1];
  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    const user = jwt.verify(token, secretKey, { algorithms: ['HS256'] }) as JwtPayload;
    return { user }; // Return user in context
  } catch (err) {
    throw new Error('Invalid or expired token'); // Throw error for GraphQL to handle
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h', algorithm: 'HS256' });
};