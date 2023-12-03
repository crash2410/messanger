import {AuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    // Использование PrismaAdapter для адаптера
    adapter: PrismaAdapter(prisma),
    providers: [
        // Настройка провайдера Github
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        // Настройка провайдера Google
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        // Настройка провайдера Credentials
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            // Функция авторизации для провайдера Credentials
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials')
                }

                // Поиск пользователя в базе данных по email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                // Проверка наличия пользователя и хэшированного пароля
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                // Сравнение введённого пароля с хэшированным паролем пользователя
                const isCurrentPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCurrentPassword) {
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        })
    ],
    // Опция отладки в зависимости от окружения
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    // Секретный ключ для NextAuth
    secret: process.env.NEXTAUTH_SECRET
};