import { PrismaClient } from "prisma/prisma-client";

declare global {
    var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient()

globalThis.prisma = prismadb

export default prismadb