import { PrismaClient } from '@prisma/client'
import { decodeAuthHeader } from '../utils/auth'
import { Request } from 'express'
export const prisma = new PrismaClient();
export interface Context {
    prisma: PrismaClient;
    userId: string | any
    role: string | any
}
export const context = ({ req }: { req: Request }): Context => {
    const token = req && req.headers.authorization ? decodeAuthHeader(req.headers.authorization) : null;
    return {
        prisma,
        userId: token?.userId,
        role: token?.role
    }
}