import dotenv from 'dotenv';
dotenv.config()
import * as jwt from "jsonwebtoken"
export const APP_SECRET: any = process.env.APP_SECRET;

export interface AuthTokenPayload {
    userId: string;
    role: string;
}
export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("No token found");
    return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}