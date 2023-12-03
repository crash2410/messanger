import {PrismaClient} from "@prisma/client";

// Объявление глобальной переменной "prisma" с типом PrismaClient или undefined
declare global {
    var prisma: PrismaClient | undefined;
}

// Создание экземпляра PrismaClient и присваивание его переменной "client"
const client = globalThis.prisma || new PrismaClient();

// Если переменная окружения "NODE_ENV" не установлена в "production",
// присваиваем переменной "prisma" значение "client"
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;